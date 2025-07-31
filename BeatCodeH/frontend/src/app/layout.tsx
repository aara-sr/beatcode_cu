import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BeatCode - 1v1 Coding Battles",
  description: "Compete in real-time coding duels, get AI feedback, and climb the leaderboard!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen bg-black"}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
