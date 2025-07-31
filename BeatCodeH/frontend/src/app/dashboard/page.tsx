"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile, getUserMatches, getLeaderboard } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/login");
      return;
    }
    const fetchData = async () => {
      try {
        const [profileRes, matchesRes, leaderboardRes] = await Promise.all([
          getProfile(),
          getUserMatches(),
          getLeaderboard(),
        ]);
        setUser(profileRes.data);
        setMatches(matchesRes.data);
        setLeaderboard(leaderboardRes.data);
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router, mounted]);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-blue-700 animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{
      background: '#000',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: twinkle 1.5s ease-in-out infinite;
        }
        .star:nth-child(odd) {
          animation-delay: 0.2s;
        }
        .star:nth-child(3n) {
          animation-delay: 0.4s;
        }
        .star:nth-child(4n) {
          animation-delay: 0.6s;
        }
        .star:nth-child(5n) {
          animation-delay: 0.8s;
        }
        .star:nth-child(6n) {
          animation-delay: 1s;
        }
        .star:nth-child(7n) {
          animation-delay: 1.2s;
        }
        .star:nth-child(8n) {
          animation-delay: 1.4s;
        }
      `}</style>
      {/* Moving Stars - Intensified for Dashboard */}
      <div className="star" style={{top: '5%', left: '5%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '10%', left: '15%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '15%', left: '25%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '20%', left: '35%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '25%', left: '45%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '30%', left: '55%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '35%', left: '65%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '40%', left: '75%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '45%', left: '85%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '50%', left: '95%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '55%', left: '10%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '60%', left: '20%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '65%', left: '30%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '70%', left: '40%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '75%', left: '50%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '80%', left: '60%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '85%', left: '70%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '90%', left: '80%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '95%', left: '90%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '8%', left: '12%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '12%', left: '22%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '16%', left: '32%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '20%', left: '42%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '24%', left: '52%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '28%', left: '62%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '32%', left: '72%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '36%', left: '82%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '40%', left: '92%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '44%', left: '8%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '48%', left: '18%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '52%', left: '28%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '56%', left: '38%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '60%', left: '48%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '64%', left: '58%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '68%', left: '68%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '72%', left: '78%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '76%', left: '88%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '80%', left: '98%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '84%', left: '3%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '88%', left: '13%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '92%', left: '23%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '96%', left: '33%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '2%', left: '43%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '6%', left: '53%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '10%', left: '63%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '14%', left: '73%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '18%', left: '83%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '22%', left: '93%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '26%', left: '7%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '30%', left: '17%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '34%', left: '27%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '38%', left: '37%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '42%', left: '47%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '46%', left: '57%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '50%', left: '67%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '54%', left: '77%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '58%', left: '87%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '62%', left: '97%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '66%', left: '2%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '70%', left: '12%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '74%', left: '22%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '78%', left: '32%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '82%', left: '42%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '86%', left: '52%', width: '2px', height: '2px'}}></div>
      <div className="star" style={{top: '90%', left: '62%', width: '1px', height: '1px'}}></div>
      <div className="star" style={{top: '94%', left: '72%', width: '3px', height: '3px'}}></div>
      <div className="star" style={{top: '98%', left: '82%', width: '2px', height: '2px'}}></div>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 animate-gradient text-center mb-10 drop-shadow-lg">Welcome, {user?.username}!</h1>
        <div className="grid grid-cols-1 gap-8 mb-12">
          <div className="bg-black/60 backdrop-blur-lg rounded-sm shadow-lg p-8 transition-all duration-200 hover:scale-105 hover:shadow-2xl" style={{boxShadow: '0 8px 16px -1px rgba(0, 0, 0, 0.5)'}}>
            <h2 className="text-xl font-semibold text-blue-300 mb-4">Recent Matches</h2>
            <div className="space-y-4">
              {matches.length === 0 && <p className="text-gray-300">No matches yet.</p>}
              {matches.map((m, i) => (
                <div key={i} className="bg-black/40 backdrop-blur rounded-sm p-4 border border-white/20">
                  <div className="flex flex-col space-y-2">
                    <span className="font-semibold text-white">{m.status === "completed" ? "Completed" : "Active"} Match</span>
                    <span className="text-sm text-gray-300">Started: {new Date(m.start_time).toLocaleString()}</span>
                    <span className="text-sm text-gray-300">Problem: {m.problem_id}</span>
                    <span className="text-sm text-gray-300">Opponent: {m.player1_id === user.id ? m.player2_id : m.player1_id}</span>
                    <span className="text-sm text-gray-300">Result: {m.winner_id === user.id ? "Win" : m.winner_id ? "Loss" : "-"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <a href="/matchmaking" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-bold px-10 py-4 rounded-sm text-xl shadow-xl transition-all duration-300 hover:scale-105">Start Matchmaking</a>
        </div>
      </div>
    </div>
  );
} 