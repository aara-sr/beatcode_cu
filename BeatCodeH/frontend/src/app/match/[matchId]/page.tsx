"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { getMatch, submitSolution, getAIReview, updateMatchTime } from "@/lib/api";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const LANGUAGES = [
  { label: "Python", value: "python3" },
  { label: "JavaScript", value: "javascript" },
  { label: "C++", value: "cpp" },
];

export default function MatchRoomPage() {
  const router = useRouter();
  const params = useParams();
  const matchId = params.matchId as string;
  const [loading, setLoading] = useState(true);
  const [match, setMatch] = useState<any>(null);
  const [problem, setProblem] = useState<any>(null);
  const [opponent, setOpponent] = useState<any>(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python3");
  const [timer, setTimer] = useState(300);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [aiReview, setAIReview] = useState<any>(null);
  const [error, setError] = useState("");
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load match data
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/login");
      return;
    }
    const fetchMatch = async () => {
      try {
        const res = await getMatch(matchId);
        setMatch(res.data.match);
        setProblem(res.data.problem);
        setOpponent(res.data.opponent);
        setTimer(res.data.match.remaining_time || 300);
        // Persist timer in localStorage
        if (typeof window !== "undefined") {
          const saved = localStorage.getItem(`timer_${matchId}`);
          if (saved) setTimer(Number(saved));
        }
      } catch (err) {
        setError("Could not load match");
      } finally {
        setLoading(false);
      }
    };
    fetchMatch();
    // eslint-disable-next-line
  }, [matchId]);

  // Timer logic
  useEffect(() => {
    if (loading || result) return;
    if (timer <= 0) return;
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        const next = t - 1;
        if (typeof window !== "undefined") {
          localStorage.setItem(`timer_${matchId}` , String(next));
        }
        if (next % 10 === 0) {
          updateMatchTime(matchId, next);
        }
        if (next <= 0 && timerRef.current) {
          clearInterval(timerRef.current);
        }
        return next;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line
  }, [loading, result]);

  // Poll match status after submission if not completed
  useEffect(() => {
    if (!waitingForOpponent) return;
    pollingRef.current = setInterval(async () => {
      try {
        const res = await getMatch(matchId);
        if (res.data.match.status === "completed") {
          setWaitingForOpponent(false);
          router.push(`/result/${matchId}`);
        }
      } catch (err) {
        // Optionally handle error
      }
    }, 2000);
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [waitingForOpponent, matchId, router]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await submitSolution({ match_id: matchId, code, language });
      setResult(res.data.result);
      // Fetch AI review
      const aiRes = await getAIReview(matchId);
      setAIReview(aiRes.data);
      // Always start polling after submit, regardless of match_completed
      setWaitingForOpponent(true);
      if (res.data.match_completed && res.data.match_id) {
        setWaitingForOpponent(false);
        router.push(`/result/${res.data.match_id}`);
        return;
      }
    } catch (err: any) {
      setError(err?.response?.data?.detail || err?.response?.data?.message || "Submission failed");
      setWaitingForOpponent(false); // Stop polling on error
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-blue-700 animate-pulse">Loading match...</div>
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

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Problem Panel */}
        <div className="md:col-span-1 bg-white/70 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl p-8 mb-4 md:mb-0 flex flex-col transition-all duration-200 hover:scale-[1.01]">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 animate-gradient mb-2 drop-shadow-lg">{problem?.title}</h2>
          <div className="text-black mb-2">{problem?.description}</div>
          <div className="mb-2">
            <span className="font-semibold text-black">Input:</span> <span className="text-sm text-black">{problem?.input_format}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-black">Output:</span> <span className="text-sm text-black">{problem?.output_format}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-black">Test Cases:</span>
            <ul className="list-disc ml-6 text-sm text-black">
              {problem?.test_cases && JSON.parse(problem.test_cases).map((tc: any, i: number) => (
                <li key={i} className="mb-1">
                  <span className="text-black">Input:</span> {tc.input} <span className="text-black ml-2">Output:</span> {tc.output}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <span className="font-semibold text-black">Opponent:</span> <span className="text-black">{opponent?.username || "Waiting..."}</span>
          </div>
          <div className="mt-2">
            <span className="font-semibold text-black">Time Left:</span> <span className="text-purple-700 font-bold">{timer}s</span>
          </div>
        </div>
        {/* Editor Panel */}
        <div className="md:col-span-2 bg-white/70 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl p-8 flex flex-col transition-all duration-200 hover:scale-[1.01]">
          <div className="flex items-center gap-4 mb-4">
            <select
              className="border border-white/40 rounded px-3 py-2 bg-white/60 backdrop-blur text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow"
              value={language}
              onChange={e => setLanguage(e.target.value)}
            >
              {LANGUAGES.map(l => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-bold px-8 py-3 rounded-2xl text-lg shadow-xl transition-all duration-200 hover:scale-105"
              disabled={submitting || timer <= 0 || !!result}
            >
              {submitting ? "Submitting..." : result ? "Submitted" : "Submit Solution"}
            </button>
            {result && <span className="text-green-600 font-semibold">{result.status}</span>}
          </div>
          <div className="flex-1 min-h-[400px]">
            <MonacoEditor
              height="400px"
              language={language === "python3" ? "python" : language === "cpp" ? "cpp" : "javascript"}
              value={code}
              onChange={v => setCode(v || "")}
              theme="vs-dark"
              options={{ fontSize: 16, minimap: { enabled: false } }}
            />
          </div>
          {aiReview && (
            <div className="mt-6 bg-purple-50/80 border-l-4 border-purple-400 p-4 rounded-xl shadow">
              <div className="font-bold text-purple-700 mb-1">AI Feedback</div>
              <div className="text-black">Score: <span className="font-bold">{aiReview.ai_score_p1} / 10</span></div>
              <div className="text-black">Feedback: {aiReview.feedback_p1}</div>
            </div>
          )}
          {waitingForOpponent && (
            <div className="mt-6 text-center text-blue-600 font-semibold animate-pulse">
              Waiting for opponent to submit...
            </div>
          )}
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
} 