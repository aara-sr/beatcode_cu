"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getMatch, getAIReview } from "@/lib/api";

export default function ResultPage() {
  const router = useRouter();
  const params = useParams();
  const matchId = params.matchId as string;
  const [loading, setLoading] = useState(true);
  const [match, setMatch] = useState<any>(null);
  const [problem, setProblem] = useState<any>(null);
  const [opponent, setOpponent] = useState<any>(null);
  const [aiReview, setAIReview] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/login");
      return;
    }
    setUser(typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || '{}') : null);
    const fetchData = async () => {
      try {
        const [matchRes, aiRes] = await Promise.all([
          getMatch(matchId),
          getAIReview(matchId),
        ]);
        setMatch(matchRes.data.match);
        setProblem(matchRes.data.problem);
        setOpponent(matchRes.data.opponent);
        setAIReview(aiRes.data);
      } catch (err) {
        setError("Could not load result");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [matchId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-blue-700 animate-pulse">Loading result...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <div className="text-xl font-semibold text-red-700">{error}</div>
      </div>
    );
  }

  const isWinner = match?.winner_id === user?.id;
  const winnerName = isWinner ? user?.username : opponent?.username;
  const aiScoreP1 = aiReview?.ai_score_p1;
  const aiScoreP2 = aiReview?.ai_score_p2;
  const feedbackP1 = aiReview?.feedback_p1;
  const feedbackP2 = aiReview?.feedback_p2;

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-12 w-full max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-700 to-purple-600 animate-gradient text-center mb-8 drop-shadow-lg">Winner: {winnerName}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-blue-50/80 rounded-2xl p-6 shadow flex flex-col items-center">
            <h2 className="font-bold text-blue-700 mb-2 text-lg">{user?.username} (You)</h2>
            <div className="mb-1 text-black">AI Score: <span className="font-semibold text-black">{aiScoreP1}</span></div>
            <div className="mb-1 text-black">Feedback: <span className="text-black">{feedbackP1}</span></div>
            <div className="mb-1 text-black">Code:</div>
            <pre className="bg-gray-100 rounded-xl p-2 text-xs overflow-x-auto max-h-40 w-full shadow-inner text-black">{match?.code_player1}</pre>
            <div className="mt-2 text-black">Elo Change: <span className={isWinner ? "text-green-600" : "text-red-600"}>{isWinner ? "+50" : "-50"}</span></div>
          </div>
          <div className="bg-pink-50/80 rounded-2xl p-6 shadow flex flex-col items-center">
            <h2 className="font-bold text-purple-700 mb-2 text-lg">{opponent?.username}</h2>
            <div className="mb-1 text-black">AI Score: <span className="font-semibold text-black">{aiScoreP2}</span></div>
            <div className="mb-1 text-black">Feedback: <span className="text-black">{feedbackP2}</span></div>
            <div className="mb-1 text-black">Code:</div>
            <pre className="bg-gray-100 rounded-xl p-2 text-xs overflow-x-auto max-h-40 w-full shadow-inner text-black">{match?.code_player2}</pre>
            <div className="mt-2 text-black">Elo Change: <span className={!isWinner ? "text-green-600" : "text-red-600"}>{!isWinner ? "+50" : "-50"}</span></div>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-8">
          <a href="/dashboard" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-bold px-8 py-3 rounded-2xl text-lg shadow-xl transition-all duration-200 hover:scale-105">Back to Dashboard</a>
          <a href="/matchmaking" className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold px-8 py-3 rounded-2xl text-lg shadow-xl transition-all duration-200 hover:scale-105">Rematch</a>
        </div>
      </div>
    </div>
  );
} 