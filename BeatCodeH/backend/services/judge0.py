import asyncio
import random

# Mock Judge0 service - always accept code for now
async def submit_code_to_judge0(code: str, language: str):
    await asyncio.sleep(1)
    return {
        "status": "accepted",
        "message": "All test cases passed"
    }

# Language ID mapping for Judge0
LANGUAGE_IDS = {
    "python": 71,
    "javascript": 63,
    "java": 62,
    "cpp": 54,
    "c": 50
}
