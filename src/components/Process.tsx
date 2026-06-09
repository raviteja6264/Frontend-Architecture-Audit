import React from "react";
import { motion } from "motion/react";
import { Milestone, PhoneCall, Code, AreaChart, Award, ShieldAlert } from "lucide-react";
import { ProcessStep } from "../types";

export default function Process() {
  const steps: (ProcessStep & { icon: React.ReactNode })[] = [
    {
      stepNumber: 1,
      title: "Discovery Call",
      duration: "Day 1",
      description: "We align on your product business goals, current release cycles, friction points, team experience boundaries, and primary areas of anxiety.",
      deliverables: [
        "NDA agreement signatures",
        "Source repository reading access authorization setup",
        "Product architecture survey questionnaire"
      ],
      icon: <PhoneCall className="w-5 h-5 text-indigo-455" />
    },
    {
      stepNumber: 2,
      title: "Codebase Review",
      duration: "Days 2-3",
      description: "Surgical inspection of components, state hooks, styling patterns, dependencies lock files, and compiling configurations.",
      deliverables: [
        "Profile of major interactive page routes",
        "Detailed review of third-party bundler config trees",
        "Initial scan for package level safety vulnerabilities"
      ],
      icon: <Code className="w-5 h-5 text-indigo-455" />
    },
    {
      stepNumber: 3,
      title: "Technical Analysis",
      duration: "Days 4-5",
      description: "Undergoing deep diagnostics: flamegraph debugging, tracking re-render cascades, network overhead profiling, and compilation bottlenecks evaluation.",
      deliverables: [
        "Performance benchmarks under micro throttling simulation",
        "Complete structural dependency map analysis",
        "Evaluation of global state propagation overheads"
      ],
      icon: <AreaChart className="w-5 h-5 text-indigo-455" />
    },
    {
      stepNumber: 4,
      title: "Audit Report Delivery",
      duration: "Day 6",
      description: "Crafting a comprehensive blueprint document including visual telemetry scores, detailed priority fix matrices, and actionable roadmap structures.",
      deliverables: [
        "Executive Summary documentation with business risk levels",
        "Highly-prioritized structural fix-it matrix (Low/Med/High severity)",
        "Concrete 90-Day frontend scaling transformation roadmap"
      ],
      icon: <Award className="w-5 h-5 text-indigo-455" />
    },
    {
      stepNumber: 5,
      title: "Recommendations Session",
      duration: "Day 7",
      description: "A 90-minute walk-through call with your tech leads, engineering directors and stakeholders to review exact code fixes step-by-step.",
      deliverables: [
        "90-minute joint collaborative screenshare walkthrough session",
        "Video recording artifact of the technical review session",
        "Follow-up developer Slack questions support (14-day window)"
      ],
      icon: <Milestone className="w-5 h-5 text-indigo-455" />
    }
  ];

  return (
    <section className="py-20 border-t border-slate-900 bg-slate-950 relative" id="process">
      {/* Background line */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-slate-900/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-3">
            <span className="flex items-center gap-1.5 justify-center"><Milestone className="w-3.5 h-3.5" /> Clear Timeline</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tighter leading-none">
            The 5-Step Consulting Process
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-xl mx-auto">
            From initial discovery to joint recommendation walk-throughs in exactly one calendar week.
          </p>
        </div>

        {/* Process Roadmap Timeline */}
        <div className="relative border-l-2 border-slate-900 md:border-l-0 md:grid md:grid-cols-5 md:gap-4 pl-6 md:pl-0 space-y-12 md:space-y-0" id="process-steps">
          {/* Horizontal Connector Line for Desktop */}
          <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-0.5 bg-slate-800 z-0" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.stepNumber}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="relative z-10 flex flex-col items-start"
            >
              {/* Step Marker Bubble */}
              <div className="flex items-center md:flex-col md:items-start w-full relative">
                {/* Bubble Icon */}
                <div className={`absolute -left-[35px] md:relative md:left-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                  step.stepNumber === 3 ? "bg-indigo-650 border-indigo-550 text-white shadow-lg" : "bg-slate-800 border-slate-700 text-slate-300"
                } md:mb-4`}>
                  {step.stepNumber}
                </div>
                {/* Duration Badge */}
                <span className="ml-3 md:ml-0 inline-flex items-center bg-slate-900 border border-slate-850 text-indigo-400 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold leading-none uppercase">
                  {step.duration}
                </span>
              </div>

              {/* Title & Description */}
              <div className="mt-3 md:mt-4 space-y-1">
                <h3 className="font-display font-bold text-base text-slate-200">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed pr-2">
                  {step.description}
                </p>
              </div>

              {/* Action Deliverables Subcard */}
              <div className="mt-4 bg-slate-900/30 border border-slate-850 rounded-xl p-3 w-full space-y-1.5 hover:bg-slate-900/50 transition-colors">
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                  Action Checklist:
                </span>
                <ul className="space-y-1">
                  {step.deliverables.map((del, dIdx) => (
                    <li key={dIdx} className="text-[10px] text-slate-400 flex items-start gap-1 pb-0.5 border-b border-sans last:border-0 leading-normal">
                      <span className="text-indigo-400 font-bold shrink-0">·</span>
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
