"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { joinMatchmaking, leaveMatchmaking, startMatch } from "@/lib/api";

export default function MatchmakingPage() {
  const router = useRouter();
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [inQueue, setInQueue] = useState(false);
  const [matchCode, setMatchCode] = useState("");

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/login");
      return;
    }
    // Clean up polling on unmount
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
    // eslint-disable-next-line
  }, []);

  const pollMatchStatus = () => {
    const id = setInterval(async () => {
      try {
        const res = await startMatch();
        if (res.data.match) {
          router.push(`/match/${res.data.match.id}`);
        } else if (res.data.status === "waiting") {
          setStatus("Waiting for opponent...");
        }
      } catch (err) {
        setError("Error checking match status");
      }
    }, 2000);
    setIntervalId(id);
  };

  const handleJoinQueue = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await joinMatchmaking();
      setInQueue(true);
      setStatus(res.data.message || "Searching for opponent...");
      pollMatchStatus();
    } catch (err: any) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("authChanged"));
        router.push("/login");
        return;
      }
      setError(err?.response?.data?.detail || "Failed to join matchmaking");
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveQueue = async () => {
    setLoading(true);
    setError("");
    try {
      await leaveMatchmaking();
      setInQueue(false);
      setStatus("");
      if (intervalId) clearInterval(intervalId);
    } catch (err: any) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("authChanged"));
        router.push("/login");
        return;
      }
      setError(err?.response?.data?.detail || "Failed to leave matchmaking");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinByCode = () => {
    if (matchCode.trim()) {
      router.push(`/match/${matchCode.trim()}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-10 w-full max-w-lg flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 animate-gradient mb-8 drop-shadow-lg">Matchmaking</h1>
        <div className="space-y-6 w-full">
          <button
            onClick={inQueue ? handleLeaveQueue : handleJoinQueue}
            className={`w-full font-bold py-3 rounded-2xl text-xl shadow-xl transition-all duration-200 ${inQueue ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600" : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:to-pink-600"} text-white hover:scale-105`}
            disabled={loading}
          >
            {loading ? (inQueue ? "Leaving..." : "Joining...") : inQueue ? "Leave Queue" : "Join Matchmaking"}
          </button>
          {status && <div className="text-black text-center font-medium animate-pulse">{status}</div>}
          <div className="flex items-center gap-2 mt-4 text-black">
            <input
              type="text"
              placeholder="Enter match code to join friend"
              className="flex-1 px-4 py-3 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/60 backdrop-blur placeholder:text-gray-800 text-lg shadow"
              value={matchCode}
              onChange={e => setMatchCode(e.target.value)}
            />
            <button
              onClick={handleJoinByCode}
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold px-6 py-3 rounded-xl text-lg shadow-lg transition-all duration-200 hover:scale-105"
            >
              Join
            </button>
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        </div>
        <div className="mt-8 text-center">
          <a href="/dashboard" className="text-blue-600 hover:underline text-lg">Back to Dashboard</a>
        </div>
      </div>
    </div>
  );
} 