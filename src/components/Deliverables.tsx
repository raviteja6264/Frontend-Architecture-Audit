import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Layers, Flame, AlertOctagon, TrendingUp, Grid, ShieldCheck, CheckSquare, FileText, ArrowRight } from "lucide-react";
import { DeliverableItem } from "../types";

export default function Deliverables() {
  const [activeTab, setActiveTab] = useState<string>("summary");

  const items: DeliverableItem[] = [
    {
      id: "summary",
      title: "Executive Summary",
      iconName: "FileText",
      tagline: "High-level diagnostic translating engineering debt to business metrics.",
      details: "A non-technical summary designed for CEOs, CFOs, and Product Directors. It maps deep architectural complications to direct cash-burn metrics, product release delay risks, and potential engineering hiring leakage.",
      exampleDeliverable: "1-Page Executive PDF outlining overall health indexes (out of 100), top 3 immediate risk vectors, and bottom-line development throughput predictions.",
      badge: "NON-TECHNICAL OK",
      format: "PDF Document & Keynote Deck"
    },
    {
      id: "architecture",
      title: "Architecture Findings",
      iconName: "Layers",
      tagline: "State management structures, decoupling boundaries, and package audits.",
      details: "An exhaustive engineering deep-dive on circular dependency locks, unmoderated cross-importation, and state propagation flow patterns. Evaluates why simple code releases often cause unintended regression errors in prod.",
      exampleDeliverable: "Interactive dependency hierarchy map showing exact nodes to decouple, along with refactored boilerplate code segments showing clean patterns.",
      badge: "ENGINEERING LEVEL",
      format: "Annotated Codebase Walkthrough"
    },
    {
      id: "performance",
      title: "Performance Analysis",
      iconName: "Flame",
      tagline: "Flamegraphs, browser paint delays, and bundle analyzer exports.",
      details: "Full diagnostics of browser loads. Pinpoints core Web Vitals, un-split chunk sizes, layout thrashing, CSS rules weight, and state mutation trigger cascades that cause UI freezes or delayed load frames.",
      exampleDeliverable: "React Profiler traces highlighting exact line numbers causing cascade re-renders, with side-by-side bundle analyzer tree diagrams.",
      badge: "PROFILER TRACES",
      format: "Diagnostic Report & Flamegraphs"
    },
    {
      id: "risks",
      title: "Risk Assessment",
      iconName: "AlertOctagon",
      tagline: "Security vulnerabilities, dependency loops, and single-points of failure.",
      details: "Prioritized assessment of library security, package end-of-life status, single points of failure, and scalability bottlenecks. Essential for due-diligence preparation or enterprise-client security compliance reviews.",
      exampleDeliverable: "Risk matrix cataloging CVE security vulnerability impacts, version compatibility blockades, and package maintenance lifespans.",
      badge: "SECURITY GATEWAY",
      format: "Audit Register (A-F grading)"
    },
    {
      id: "roadmap",
      title: "90-Day Roadmap",
      iconName: "TrendingUp",
      tagline: "Phased action plan from quick-win fixes to foundational scale shifts.",
      details: "A pragmatically phased action blueprint sorted into three progressive 30-day buckets. Ensures you resolve highest-impact issues and critical bugs first without stopping new business feature delivery.",
      exampleDeliverable: "Phased Gantt-style planning map split by days, detailing assigned roles, verification metrics, and estimated developer hours for each task.",
      badge: "MANAGEMENT READY",
      format: "Airtable / Linear / Jira Import Template"
    },
    {
      id: "matrix",
      title: "Priority Matrix",
      iconName: "Grid",
      tagline: "Cost vs. Benefit positioning of suggested code changes.",
      details: "An engineering-ready matrix plotting suggested architectural shifts against developer implementation cost vs immediate speed-up benefit. Helps your product managers prioritize fixes efficiently.",
      exampleDeliverable: "Four-quadrant chart classifying fixes into 'Quick Wins' (e.g., config changes), 'Foundational Projects' (e.g., state decoupling), and 'Deprioritize'.",
      badge: "DECISION ENGINE",
      format: "Interactive Notion Board Link"
    }
  ];

  const currentItem = items.find((i) => i.id === activeTab) || items[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "FileText": return <FileText className="w-5 h-5" />;
      case "Layers": return <Layers className="w-5 h-5" />;
      case "Flame": return <Flame className="w-5 h-5" />;
      case "AlertOctagon": return <AlertOctagon className="w-5 h-5" />;
      case "TrendingUp": return <TrendingUp className="w-5 h-5" />;
      case "Grid": return <Grid className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-20 border-t border-slate-900 bg-slate-900/10 relative" id="deliverables">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-indigo-500/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-3">
            <span className="flex items-center gap-1.5 justify-center"><ShieldCheck className="w-3.5 h-3.5" /> Concrete Deliverables</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tighter leading-none">
            Comprehensive Audit Deliverables
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed">
            You don't receive shallow automated advice. You get high-value, bespoke documents designed to drive immediate engineering actions.
          </p>
        </div>

        {/* Interactive Deck Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="deliverables-deck-wrapper">
          {/* Deck tabs list */}
          <div className="lg:col-span-4 flex flex-col gap-2.5" id="deliverables-tabs">
            {items.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-between p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-slate-900 border-indigo-500 shadow-inner"
                    : "bg-slate-950/40 border-slate-900 hover:border-slate-800 hover:bg-slate-950/70"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                    activeTab === tab.id ? "bg-indigo-950 text-indigo-400 border-indigo-500/25" : "bg-slate-900 text-slate-500 border-slate-800"
                  }`}>
                    {getIcon(tab.iconName)}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wide ${activeTab === tab.id ? "text-slate-100" : "text-slate-400"}`}>
                    {tab.title}
                  </span>
                </div>
                <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                  activeTab === tab.id ? "text-indigo-400 translate-x-1" : "text-slate-600 group-hover:text-slate-400"
                }`} />
              </button>
            ))}
          </div>

          {/* Active deliverable view */}
          <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 min-h-[420px] flex flex-col justify-between relative overflow-hidden" id="active-deck-card">
            {/* Corner visual decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 font-bold border border-indigo-500/20 bg-indigo-950/10 px-2.5 py-0.5 rounded-full tracking-wider uppercase">
                      {currentItem.badge}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl text-slate-100 mt-2">{currentItem.title}</h3>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase font-black uppercase">Standard Format</span>
                    <span className="text-xs font-semibold text-slate-300 block mt-0.5">{currentItem.format}</span>
                  </div>
                </div>

                {/* Tagline & details */}
                <div className="space-y-3">
                  <span className="text-sm font-semibold text-slate-200">{currentItem.tagline}</span>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{currentItem.details}</p>
                </div>

                {/* Specific Deliverable Example Box */}
                <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-850 space-y-2 mt-4 relative">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-indigo-400" />
                    <span className="text-[10px] font-mono font-bold text-indigo-400 tracking-widest uppercase">Concrete Report Example</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-normal pl-6">
                    {currentItem.exampleDeliverable}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
