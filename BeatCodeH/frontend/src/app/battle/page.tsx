"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BattlePage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("token")) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{
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
        /* Subtle, gentle flame effect around the main box */
        .flame-effect {
          position: absolute;
          top: 52%;
          left: 50%;
          width: 105%;
          height: 60%;
          transform: translate(-50%, -50%);
          z-index: 0;
          pointer-events: none;
          border-radius: 2rem;
          opacity: 0.35;
          background:
            radial-gradient(ellipse at 60% 80%, #fbc2eb55 0%, transparent 70%),
            radial-gradient(ellipse at 40% 80%, #a5b4fc55 0%, transparent 70%),
            radial-gradient(ellipse at 50% 100%, #c084fc33 0%, transparent 80%);
          animation: flame-waves 3.2s ease-in-out infinite alternate;
          filter: blur(4px) brightness(1.05);
        }
        @keyframes flame-waves {
          0% {
            filter: blur(4px) brightness(1.05);
            opacity: 0.35;
            background-position: 60% 80%, 40% 80%, 50% 100%;
            transform: translate(-50%, -50%) scale(1) skewY(0deg);
          }
          30% {
            filter: blur(5px) brightness(1.08);
            opacity: 0.4;
            background-position: 62% 78%, 38% 82%, 52% 98%;
            transform: translate(-50%, -50%) scale(1.01, 1.04) skewY(-1deg);
          }
          60% {
            filter: blur(3px) brightness(1.02);
            opacity: 0.3;
            background-position: 58% 82%, 42% 78%, 48% 102%;
            transform: translate(-50%, -50%) scale(0.99, 1.01) skewY(1deg);
          }
          100% {
            filter: blur(4px) brightness(1.05);
            opacity: 0.35;
            background-position: 60% 80%, 40% 80%, 50% 100%;
            transform: translate(-50%, -50%) scale(1) skewY(0deg);
          }
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
      <div className="relative w-full flex justify-center items-center" style={{zIndex: 1}}>
        <div className="flame-effect"></div>
        <div className="bg-black/90 backdrop-blur-lg border border-white/20 rounded-3xl shadow-xl p-12 max-w-xl w-full flex flex-col items-center relative text-white" style={{zIndex: 2}}>
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-blue-600 to-pink-500 animate-gradient mb-4 drop-shadow-lg">Ready to Battle?</h1>
          <p className="text-lg mb-10 text-center text-white">Enter the arena and compete in a 1v1 coding duel. Solve problems, climb the leaderboard, and get instant AI feedback on your code!</p>
          <button
            onClick={() => router.push("/matchmaking")}
            className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold px-12 py-5 rounded-2xl text-2xl shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 animate-pulse"
          >
            Start Battle
          </button>
        </div>
      </div>
    </div>
  );
} 