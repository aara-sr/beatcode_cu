from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import func
from datetime import datetime, timedelta
import json
import asyncio
import random
import uuid

from database import get_db
from models import User, Match, Problem, Submission
from schemas import MatchCreate, MatchResponse, SubmissionCreate
from routers.auth import get_current_user
from services.judge0 import submit_code_to_judge0

router = APIRouter(
    prefix="/matches",
    tags=["Matches"],
    responses={404: {"description": "Not found"}}
)

# Simple in-memory matchmaking queue
matchmaking_queue = []

# Track last opponents for rematch
last_opponents = {}  # {user_id: last_opponent_id}

# Mock AI feedback responses
MOCK_FEEDBACK = [
    "Great solution! Consider using a hash map to reduce lookup time from O(n) to O(1).",
    "Good approach, but you could optimize the space complexity by using two pointers.",
    "Nice work! Try to add more edge case handling for robustness.",
    "Solid implementation. Consider using built-in functions for cleaner code.",
    "Well done! The algorithm is correct, but you could improve readability with better variable names.",
    "Excellent solution! Very efficient and clean code structure.",
    "Good logic, but consider handling null/empty inputs more gracefully.",
    "Nice approach! You could reduce the number of iterations with a different algorithm."
]

@router.post("/matchmaking/leave")
async def leave_matchmaking(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.id in matchmaking_queue:
        matchmaking_queue.remove(current_user.id)
    return {"message": "Left matchmaking queue"}

@router.post("/matchmaking/join")
async def join_matchmaking(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Clean up stale matches first
    db.query(Match).filter(
        Match.status == "active",
        Match.start_time < datetime.utcnow() - timedelta(minutes=10)
    ).update({"status": "abandoned"})
    db.commit()

    # Check if user is already in an active match
    active_match = db.query(Match).filter(
        ((Match.player1_id == current_user.id) | (Match.player2_id == current_user.id)) &
        (Match.status == "active")
    ).first()
    
    if active_match:
        return {"match_id": active_match.id}

    # Check if user is already in queue
    if current_user.id in matchmaking_queue:
        return {"message": "Already in queue", "position": matchmaking_queue.index(current_user.id) + 1}
    
    # Add user to matchmaking queue
    matchmaking_queue.append(current_user.id)
    
    # First, look for previous opponent in queue
    other_player_id = None
    last_opponent_id = last_opponents.get(current_user.id)
    
    if last_opponent_id and last_opponent_id in matchmaking_queue:
        other_player_id = last_opponent_id  # Prioritize matching with previous opponent
    else:
        # If no previous opponent available, look for any other player
        for player_id in matchmaking_queue:
            if player_id != current_user.id:
                other_player_id = player_id
                break
            
    if other_player_id:
        # Found a match! Create a new match with both players
        from sqlalchemy.sql.expression import func
        problem = db.query(Problem).order_by(func.random()).first()
        if not problem:
            # Create a sample problem if none exists
            problem = Problem(
                title="Two Sum",
                description="Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
                input_format="First line: array of integers\nSecond line: target integer",
                output_format="Two integers representing the indices",
                test_cases=json.dumps([
                    {"input": "[2,7,11,15]\n9", "output": "0 1"},
                    {"input": "[3,2,4]\n6", "output": "1 2"}
                ]),
                difficulty="easy"
            )
            db.add(problem)
            db.commit()
            db.refresh(problem)

        # Create new active match with both players
        new_match = Match(
            id=str(uuid.uuid4()),
            player1_id=current_user.id,
            player2_id=other_player_id,
            problem_id=problem.id,
            status="active",
            start_time=datetime.utcnow(),
            remaining_time=300
        )
        db.add(new_match)
        
        # Remove both players from queue
        matchmaking_queue.remove(current_user.id)
        matchmaking_queue.remove(other_player_id)
        
        db.commit()
        return {"match_id": new_match.id}
    else:
        # No other players in queue, keep waiting
        return {"message": "Waiting for opponent..."}

@router.get("/matchmaking/start")
async def start_match(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Find active match for current user
    match = db.query(Match).filter(
        ((Match.player1_id == current_user.id) | (Match.player2_id == current_user.id)) &
        (Match.status == "active")
    ).first()
    
    if not match:
        # No active match found - check if user is in queue
        if current_user.id in matchmaking_queue:
            return {"status": "waiting", "message": "Waiting for opponent..."}
        raise HTTPException(status_code=404, detail="No active match found")
    
    # Get problem details
    problem = db.query(Problem).filter(Problem.id == match.problem_id).first()
    
    return {
        "match": match,
        "problem": problem,
        "opponent": db.query(User).filter(
            User.id == (match.player2_id if match.player1_id == current_user.id else match.player1_id)
        ).first()
    }

@router.post("/{match_id}/update-time")
async def update_match_time(
    match_id: str,
    remaining_time: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    match = db.query(Match).filter(Match.id == match_id).first()
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    
    if match.player1_id != current_user.id and match.player2_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this match")
    
    match.remaining_time = remaining_time
    db.commit()
    return {"success": True}

@router.post("/submit")
async def submit_solution(
    submission: SubmissionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Get match
    match = db.query(Match).filter(Match.id == submission.match_id).first()
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    
    # Check if user is part of this match
    if current_user.id not in [match.player1_id, match.player2_id]:
        raise HTTPException(status_code=403, detail="Not authorized for this match")
    
    # Submit code to Judge0 (mock implementation)
    result = await submit_code_to_judge0(submission.code, submission.language)
    
    # Create submission record
    db_submission = Submission(
        user_id=current_user.id,
        match_id=submission.match_id,
        code=submission.code,
        language=submission.language,
        result=result["status"]
    )
    db.add(db_submission)
    
    # Update match with player's code and generate AI review
    is_player1 = match.player1_id == current_user.id
    if is_player1:
        match.code_player1 = submission.code
        match.ai_score_p1 = round(random.uniform(6.0, 9.5), 1)
        match.feedback_p1 = random.choice(MOCK_FEEDBACK)
    else:
        match.code_player2 = submission.code
        match.ai_score_p2 = round(random.uniform(6.0, 9.5), 1)
        match.feedback_p2 = random.choice(MOCK_FEEDBACK)
    
    # Update match status based on submission result
    match_completed = False
    if result["status"] == "accepted":
        match.winner_id = current_user.id
        match.end_time = datetime.utcnow()
        match.status = "completed"
        match_completed = True
        
        # Store last opponent for both players for potential rematch
        opponent_id = match.player2_id if match.player1_id == current_user.id else match.player1_id
        last_opponents[current_user.id] = opponent_id
        last_opponents[opponent_id] = current_user.id
        
        # Update winner stats
        winner = db.query(User).filter(User.id == current_user.id).first()
        winner.win_count += 1
        winner.rating += 25
        
        # Update loser stats if there is an opponent
        if match.player2_id and match.player1_id:  # Only if both players exist
            loser_id = match.player2_id if match.player1_id == current_user.id else match.player1_id
            loser = db.query(User).filter(User.id == loser_id).first()
            if loser:
                loser.loss_count += 1
                loser.rating = max(800, loser.rating - 25)
    
    db.commit()
    
    return {
        "submission_id": db_submission.id,
        "result": result,
        "match_completed": result["status"] == "accepted"
    }

@router.post("/result/{match_id}")
async def submit_match_result(match_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    match = db.query(Match).filter(Match.id == match_id).first()
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    
    # Check if user is part of this match
    if current_user.id not in [match.player1_id, match.player2_id]:
        raise HTTPException(status_code=403, detail="Not authorized for this match")
    
    # Update match with winner
    match.winner_id = current_user.id
    match.end_time = datetime.utcnow()
    match.status = "completed"
    
    # Update user stats
    winner = db.query(User).filter(User.id == current_user.id).first()
    loser_id = match.player2_id if match.player1_id == current_user.id else match.player1_id
    loser = db.query(User).filter(User.id == loser_id).first()
    
    winner.win_count += 1
    winner.rating += 25
    loser.loss_count += 1
    loser.rating = max(800, loser.rating - 25)
    
    db.commit()
    
    return {
        "message": "Match result submitted successfully",
        "winner": current_user.username,
        "match_id": match_id
    }

@router.get("/leaderboard")
async def get_leaderboard(db: Session = Depends(get_db)):
    users = db.query(User).order_by(User.rating.desc()).limit(10).all()
    return users

@router.get("/{match_id}")
async def get_match(
    match_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    match = db.query(Match).filter(Match.id == match_id).first()
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    
    # Check if user is part of this match
    if current_user.id not in [match.player1_id, match.player2_id]:
        raise HTTPException(status_code=403, detail="Not authorized to view this match")

    # Get problem details
    problem = db.query(Problem).filter(Problem.id == match.problem_id).first()
    
    # Get opponent details
    opponent_id = match.player2_id if match.player1_id == current_user.id else match.player1_id
    opponent = db.query(User).filter(User.id == opponent_id).first() if opponent_id else None
    
    # Get submission details
    submissions = db.query(Submission).filter(Submission.match_id == match_id).all()
    
    # Get the current user's submitted code
    submitted_code = match.code_player1 if match.player1_id == current_user.id else match.code_player2
    
    # Determine if current user is the winner
    is_winner = match.winner_id == current_user.id if match.winner_id else None
    
    # Add current user ID to match object
    match_dict = match.__dict__
    match_dict["current_user_id"] = current_user.id

    return {
        "match": match_dict,
        "problem": problem,
        "opponent": opponent,
        "submissions": submissions
    }
