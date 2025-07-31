"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("token"));
    }
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      router.push("/battle");
    } else {
      router.push("/register");
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{
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
      {/* Moving Stars - Intensified for Homepage */}
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
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 relative w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-purple-400/20 to-pink-200/30 blur-2xl z-0" />
        <div className="relative z-10 w-full max-w-2xl mx-auto rounded-sm bg-black/60 backdrop-blur-lg shadow-lg p-12 mt-16 mb-8" style={{boxShadow: '0 8px 16px -1px rgba(0, 0, 0, 0.5)'}}>
          <h1 className="text-6xl md:text-7xl font-extrabold gradient-title mb-6 drop-shadow-lg">BeatCode</h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light leading-relaxed">1v1 Competitive Coding Battles. Real-time. AI-Powered. Elo Ranked.</p>
                      <button
              onClick={handleGetStarted}
              className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-bold px-12 py-4 rounded-sm text-xl shadow-xl transition-all duration-300 hover:scale-105 mb-8 pulse-button"
            >
              {isLoggedIn ? "Battle" : "Get Started"}
            </button>
        </div>
        <div className="relative z-10 mt-8 max-w-5xl mx-auto w-full">
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes typewriter {
                from { width: 0; }
                to { width: 100%; }
              }
              @keyframes gradient-flow {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
              }
              @keyframes glow {
                0%, 100% { box-shadow: 0 0 2px rgba(59, 130, 246, 0.3); }
                50% { box-shadow: 0 0 8px rgba(59, 130, 246, 0.5), 0 0 12px rgba(147, 51, 234, 0.4); }
              }
              @keyframes sword-clash {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(-10deg); }
                75% { transform: rotate(10deg); }
              }
              @keyframes graph-animate {
                0%, 100% { transform: scaleY(1); }
                50% { transform: scaleY(1.2); }
              }
              @keyframes robot-blink {
                0%, 90%, 100% { opacity: 1; }
                95% { opacity: 0.3; }
              }
              @keyframes lightning {
                0%, 100% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(1.1) rotate(5deg); }
              }
              @keyframes document-shake {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(-2deg); }
                75% { transform: rotate(2deg); }
              }
              .flip-card {
                perspective: 1000px;
                height: 200px;
                transition: transform 0.3s ease;
              }
              .flip-card:hover {
                transform: rotateX(5deg) rotateY(5deg);
              }
              .flip-card-inner {
                position: relative;
                width: 100%;
                height: 100%;
                text-align: center;
                transition: transform 0.6s;
                transform-style: preserve-3d;
              }
              .flip-card:hover .flip-card-inner {
                transform: rotateY(180deg);
              }
              .flip-card-front, .flip-card-back {
                position: absolute;
                width: 100%;
                height: 100%;
                backface-visibility: hidden;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 1.5rem;
                transition: all 0.3s ease;
              }
              .flip-card-front {
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(8px);
                border-radius: 0.125rem;
                box-shadow: 0 8px 16px -1px rgba(0, 0, 0, 0.5);
                border: 2px solid transparent;
              }
              .flip-card:hover .flip-card-front {
                border-color: rgba(59, 130, 246, 0.4);
                box-shadow: 0 8px 16px -1px rgba(0, 0, 0, 0.5), 0 0 10px rgba(59, 130, 246, 0.2);
              }
              .flip-card-back {
                background: rgba(88, 28, 135, 0.8);
                backdrop-filter: blur(8px);
                border-radius: 0.125rem;
                box-shadow: 0 8px 16px -1px rgba(0, 0, 0, 0.5);
                transform: rotateY(180deg);
              }
              .typewriter {
                overflow: hidden;
                white-space: nowrap;
                animation: typewriter 2s steps(8) forwards;
              }
              .gradient-title {
                background: linear-gradient(-45deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
                background-size: 400% 400%;
                animation: gradient-flow 3s ease infinite;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
                letter-spacing: -0.02em;
                font-weight: 900;
              }
              .pulse-button {
                animation: pulse 3s ease-in-out infinite;
              }
              .glow-button {
                animation: glow 2s ease-in-out infinite;
              }
              .sword-icon { animation: sword-clash 2s ease-in-out infinite; }
              .graph-icon { animation: graph-animate 2s ease-in-out infinite; }
              .robot-icon { animation: robot-blink 3s ease-in-out infinite; }
              .lightning-icon { animation: lightning 1.5s ease-in-out infinite; }
              .document-icon { animation: document-shake 2s ease-in-out infinite; }
            `
          }} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              {
                icon: "⚔️",
                title: "1v1 Coding Duels",
                desc: "Challenge friends or get matched with coders worldwide in real-time battles.",
              },
              {
                icon: "📈",
                title: "Elo Rating System",
                desc: "Climb the leaderboard with every win. Elo points update after each match.",
              },
              {
                icon: "🤖",
                title: "AI Code Review",
                desc: "Get instant feedback on your code's optimization and quality from AI.",
              },
            ].map((f, i) => (
              <div key={i} className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <span className={`text-3xl mb-4 ${f.title === "1v1 Coding Duels" ? "sword-icon" : f.title === "Elo Rating System" ? "graph-icon" : f.title === "AI Code Review" ? "robot-icon" : f.title === "Real-time Matchmaking" ? "lightning-icon" : "document-icon"}`}>{f.icon}</span>
                    <h2 className="font-semibold text-base text-blue-200">{f.title}</h2>
                  </div>
                  <div className="flip-card-back">
                    <p className="text-white text-sm text-center leading-relaxed uppercase font-medium tracking-wide" style={{textShadow: '0 3px 8px rgba(88, 28, 135, 1)'}}>{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-8">
            {[
              {
                icon: "⚡",
                title: "Real-time Matchmaking",
                desc: "Join the queue and get matched instantly, or enter a code to duel friends.",
              },
              {
                icon: "📝",
                title: "Monaco Editor",
                desc: "Write code in a beautiful, professional editor with syntax highlighting.",
              },
            ].map((f, i) => (
              <div key={i + 3} className="flip-card w-full max-w-xs">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <span className={`text-3xl mb-4 ${f.title === "1v1 Coding Duels" ? "sword-icon" : f.title === "Elo Rating System" ? "graph-icon" : f.title === "AI Code Review" ? "robot-icon" : f.title === "Real-time Matchmaking" ? "lightning-icon" : "document-icon"}`}>{f.icon}</span>
                    <h2 className="font-semibold text-base text-blue-200">{f.title}</h2>
                  </div>
                  <div className="flip-card-back">
                    <p className="text-white text-sm text-center leading-relaxed uppercase font-medium tracking-wide" style={{textShadow: '0 3px 8px rgba(88, 28, 135, 1)'}}>{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm bg-black/60 backdrop-blur-lg mt-12 shadow-inner">
        <span className="font-light">Made with ❤️ for coding duels. </span>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 transition-colors ml-1">GitHub</a>
      </footer>
    </div>
  );
}
