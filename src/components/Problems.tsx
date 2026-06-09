import React from "react";
import { motion } from "motion/react";
import { Gauge, Landmark, AlertTriangle, Blocks, Network, UserMinus, ShieldAlert } from "lucide-react";
import { ProblemCard } from "../types";

export default function Problems() {
  const problems: (ProblemCard & { icon: React.ReactNode; severity: string; badgeColor: string })[] = [
    {
      id: "performance",
      title: "Slow Application Performance",
      symptom: "Bloated build payloads, un-split bundle weights (~3MB+), and unoptimized images or static files.",
      impactTitle: "Business Growth Blocked",
      businessImpact: "High customer abandonment, poor SEO rankings, and drop-offs during core onboarding or checkout flows.",
      icon: <Gauge className="w-5 h-5 text-red-400" />,
      severity: "CRITICAL HEALTH",
      badgeColor: "bg-red-950/40 border-red-500/30 text-red-400"
    },
    {
      id: "debt",
      title: "Compounding Technical Debt",
      symptom: "Deprecated styling standards, mix of class & functional React interfaces, and legacy unpatched node modules.",
      impactTitle: "Sluggish Shipping Speed",
      businessImpact: "Adding any new feature feels like fixing a puzzle. Easy 2-day tasks turn into 2-week fragile sprints.",
      icon: <Landmark className="w-5 h-5 text-amber-400" />,
      severity: "STEALTH LOSS",
      badgeColor: "bg-amber-950/40 border-amber-500/30 text-amber-400"
    },
    {
      id: "prod-issues",
      title: "Frequent Production Regressions",
      symptom: "State propagation pollution, random breaking of unrelated pages on production, and weak test coverages.",
      impactTitle: "Customer Churn & Trust Loss",
      businessImpact: "Developers spend 40% of their sprints hotfixing live bugs. Critical enterprise contracts cancel due to low SLA.",
      icon: <AlertTriangle className="w-5 h-5 text-orange-400" />,
      severity: "HIGH RISK",
      badgeColor: "bg-orange-950/40 border-orange-500/30 text-orange-400"
    },
    {
      id: "architecture",
      title: "Inconsistent Architecture",
      symptom: "Redux mixed with Context API mixed with Zustand plus massive unseparated directory hierarchies.",
      impactTitle: "Engineering Cognitive Load",
      businessImpact: "Zero source-of-truth. Every engineer invents a custom pattern, creating massive friction during pull reviews.",
      icon: <Blocks className="w-5 h-5 text-cyan-400" />,
      severity: "MODERATE VELOCITY",
      badgeColor: "bg-cyan-950/40 border-cyan-500/30 text-cyan-400"
    },
    {
      id: "scaling",
      title: "Fragile Code base Scaling",
      symptom: "Tightly-coupled business logic inside views, and single oversized component files with 1,500+ lines.",
      impactTitle: "Development Bottlenecks",
      businessImpact: "Adding new members doesn't scale productivity. Parallel developers run into constant Git merge conflicts.",
      icon: <Network className="w-5 h-5 text-purple-400" />,
      severity: "EXPONENTIAL DEBT",
      badgeColor: "bg-purple-950/40 border-purple-500/30 text-purple-400"
    },
    {
      id: "onboarding",
      title: "Long Developer Onboarding",
      symptom: "Undefined rules, lack of standard guidelines, tribal product knowledge, and a 20-step initial build setup.",
      impactTitle: "Wasted Resource Budgets",
      businessImpact: "New senior engineers spend 3-4 weeks just trying to run the app on their local machines without errors.",
      icon: <UserMinus className="w-5 h-5 text-pink-400" />,
      severity: "RESOURCE LEAK",
      badgeColor: "bg-pink-950/40 border-pink-500/30 text-pink-400"
    },
  ];

  return (
    <section className="py-20 border-t border-slate-900 bg-slate-950 relative overflow-hidden" id="challenges">
      {/* Absolute details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-[10px] font-bold uppercase tracking-widest mb-3">
            <span className="flex items-center gap-1.5 justify-center"><ShieldAlert className="w-3.5 h-3.5" /> High-Severity Risks</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tighter leading-none">
            Common Frontend Challenges <span className="text-indigo-505">Growing Teams Face</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-2xl mx-auto text-center leading-relaxed">
            How minor technical implementation shortcuts mutate into permanent, expensive business liabilities.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="problems-grid">
          {problems.map((prob, idx) => (
            <motion.div
              key={prob.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-slate-900 border border-slate-850 rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-300 group"
            >
              <div>
                {/* Card Top */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center border border-slate-800 shadow-md group-hover:scale-105 transition-transform duration-300">
                    {prob.icon}
                  </div>
                  <span className={`text-[9px] font-mono font-bold tracking-widest border rounded px-2.5 py-0.5 uppercase ${prob.badgeColor}`}>
                    {prob.severity}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-indigo-400 transition-colors">
                  {prob.title}
                </h3>

                {/* Symptoms */}
                <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
                  <strong className="text-slate-300 font-medium">Symptom:</strong> {prob.symptom}
                </p>
              </div>

              {/* Downstream Impact Alert */}
              <div className="mt-6 pt-4 border-t border-slate-800/60 bg-slate-950/40 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] font-mono font-bold text-red-400 tracking-wider uppercase block mb-1">
                  ⚠ Downstream Business Impact:
                </span>
                <p className="text-xs text-slate-400 leading-normal">
                  <strong className="text-slate-300 font-semibold">{prob.impactTitle}:</strong>{" "}
                  {prob.businessImpact}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
