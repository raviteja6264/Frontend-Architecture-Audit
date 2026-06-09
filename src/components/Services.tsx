import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileSearch, Settings2, BarChart3, Binary, ShieldAlert, Cpu, HeartHandshake, Milestone } from "lucide-react";
import { ServiceCard } from "../types";

export default function Services() {
  const [activeServiceId, setActiveServiceId] = useState<string>("arch-review");

  const services: (ServiceCard & { icon: React.ReactNode; shortDesc: string })[] = [
    {
      id: "arch-review",
      title: "Frontend Architecture Review",
      shortDesc: "Assessment of system architecture, state flow patterns, and code modular block design.",
      description: "A comprehensive investigation of your overall application model. We evaluate folder-structures, packaging, modularity patterns, and how data interacts with state engines across different layers.",
      deliverables: [
        "In-depth analysis of parent and child module dependency diagrams",
        "Evaluation of global vs localized state-management frameworks (Zustand, Redux, Context)",
        "Audit of asynchronous API-caching boundaries (TanStack Query, RTK Query, Axios)"
      ],
      benefits: [
        "Elimination of circular import bottlenecks and structural single points of failure",
        "Pristine decoupling of business rules from presenter components",
        "Clear blueprints for future mono-repo or micro-frontend scalability"
      ],
      outcomes: [
        "Double developer team velocity via clean, highly-modular code boundaries",
        "Easy 3-step feature additions replace painful, multi-file code searches"
      ],
      icon: <FileSearch className="w-5 h-5 text-indigo-400" />
    },
    {
      id: "perf-audit",
      title: "React Performance Audit",
      shortDesc: "Identification of rendering cascades, heavy bundles, and Lighthouse bottleneck parameters.",
      description: "Deep diagnostic scanning into browser-side performance problems. We inspect layout thrashing, micro-optimizations, package payloads, and React hooks dependencies to achieve 90+ score criteria.",
      deliverables: [
        "React Profiler session analysis trace logs",
        "Interactive flamegraph highlights of state-propagation cascades",
        "Web Vitals diagnostic (LCP, INP, CLS) and Bundle-analyzer layout exports"
      ],
      benefits: [
        "Instant responsive actions on critical CTA and page interactions",
        "Dramatic cold load download footprint compression (from megabytes to small kilobytes)",
        "Dramatically reduced mobile devices data consumption and battery drainage"
      ],
      outcomes: [
        "45%+ faster page-load metrics leading to instant user responsiveness",
        "Up to 15% conversion lift on checkout paths and primary signup rates"
      ],
      icon: <BarChart3 className="w-5 h-5 text-indigo-400" />
    },
    {
      id: "debt-assessment",
      title: "Technical Debt Assessment",
      shortDesc: "Identification of outdated packages, security risks, vulnerability patches and layout issues.",
      description: "We catalog deprecated styling patterns, legacy class layers, build scripts, and node package conflicts. This isolates immediate risks that threaten continuous delivery pipelines.",
      deliverables: [
        "Complete outdated packages severity chart with security advisory list",
        "Vulnerability reports for production assets and client bundles",
        "Prioritized list of modules violating strict hydration or rendering principles"
      ],
      benefits: [
        "Removal of immediate dependency locks and future-proofing the React 19+ upgrades",
        "Lower risk profile with audited, secure third-party libraries",
        "Slashed continuous integration build times (e.g., from 15 minutes down to 3 minutes)"
      ],
      outcomes: [
        "Peace of mind during fast-moving production deploy intervals",
        "Significantly lower infrastructure and CI billing overheads"
      ],
      icon: <Cpu className="w-5 h-5 text-indigo-400" />
    },
    {
      id: "quality-review",
      title: "Code Quality Review",
      shortDesc: "Consistency review, type safety levels, styling pattern audits and testing coverage review.",
      description: "Evaluation of the actual human code written. We audit TypeScript strict compliance, static coding rules, styling coherence (Tailwind, SCSS, styled-components), and review rules.",
      deliverables: [
        "Lint rule sets and TypeScript compiler strictness configurations",
        "Pull-request workflow bottleneck and engineering review audit report",
        "Custom styling guideline template cards to align engineering members"
      ],
      benefits: [
        "Elimination of silent type casts ('any') that leak application runtime bugs",
        "Fast code-review loops with automated linters enforcing uniform clean stylings",
        "Seamless horizontal team scaling where everyone easily reads anyone else's code"
      ],
      outcomes: [
        "A proud culture centered around high quality, zero-bug technical excellence",
        "Junior and mid-level developers learn best architectural guidelines seamlessly"
      ],
      icon: <Binary className="w-5 h-5 text-indigo-400" />
    },
    {
      id: "scalability-assessment",
      title: "Scalability Assessment",
      shortDesc: "Pragmatic analysis of team organization, feature expansion, and continuous integration pipelines.",
      description: "Review of whether your codebase is designed to grow gracefully. We analyze compile caching, PR conflicts, developer staging setups, and testing frameworks to prevent bottlenecks.",
      deliverables: [
        "Evaluation of local build caches and monorepo solutions (Turbo, Nx)",
        "Staging, review environment setups, and preview infrastructure assessment",
        "Testing automation layout reports (Playwright, Jest, Vitest)"
      ],
      benefits: [
        "Fast, reliable test coverage suite that increases deployment safety",
        "Instant code verification on commits and automated preview link generation",
        "No more merge hell conflicts on active main branches"
      ],
      outcomes: [
        "Scale the frontend team from 5 to 50 developers without losing shipping velocity",
        "Rapid onboarding of new engineering talent within hours instead of weeks"
      ],
      icon: <Milestone className="w-5 h-5 text-indigo-400" />
    }
  ];

  const selectedService = services.find((s) => s.id === activeServiceId) || services[0];

  return (
    <section className="py-20 border-t border-slate-900 bg-slate-900/20 relative" id="services">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-505/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-3">
            <span className="flex items-center gap-1.5 justify-center"><Settings2 className="w-3.5 h-3.5" /> Comprehensive Scope</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tighter leading-none">
            What I Review in <span className="text-indigo-500">Your Frontend Codebase</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-2xl mx-auto text-center leading-relaxed">
            A surgical technical assessment targeting performance bugs, architectural leaks, and compounding debt.
          </p>
        </div>

        {/* Desktop Services Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12" id="services-interactive-wrapper">
          {/* Navigation panel */}
          <div className="lg:col-span-5 flex flex-col space-y-3" id="service-navigation-tabs">
            {services.map((svc) => (
              <button
                key={svc.id}
                onClick={() => setActiveServiceId(svc.id)}
                className={`flex items-start text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                  activeServiceId === svc.id
                    ? "bg-slate-900 border-indigo-500 shadow-md shadow-indigo-500/5"
                    : "bg-slate-950/40 border-slate-900 hover:border-slate-800 hover:bg-slate-950/70"
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center border shrink-0 mr-4 ${
                  activeServiceId === svc.id ? "bg-indigo-950 text-indigo-400 border-indigo-500/25" : "bg-slate-900 text-slate-500 border-slate-800"
                }`}>
                  {svc.icon}
                </div>
                <div>
                  <h3 className={`font-semibold text-sm ${activeServiceId === svc.id ? "text-indigo-400" : "text-slate-300"}`}>
                    {svc.title}
                  </h3>
                  <p className="text-slate-500 text-[11px] mt-1 leading-relaxed line-clamp-1">{svc.shortDesc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Active Detail Display */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 min-h-[420px] flex flex-col justify-between" id="active-service-details">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedService.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Title */}
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-bold">Scope Focus Area</span>
                  <h3 className="font-display font-black text-2xl text-slate-100 mt-1">{selectedService.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">{selectedService.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
                  {/* Scope Deliverables */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">
                      📋 Scope Deliverables
                    </span>
                    <ul className="space-y-2">
                       {selectedService.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start text-xs text-slate-400 leading-normal">
                          <span className="text-indigo-400 font-mono font-bold mr-2 select-none">{idx + 1}.</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Core Benefits */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">
                      🚀 Key Benefits
                    </span>
                    <ul className="space-y-2">
                      {selectedService.benefits.map((item, idx) => (
                        <li key={idx} className="flex items-start text-xs text-slate-400 leading-normal">
                          <span className="text-indigo-400 font-semibold mr-2 shrink-0 select-none">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Measurable Value Banner */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-805 flex items-start gap-3 mt-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950/20 flex items-center justify-center shrink-0 border border-emerald-900/30">
                    <HeartHandshake className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest">Expected Business Outcomes</span>
                    <ul className="space-y-1 mt-1 text-xs text-slate-300">
                      {selectedService.outcomes.map((item, idx) => (
                        <li key={idx} className="list-disc pl-1 ml-3">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
