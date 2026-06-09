import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Terminal, Cpu, HardDrive, Wifi } from "lucide-react";

interface SkeletonLoaderProps {
  onComplete: () => void;
}

export default function SkeletonLoader({ onComplete }: SkeletonLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Initializing CDN cache handshake...");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Simulate interactive micro-boot processes
    const segments = [
      { max: 20, msg: "Connecting to edge servers..." },
      { max: 40, msg: "Optimizing bundle chunking sizes..." },
      { max: 65, msg: "Compiling responsive styling layouts..." },
      { max: 85, msg: "Analyzing server-side rendering hydrated trees..." },
      { max: 100, msg: "Pristine UI hydration successful!" },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 3;
        const currentSegment = segments.find(s => next <= s.max) || segments[segments.length - 1];
        setStatusMessage(currentSegment.msg);

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 300);
          return 100;
        }
        return next;
      });
    }, 90);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden" id="skeleton-loader-screen">
      {/* Top glowing progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-slate-900 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Network / Optimizer HUD */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md py-4 px-6 fixed top-0 left-0 right-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
            <Cpu className="w-4 h-4 animate-spin-slow text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-black text-slate-100 tracking-tight uppercase">FE AUDIT DECK</span>
              <span className="text-[8px] font-mono bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 px-1.5 py-0.5 rounded font-bold">14.2ms RTT</span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5 flex items-center gap-1">
              <Wifi className="w-3 h-3 text-emerald-400 shrink-0 animate-pulse" />
              Hydrating optimized layout skeleton... {progress}%
            </p>
          </div>
        </div>

        <button 
          onClick={onComplete}
          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-lg text-[9px] font-mono text-slate-400 hover:text-white transition-all cursor-pointer"
          id="skip-skeleton-btn"
        >
          Skip Hydration [Esc]
        </button>
      </header>

      {/* Skeletons Container */}
      <main className="max-w-7xl mx-auto w-full pt-24 px-6 md:px-12 flex-grow space-y-16 pb-20">
        
        {/* Hero Section Skeleton */}
        <section className="space-y-8 py-10">
          <div className="max-w-3xl space-y-4">
            {/* Super header tag */}
            <div className="h-4 w-40 bg-slate-900 border border-slate-850 rounded-full animate-pulse" />
            
            {/* Title block */}
            <div className="space-y-2">
              <div className="h-8 md:h-12 w-full max-w-xl bg-slate-900 rounded-xl animate-pulse" />
              <div className="h-8 md:h-12 w-2/3 bg-slate-900 rounded-xl animate-pulse" />
            </div>
            
            {/* Subtitle */}
            <div className="space-y-1.5 pt-2">
              <div className="h-3 w-5/6 bg-slate-900/80 rounded-md animate-pulse" />
              <div className="h-3 w-4/5 bg-slate-900/80 rounded-md animate-pulse" />
              <div className="h-3 w-3/4 bg-slate-950 rounded-md animate-pulse" />
            </div>

            {/* Buttons row */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="h-11 w-44 bg-slate-900 rounded-xl animate-pulse border border-slate-850" />
              <div className="h-11 w-52 bg-slate-900/50 rounded-xl animate-pulse border border-slate-850/40" />
            </div>
          </div>

          {/* Large diagnostic mock layout */}
          <div className="w-full bg-slate-900/40 border border-slate-850 rounded-2xl p-6 relative overflow-hidden" id="hero-diagnostic-loading-screen">
            <div className="absolute top-0 right-0 w-44 h-44 bg-indigo-500/5 rounded-full blur-2xl animate-pulse" />
            
            <div className="flex items-center justify-between border-b border-slate-850 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                <div className="h-3 w-36 bg-slate-900 rounded-md animate-pulse ml-2" />
              </div>
              <div className="h-5 w-24 bg-slate-900 rounded-md animate-pulse" />
            </div>

            {/* Simulated bento widgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3 p-4 bg-slate-900/80 border border-slate-850 rounded-xl animate-pulse">
                <div className="h-3 w-1/2 bg-slate-800 rounded-md" />
                <div className="h-6 w-1/4 bg-slate-800 rounded-md" />
                <div className="h-2 w-full bg-slate-800 rounded-sm" />
              </div>
              <div className="space-y-3 p-4 bg-slate-900/80 border border-slate-850 rounded-xl animate-pulse">
                <div className="h-3 w-1/2 bg-slate-800 rounded-md" />
                <div className="h-6 w-1/4 bg-slate-800 rounded-md animate-pulse" />
                <div className="h-2 w-full bg-slate-800 rounded-sm" />
              </div>
              <div className="space-y-3 p-4 bg-slate-900/80 border border-slate-850 rounded-xl animate-pulse">
                <div className="h-3 w-1/3 bg-slate-800 rounded-md" />
                <div className="h-6 w-1/3 bg-slate-800 rounded-md" />
                <div className="h-2 w-full bg-slate-800 rounded-sm" />
              </div>
            </div>
            
            {/* Larger bottom graph simulation */}
            <div className="mt-6 h-32 w-full bg-slate-900/60 rounded-xl border border-slate-850 animate-pulse flex items-end p-4 space-x-2">
              <div className="w-full h-8 bg-slate-800 rounded-sm" />
              <div className="w-full h-16 bg-slate-800/80 rounded-sm" />
              <div className="w-full h-24 bg-indigo-500/10 border-t border-indigo-500/20 rounded-sm" />
              <div className="w-full h-12 bg-slate-800 rounded-sm" />
              <div className="w-full h-20 bg-slate-800/80 rounded-sm" />
            </div>
          </div>
        </section>

        {/* Challenge / Section Skeletons */}
        <section className="space-y-6 pt-6">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <div className="h-4 w-32 bg-slate-900 rounded-full mx-auto animate-pulse" />
            <div className="h-6 w-64 bg-slate-900 rounded-lg mx-auto animate-pulse" />
            <div className="h-3 w-48 bg-slate-900/70 rounded-md mx-auto animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {[1, 2, 3].map((idx) => (
              <div 
                key={idx} 
                className="bg-slate-900/30 border border-slate-850 rounded-2xl p-5 space-y-4 animate-pulse"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800" />
                <div className="h-4 w-3/4 bg-slate-900 rounded-md" />
                <div className="space-y-1.5">
                  <div className="h-2 w-full bg-slate-900/80 rounded-sm" />
                  <div className="h-2 w-full bg-slate-900/80 rounded-sm" />
                  <div className="h-2 w-2/3 bg-slate-900/80 rounded-sm" />
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Terminal Logging Simulation at the very bottom right for professional UI audit theme */}
      <footer className="border-t border-slate-900 bg-slate-950 p-4 fixed bottom-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono select-none">
          <div className="flex items-center gap-2.5 text-xs text-slate-400">
            <Terminal className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span className="text-slate-500">SYSTEM LOG:</span>
            <span className="text-slate-300 font-bold">{statusMessage}</span>
          </div>

          <div className="flex items-center gap-4 text-[10px]">
            <span className="text-slate-600">VITE_DEV_SERVER: hydrated</span>
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-850 px-2 py-0.5 rounded text-indigo-400">
              <HardDrive className="w-3 h-3 text-indigo-400 shrink-0" />
              <span>Edge Mode offline-first ready</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
