"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "@/lib/api";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const res = await getProfile();
        setUser(res.data);
      } catch (err: any) {
        if (err?.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-blue-700 animate-pulse">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex items-center justify-center" style={{
      background: '#000',
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
      <div className="bg-black/90 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 animate-gradient text-center mb-8 drop-shadow-lg">Your Profile</h1>
        <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-300 text-white font-extrabold rounded-full shadow-md text-4xl border-4 border-white/60 mb-6">
          {user?.username ? user.username[0]?.toUpperCase() : "U"}
        </div>
        <div className="text-lg text-white mb-2"><span className="font-bold">Username:</span> {user?.username}</div>
        <div className="text-lg text-white mb-2"><span className="font-bold">Email:</span> {user?.email}</div>
        <div className="text-lg text-white mb-2"><span className="font-bold">Rating:</span> <span className="text-purple-300 font-bold">{user?.rating}</span></div>
        <div className="text-lg text-white mb-2"><span className="font-bold">Wins:</span> {user?.win_count}</div>
        <div className="text-lg text-white mb-2"><span className="font-bold">Losses:</span> {user?.loss_count}</div>
        <div className="text-xs text-gray-400 mt-4">Member since: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "-"}</div>
      </div>
    </div>
  );
} 