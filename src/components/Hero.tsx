import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Calendar, Download, Sparkles, Code2, ShieldCheck, Zap, Activity, Clock } from "lucide-react";

interface HeroProps {
  onOpenConsultation: () => void;
  onOpenSample: () => void;
}

export default function Hero({ onOpenConsultation, onOpenSample }: HeroProps) {
  // Slots & Countdown Urgency Simulation
  const [slotsLeft, setSlotsLeft] = useState<number>(3);
  const [timeStr, setTimeStr] = useState<string>("04h 12m 35s");

  useEffect(() => {
    // 1. Slots urgency simulation (persisted in browser for realism across loads)
    const storedSlots = localStorage.getItem("arch_audit_slots_remaining");
    let currentSlots = 3;
    if (storedSlots) {
      currentSlots = parseInt(storedSlots, 10);
    } else {
      // Default to randomly 3 or 4 left
      currentSlots = Math.random() > 0.5 ? 3 : 4;
      localStorage.setItem("arch_audit_slots_remaining", currentSlots.toString());
    }
    setSlotsLeft(currentSlots);

    // After 18 seconds, simulate someone claiming a slot!
    const slotsTimeout = setTimeout(() => {
      if (currentSlots > 2) {
        setSlotsLeft(2);
        localStorage.setItem("arch_audit_slots_remaining", "2");
      }
    }, 18000);

    // 2. Continuous session countdown
    const sessionEndTimeKey = "arch_audit_countdown_end_time";
    let endTimeStr = sessionStorage.getItem(sessionEndTimeKey);
    let endTime: number;

    if (endTimeStr) {
      endTime = parseInt(endTimeStr, 10);
    } else {
      // 4 hours, 18 minutes from now
      endTime = Date.now() + (4 * 60 * 60 + 18 * 60) * 1000;
      sessionStorage.setItem(sessionEndTimeKey, endTime.toString());
    }

    const timer = setInterval(() => {
      const now = Date.now();
      const diff = endTime - now;

      if (diff <= 0) {
        // Reset rolling interval to keep conversion pressure active
        const nextEndTime = Date.now() + (3 * 60 * 60 + 45 * 60) * 1000;
        sessionStorage.setItem(sessionEndTimeKey, nextEndTime.toString());
        return;
      }

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const fHours = hours.toString().padStart(2, "0");
      const fMinutes = minutes.toString().padStart(2, "0");
      const fSeconds = seconds.toString().padStart(2, "0");

      setTimeStr(`${fHours}h ${fMinutes}m ${fSeconds}s`);
    }, 1000);

    return () => {
      clearTimeout(slotsTimeout);
      clearInterval(timer);
    };
  }, []);
  return (
    <section className="relative pt-32 pb-20 sm:pb-32 overflow-hidden bg-slate-950" id="hero">
      {/* Background Ornaments */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />
      <div className="absolute top-20 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-1/4 translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0)_0%,rgba(2,6,23,0.95)_100%)] bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: MARKETING COPY */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-widest"
            >
              <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> Scale Faster. Reduce Technical Debt.</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-tighter text-white uppercase leading-[0.95]"
            >
              Is Your Frontend{" "}
              <span className="text-indigo-500 block sm:inline">
                Slowing Down
              </span>{" "}
              Product Delivery?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl"
            >
              Architectural technical debt is the silent killer of product velocity. Unscalable React states, bloated package bundles, and hidden structural loopholes block 60% of growing SaaS development speed. Reclaim control with an expert technical audit.
            </motion.p>

            {/* Limited Availability Urgency Banner */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="w-full max-w-lg bg-slate-900/60 border border-indigo-500/15 rounded-2xl p-3.5 sm:py-3 sm:px-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 shadow-lg shadow-black/40 relative overflow-hidden"
              id="hero-urgency-banner"
            >
              {/* Subtle back glowing element */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-450 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                  ONLY <span className="text-rose-400 font-extrabold text-xs sm:text-[13px]">{slotsLeft} FREE AUDIT SLOTS</span> REMAINING THIS WEEK
                </span>
              </div>
              <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-start border-t sm:border-t-0 border-slate-900/60 pt-2 sm:pt-0 shrink-0 select-none">
                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-indigo-400/80" />
                  <span>Cycle Ends:</span>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-300 tracking-tight bg-indigo-950/40 px-2.5 py-0.5 border border-indigo-900/30 rounded-lg">
                  {timeStr}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2"
            >
              <button
                onClick={onOpenConsultation}
                className="flex items-center justify-center gap-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-indigo-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer text-xs uppercase tracking-wider"
              >
                <Calendar className="w-4 h-4" /> Book Free Consultation
              </button>

              <button
                onClick={onOpenSample}
                className="flex items-center justify-center gap-2.5 text-slate-300 hover:text-white font-semibold border border-slate-800 hover:border-slate-700 bg-slate-900/60 py-4 px-8 rounded-xl shadow-sm hover:bg-slate-900/95 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer text-xs uppercase tracking-wider"
              >
                <Download className="w-4 h-4" /> Download Sample Audit
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 border-t border-slate-900/80 w-full"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>NDA Protected Reviews</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <Zap className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>3-Day Audit Turnaround Available</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <Code2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Strictly React & TS Focused</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: DIAGNOSTIC TERMINAL INTERFACE MOCKUP */}
          <div className="lg:col-span-12 xl:col-span-5 relative mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-indigo-650/10 rounded-2xl blur-2xl pointer-events-none" />
            
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 font-mono text-xs overflow-hidden">
              {/* Header block */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500/70" />
                  <span className="text-[10px] text-slate-500 ml-1">raviteja-audit-v1.6.0</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-md px-2 py-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider">LIVE AUDIT</span>
                </div>
              </div>

              {/* Terminal Logs */}
              <div className="space-y-4 text-slate-350">
                <div className="flex items-start gap-2 border-l border-indigo-550/40 pl-3">
                  <span className="text-indigo-400">$</span>
                  <div>
                    <span className="text-slate-400">audit-diagnose --repo=</span>
                    <span className="text-indigo-300">"./src"</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Measuring dependency weight & memory triggers...</p>
                  </div>
                </div>

                {/* Performance indicators list */}
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-850 space-y-3">
                  <div className="flex justify-between items-center pb-1 border-b border-slate-900">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Performance Metrics</span>
                    <span className="text-red-400 font-bold text-[9px] border border-red-500/20 bg-red-950/25 px-1.5 py-0.5 rounded">ACTION REQ</span>
                  </div>
                  
                  {/* Gauge 1 */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>LCP Core Web Vital Payload</span>
                      <span className="text-red-400 font-bold">4.2s (Heavy Chunks)</span>
                    </div>
                    <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full w-[35%]" />
                    </div>
                  </div>

                  {/* Gauge 2 */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>State Propagation Loops</span>
                      <span className="text-yellow-400 font-bold">14 Cascades</span>
                    </div>
                    <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                      <div className="bg-yellow-400 h-full w-[65%]" />
                    </div>
                  </div>

                  {/* Goal */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Target Performance Standard</span>
                      <span className="text-indigo-400 font-bold">95%+ Goal</span>
                    </div>
                    <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full w-[95%]" />
                    </div>
                  </div>
                </div>

                {/* Alarm Log Output */}
                <div className="space-y-1.5 text-[10px] leading-relaxed">
                  <div className="flex items-center gap-2 text-red-400/90 bg-red-950/15 border border-red-900/20 p-2 rounded-lg">
                    <Activity className="w-3.5 h-3.5 shrink-0" />
                    <span>[CRITICAL] Render loop hazard inside AppContext.tsx (2.1k redundant checks)</span>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-400/95 bg-yellow-950/15 border border-yellow-905/20 p-2 rounded-lg">
                    <Activity className="w-3.5 h-3.5 shrink-0" />
                    <span>[HIGH] Over-coupling detected across 14 nested module imports</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Grid Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-16 sm:pt-24 border-t border-slate-900/40 mt-16">
          {[
            { metric: "10+", label: "Years of Frontend Expertise", accent: "from-indigo-400 to-indigo-200" },
            { metric: "45%+", label: "Average Page Load Speedup", accent: "from-indigo-400 to-white" },
            { metric: "2x+", label: "Faster Engineering Shipping", accent: "from-indigo-300 to-indigo-500" },
            { metric: "100%", label: "Unconditional Confidentiality", accent: "from-white to-indigo-400" },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-slate-900/40 border border-slate-900/80 rounded-2xl p-5 flex flex-col items-start space-y-1.5 hover:border-slate-800 transition-colors"
            >
              <span className={`text-2xl sm:text-3xl font-display font-black bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent`}>
                {stat.metric}
              </span>
              <span className="text-[11px] font-semibold text-slate-405 leading-snug">{stat.label}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
