"use client";
import { useEffect, useState } from "react";
import { getLeaderboard } from "@/lib/api";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getLeaderboard();
        setLeaderboard(res.data);
        
        // Get current user from localStorage
        if (typeof window !== "undefined") {
          const userData = localStorage.getItem("user");
          if (userData) {
            setCurrentUser(JSON.parse(userData));
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-blue-700 animate-pulse">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex items-center justify-center" style={{
      background: 'transparent',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: twinkle 3s ease-in-out infinite;
        }
        .star:nth-child(odd) {
          animation-delay: 0.5s;
        }
        .star:nth-child(3n) {
          animation-delay: 1s;
        }
        .star:nth-child(4n) {
          animation-delay: 1.5s;
        }
        .star:nth-child(5n) {
          animation-delay: 2s;
        }
        .star:nth-child(6n) {
          animation-delay: 2.5s;
        }
      `}</style>
      {/* Moving Stars */}
      <div className="star" style={{top: '10%', left: '10%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '20%', left: '20%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '30%', left: '80%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '40%', left: '60%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '50%', left: '15%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '60%', left: '70%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '70%', left: '25%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '80%', left: '85%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '15%', left: '90%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '25%', left: '5%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '35%', left: '45%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '45%', left: '95%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '55%', left: '35%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '65%', left: '75%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '75%', left: '10%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '85%', left: '50%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '5%', left: '30%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '90%', left: '20%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '95%', left: '80%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '8%', left: '65%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '12%', left: '40%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '18%', left: '55%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '22%', left: '25%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '28%', left: '85%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '32%', left: '15%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '38%', left: '70%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '42%', left: '45%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '48%', left: '90%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '52%', left: '30%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '58%', left: '60%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '62%', left: '10%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '68%', left: '80%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '72%', left: '35%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '78%', left: '65%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '82%', left: '15%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '88%', left: '75%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '92%', left: '40%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '98%', left: '55%', width: '2px', height: '2px'}}></div>
      <div className="bg-black/90 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-10 w-full max-w-2xl">
        <h1 className="flex items-center gap-3 text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 animate-gradient text-center mb-2 drop-shadow-lg">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/></svg>
            Leaderboard
          </h1>
          <p className="text-center text-lg text-blue-200 mb-8 font-medium">Climb the ranks. Prove your coding skills. 🏆</p>
        <ol className="list-decimal ml-4 space-y-3">
          {leaderboard.map((u, i) => {
            const isCurrentUser = currentUser && u.username === currentUser.username;
            return (
              <li key={u.id} className={`flex justify-between items-center rounded-xl px-6 py-3 shadow-sm border transition-all duration-200 ${
                isCurrentUser 
                  ? "bg-gradient-to-r from-blue-900/60 to-purple-900/60 border-2 border-blue-400 shadow-lg scale-105" 
                  : "bg-black/60 border-white/30"
              }`}>
                <span className={`font-semibold text-lg ${
                  i === 0 ? "text-yellow-400" : 
                  i === 1 ? "text-gray-300" : 
                  i === 2 ? "text-orange-400" : 
                  isCurrentUser ? "text-blue-200 font-bold" : "text-blue-200"
                }`}>
                  {u.username}
                  {isCurrentUser && " (You)"}
                </span>
                <span className={`font-bold text-lg ${
                  isCurrentUser ? "text-blue-200" : "text-blue-300"
                }`}>
                  {u.rating}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
} 