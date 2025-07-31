"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register({ username, email, password });
      router.push("/login");
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{
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
      <div className="bg-black/60 backdrop-blur-lg rounded-sm shadow-lg p-10 w-full max-w-md flex flex-col items-center" style={{boxShadow: '0 8px 16px -1px rgba(0, 0, 0, 0.5)'}}>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-blue-600 to-pink-500 animate-gradient mb-8 drop-shadow-lg">Register for BeatCode</h1>
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div>
            <label className="block text-white mb-1 font-medium">Username</label>
            <input
              type="text"
              className="text-white w-full px-4 py-3 border border-white/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-black/40 backdrop-blur placeholder:text-gray-400 text-lg shadow"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-white mb-1 font-medium">Email</label>
            <input
              type="email"
              className="text-white w-full px-4 py-3 border border-white/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-black/40 backdrop-blur placeholder:text-gray-400 text-lg shadow"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-white mb-1 font-medium">Password</label>
            <input
              type="password"
              className="text-white w-full px-4 py-3 border border-white/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-black/40 backdrop-blur placeholder:text-gray-400 text-lg shadow"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-3 rounded-sm text-xl shadow-xl transition-all duration-300 hover:scale-105"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-300">
          Already have an account? <a href="/login" className="text-purple-300 hover:text-purple-200 transition-colors">Login</a>
        </div>
      </div>
    </div>
  );
} 