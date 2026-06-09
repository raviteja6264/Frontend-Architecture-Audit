import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, ChevronRight, ArrowUpRight, CheckCircle2, 
  Sparkles, ShieldCheck, Zap, BarChart3, TrendingUp, Cpu
} from "lucide-react";

interface MetricRow {
  label: string;
  before: string;
  after: string;
  unit?: string;
  isImproved: boolean;
}

interface CaseStudy {
  id: string;
  companyName: string;
  industry: string;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  lighthouseBefore: number;
  lighthouseAfter: number;
  metrics: MetricRow[];
  stack: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "saas-dashboard",
    companyName: "Veloce Corp",
    industry: "Enterprise SaaS Dashboard",
    title: "Re-engineering slow, monolithic dashboards for 2.4x retention boost",
    description: "Veloce's central administration panel was plagued with heavy render-blocking scripts, unvirtualized transaction tables, and global context cascade issues that caused visible input delays.",
    challenge: "High client-side latency: every keystroke in filtering searches forced full component subtree re-renders. Combined with static import bundles, users waited averages of 6.2s to start using the system.",
    solution: "Segmented global React Context providers into distinct slices. Deployed standard lists virtualization, dynamic dynamic imports routing, and localized debounced controller inputs.",
    lighthouseBefore: 34,
    lighthouseAfter: 94,
    metrics: [
      { label: "Core Bundle Size", before: "2.8 MB", after: "340 KB", isImproved: true },
      { label: "Time to Interactive (TTI)", before: "6.2s", after: "1.4s", isImproved: true },
      { label: "Input Response Latency", before: "280ms", after: "12ms", isImproved: true },
      { label: "Cumulative Layout Shift (CLS)", before: "0.18", after: "0.01", isImproved: true }
    ],
    stack: ["React 18", "Vite", "Tailwind CSS", "Zustand", "react-window"]
  },
  {
    id: "e-commerce",
    companyName: "Aura Apparel",
    industry: "High-Volume Retail Storefront",
    title: "Slashing LCP from 5.4 seconds down to sub-one second at edge scale",
    description: "Aura's e-commerce storefront suffered from extreme layout shift coefficients, raw non-compressed images catalog, and third-party customer chat scripts completely hijacking early main thread execution.",
    challenge: "Over 42% mobile bounce rate directly isolated to high rendering wait indices. Largest Contentful Paint was delayed due to heavy initial HTTP payloads and un-deferred embed tags.",
    solution: "Built responsive WebP/AVIF dynamic image transformations, implemented skeleton loading boundaries, and lazily deferred chat widgets until 3 seconds post-first-interaction.",
    lighthouseBefore: 41,
    lighthouseAfter: 97,
    metrics: [
      { label: "Largest Contentful Paint (LCP)", before: "5.4s", after: "0.9s", isImproved: true },
      { label: "Total Asset Load Payload", before: "14.5 MB", after: "1.1 MB", isImproved: true },
      { label: "First Input Delay (FID)", before: "185ms", after: "9ms", isImproved: true },
      { label: "Conversion Rate Improvement", before: "1.8%", after: "3.2%", isImproved: true }
    ],
    stack: ["Vite", "Cloudflare Images CDN", "Tailwind CSS", "IntersectionObserver API"]
  },
  {
    id: "fintech-hub",
    companyName: "Nexa Finance",
    industry: "Multi-Portfolio Trading Platform",
    title: "Eliminating 92% redundant REST fetches for modular FinTech system",
    description: "Nexa's dashboard was firing redundant simultaneous telemetry calls, rendering dense interactive charts during early paint loops, and suffering from circular dependency import loops.",
    challenge: "A complex monorepo with multiple teams committing side effects. Users experienced interface stuttering and double data flashes as disconnected components refetched shared collections.",
    solution: "Introduced standardized Query Caching keys. Designed lazy loaders for charting libraries, and established isolated domain-driven package boundaries using modular workspaces.",
    lighthouseBefore: 48,
    lighthouseAfter: 92,
    metrics: [
      { label: "Concurrent Telemetry Queries", before: "12 / min", after: "1 / min", isImproved: true },
      { label: "Lighthouse Performance", before: "48 / 100", after: "92 / 100", isImproved: true },
      { label: "Active Memory Footprint", before: "420 MB", after: "130 MB", isImproved: true },
      { label: "Asset Compilation Chunks", before: "1 Mono-Chunk", after: "14 Split-Files", isImproved: true }
    ],
    stack: ["Monorepo Workspaces", "TanStack Query", "Recharts", "TypeScript Strict"]
  }
];

export default function CaseStudies() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0); // -1 for left, 1 for right

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % CASE_STUDIES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
  };

  const currentStudy = CASE_STUDIES[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <section className="relative py-20 sm:py-28 bg-slate-950 overflow-hidden border-t border-slate-900" id="client-case-studies">
      {/* Decorative vector grid backing */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />
      
      {/* Visual background lights */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-505/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-3">
            <span className="flex items-center gap-1.5 justify-center">
              <BarChart3 className="w-3.5 h-3.5 text-indigo-400" /> Transformation journeys
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-100 uppercase sm:leading-tight">
            Client Case Studies
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 max-w-2xl mx-auto font-sans leading-relaxed">
            Real performance outcomes demonstrating deep React audit engineering optimizations. See actual comparison indicators across real software platforms.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto" id="case-studies-carousel-container">
          
          {/* Main Card Frame */}
          <div className="bg-slate-900/60 border border-slate-850 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden relative backdrop-blur-md min-h-[520px] flex flex-col justify-between">
            
            {/* Top Tag & Navigation buttons */}
            <div className="flex items-center justify-between border-b border-slate-850 pb-5 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                  {currentStudy.industry}
                </span>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer active:scale-95"
                  aria-label="Previous case study"
                  id="case-study-prev-btn"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="text-[10px] font-mono text-slate-500">
                  <span className="text-slate-300 font-bold">{currentIndex + 1}</span> / {CASE_STUDIES.length}
                </div>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer active:scale-95"
                  aria-label="Next case study"
                  id="case-study-next-btn"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Inner Content Area with Slides translation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
              
              {/* Left Column: Context & Solution details */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <span className="text-indigo-400 font-sans font-black tracking-wide text-xs uppercase block">
                    {currentStudy.companyName}
                  </span>
                  <h3 className="text-lg sm:text-xl font-display font-black text-slate-100 uppercase tracking-tight mt-1">
                    {currentStudy.title}
                  </h3>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed font-sans">
                  {currentStudy.description}
                </p>

                <div className="space-y-3.5 pt-2">
                  <div className="bg-slate-950/55 p-3.5 rounded-xl border border-red-500/10">
                    <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-rose-400 block mb-1">
                      Architectural Bottleneck:
                    </span>
                    <p className="text-slate-450 text-[11px] leading-relaxed">
                      {currentStudy.challenge}
                    </p>
                  </div>

                  <div className="bg-slate-950/55 p-3.5 rounded-xl border border-emerald-500/10">
                    <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-emerald-400 block mb-1">
                      Engineered Solution:
                    </span>
                    <p className="text-slate-450 text-[11px] leading-relaxed">
                      {currentStudy.solution}
                    </p>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentStudy.stack.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-0.5 bg-slate-950 border border-slate-850 text-slate-400 font-mono text-[9px] font-bold rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Comparative Metrics dashboard */}
              <div className="lg:col-span-5 bg-slate-950/60 border border-slate-850 rounded-xl p-5 sm:p-6 space-y-6 relative overflow-hidden">
                {/* Score Dial & Radial Progress */}
                <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                  <div>
                    <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-slate-500 block">
                      Lighthouse Rating
                    </span>
                    <span className="text-xs font-semibold text-slate-350 font-sans mt-1 block">
                      Core Web Index
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <span className="text-[8px] font-mono text-slate-500 uppercase block">Before</span>
                      <span className="text-sm font-mono font-bold text-rose-500 line-through bg-rose-500/5 px-2 py-0.5 rounded border border-rose-500/10">
                        {currentStudy.lighthouseBefore}
                      </span>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center text-slate-650">
                      <TrendingUp className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                    </div>

                    <div className="text-center">
                      <span className="text-[8px] font-mono text-slate-500 uppercase block">After</span>
                      <span className="text-sm font-mono font-bold text-emerald-450 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shadow-sm shadow-emerald-900/10">
                        {currentStudy.lighthouseAfter}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics Rows */}
                <div className="space-y-3">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                    Before vs. After Telemetry Comparison
                  </span>

                  <div className="space-y-2">
                    {currentStudy.metrics.map((row, idx) => (
                      <div 
                        key={idx}
                        className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-850/80 flex items-center justify-between text-[11px] transition-all hover:bg-slate-900 duration-200"
                      >
                        <span className="font-sans font-medium text-slate-350">
                          {row.label}
                        </span>

                        <div className="flex items-center gap-2 font-mono">
                          <span className="text-slate-500 line-through">
                            {row.before}
                          </span>
                          <span className="text-slate-600">→</span>
                          <span className="text-emerald-450 font-bold bg-emerald-500/5 px-1.5 py-0.5 rounded">
                            {row.after}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtle audit verified signature */}
                <div className="flex items-center gap-1.5 pt-2 text-[9px] text-indigo-400 font-mono font-bold tracking-wider uppercase justify-center select-none bg-indigo-500/5 py-1.5 rounded-lg border border-indigo-500/10 border-dashed">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Verified Performance Record</span>
                </div>
              </div>

            </div>

            {/* Slider visual dot controls footer */}
            <div className="flex justify-center items-center gap-1.5 mt-8 border-t border-slate-850/60 pt-5">
              {CASE_STUDIES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx 
                      ? "w-6 bg-indigo-500" 
                      : "w-1.5 bg-slate-800 hover:bg-slate-700"
                  }`}
                  aria-label={`Go to case study ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
