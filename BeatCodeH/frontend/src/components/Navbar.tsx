"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [pathname, setPathname] = useState("");
  const router = useRouter();

  useEffect(() => {
    const updateAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      const user = localStorage.getItem("user");
      if (user) setUsername(JSON.parse(user).username);
      else setUsername("");
    };
    updateAuth();
    window.addEventListener("authChanged", updateAuth);
    return () => window.removeEventListener("authChanged", updateAuth);
  }, []);

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChanged"));
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-black/60 backdrop-blur-lg border-b border-white/20 shadow-lg flex items-center justify-between px-6 py-3">
      <a href="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 drop-shadow-lg tracking-tight">BeatCode</a>
      <div className="flex gap-4 items-center">
        <a href="/" className={`${pathname === "/" ? "text-purple-800 bg-purple-200 px-3 py-1 rounded-md" : "text-purple-200"} hover:text-pink-400 hover:underline font-medium hidden sm:inline transition-colors`}>Home</a>
        {isLoggedIn ? (
          <>
            <a href="/battle" className={`${pathname === "/battle" ? "text-purple-800 bg-purple-200 px-3 py-1 rounded-md" : "text-purple-200"} hover:text-pink-400 hover:underline font-semibold transition-colors`}>Battle</a>
            <a href="/dashboard" className={`${pathname === "/dashboard" ? "text-purple-800 bg-purple-200 px-3 py-1 rounded-md" : "text-purple-200"} hover:text-pink-400 hover:underline font-medium transition-colors`}>Dashboard</a>
            <a href="/leaderboard" className={`${pathname === "/leaderboard" ? "text-purple-800 bg-purple-200 px-3 py-1 rounded-md" : "text-purple-200"} hover:text-pink-400 hover:underline font-medium transition-colors`}>Leaderboard</a>
            <div className="flex items-center gap-2 ml-2">
                          <a href="/profile" className={`w-8 h-8 flex items-center justify-center ${pathname === "/profile" ? "bg-purple-200 text-purple-800" : "bg-gradient-to-br from-blue-400 via-purple-400 to-pink-300 text-white"} font-bold rounded-full shadow-md text-lg border-2 border-white/60 hover:scale-110 transition-transform`} title="View Profile">{username ? username[0]?.toUpperCase() : "U"}</a>
            <a href="/profile" className={`${pathname === "/profile" ? "text-purple-800 bg-purple-200" : "bg-pink-200 text-purple-800"} rounded-full px-3 py-1 text-sm font-semibold shadow-sm border border-pink-300 hover:underline hover:text-pink-400 transition-colors`}>{username || "User"}</a>
              <button onClick={handleLogout} className="ml-2 text-purple-200 hover:text-pink-400 hover:underline text-sm transition-colors">Logout</button>
            </div>
          </>
        ) : (
          <>
            <a href="/login" className={`${pathname === "/login" ? "text-purple-800 bg-purple-200 px-3 py-1 rounded-md" : "text-purple-200"} hover:text-pink-400 hover:underline font-medium transition-colors`}>Login</a>
            <a href="/register" className={`${pathname === "/register" ? "text-purple-800 bg-purple-200 px-3 py-1 rounded-md" : "text-purple-200"} hover:text-pink-400 hover:underline font-medium transition-colors`}>Register</a>
          </>
        )}
      </div>
    </nav>
  );
} 