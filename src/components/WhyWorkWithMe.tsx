import React from "react";
import { motion } from "motion/react";
import { Award, Zap, CodeIcon, ShieldCheck, HeartHandshake, UserCheck, Terminal, GraduationCap } from "lucide-react";

export default function WhyWorkWithMe() {
  const credentials = [
    {
      title: "10+ Years of Experience",
      desc: "Deep background building complex web systems across SaaS products, scaling teams, and establishing engineering directives.",
      icon: <Award className="w-5 h-5 text-indigo-400" />
    },
    {
      title: "Enterprise Architecture Mastery",
      desc: "Proven track record auditing huge core state graphs, managing multi-tier dependencies, and scaling frontends to 20M+ users.",
      icon: <Terminal className="w-5 h-5 text-indigo-400" />
    },
    {
      title: "Technical Leadership & Mentoring",
      desc: "10+ years guiding senior engineering groups, setting strict review workflows, and training junior developers to ship bug-free code.",
      icon: <GraduationCap className="w-5 h-5 text-indigo-400" />
    },
    {
      title: "Surgical Performance optimization",
      desc: "Focused on bundle-splitting, removing nested paint layout issues, state loops decoupling, and accelerating speed scores.",
      icon: <Zap className="w-5 h-5 text-indigo-400" />
    }
  ];

  return (
    <section className="py-20 border-t border-slate-900 bg-slate-950 relative overflow-hidden" id="about">
      {/* Visual background details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text / Info Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5 justify-center"><UserCheck className="w-3.5 h-3.5 text-indigo-400" /> Lead Consultant Architect</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tighter leading-none">
              Meet Raviteja M
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              I am a Lead Frontend Architect with over 10 years of professional React, JavaScript, and TypeScript engineering experience. My ultimate mission is simple: <strong>unblock growing product engineering groups by injecting production-grade architectural rules & stripping code fatigue.</strong>
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Throughout my tech career, I have audited massive SaaS dashboards, refactored high-stakes checkout flows, and guided development speed improvements. I don't just point out structural errors; I write clean, optimized code and mentor your development leads on how to preserve high-velocity structures for the future.
            </p>

            {/* Direct personal pledge banner */}
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] font-mono font-bold text-indigo-400 tracking-wider">DIRECT WORKING COMMITMENT</span>
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "I work completely hands-on with your codebase. I do not outsource audits to junior staff. When we partner together, every single line of code, Flamegraph, and priority-matrix finding is manually drafted by me."
              </p>
              <span className="block text-right text-[10px] font-semibold text-slate-500">— Raviteja M</span>
            </div>
          </div>

          {/* Right Credentials Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6" id="about-credentials-grid">
            {credentials.map((cred, idx) => (
              <motion.div
                key={cred.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-slate-900 border border-slate-850 p-6 rounded-xl space-y-4 hover:border-indigo-500/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center border border-slate-800 group-hover:scale-105 transition-transform duration-300">
                  {cred.icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-display font-bold text-base text-slate-200 group-hover:text-indigo-400 transition-colors">
                    {cred.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {cred.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
