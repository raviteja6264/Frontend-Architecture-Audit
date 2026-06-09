import React from "react";
import { motion } from "motion/react";
import { Star, MessageSquareCode, Quote, ArrowUpRight } from "lucide-react";
import { Testimonial } from "../types";

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: "t1",
      quote: "Raviteja's audit was an absolute game changer for our Series-A product team. He discovered an app-wide context cascade loop that was dropping our Lighthouse mobile scores to 34. Within 14 days of implementing his priority fixes roadmap, our cold bundle weight is down 52%, and our mobile responsiveness feels like a native app.",
      author: "Marcus Chen",
      role: "CTO & Co-Founder",
      company: "SyncPulse Inc. (Series A SaaS)",
      initials: "MC",
      metricsSolved: "Lighthouse Mobile: 34 ➔ 89"
    },
    {
      id: "t2",
      quote: "Before the audit, onboarding a new senior developer to our frontend took almost 3 weeks. Raviteja diagnosed our complex webpack trees and circular imports. He helped us transition smoothly to Vite, cleaned up nested global styles, and provided clear style guidelines. Today, onboarding is under 48 hours, and parallel merge conflicts have gone to zero.",
      author: "Sarah Jenkins",
      role: "VP of Engineering",
      company: "BriteFlow CRM Platforms",
      initials: "SJ",
      metricsSolved: "Onboarding: 3 Weeks ➔ 2 Days"
    },
    {
      id: "t3",
      quote: "Our SaaS checkout path had intermittent glitches on production that our developers had been chasing for weeks. Raviteja came in, audited our state flow, pinpointed an insecure event-listener leak, and refactored the boundaries. The customer checkout drop-off rate fell by 18% overnight. Absolute masterclass in React diagnostics.",
      author: "David Vance",
      role: "Director of Product Engineering",
      company: "Stripe-backed PayLogic Portal",
      initials: "DV",
      metricsSolved: "Checkout Drop-offs: -18% Churn"
    }
  ];

  return (
    <section className="py-20 border-t border-slate-900 bg-slate-950 relative" id="testimonials">
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-3">
            <span className="flex items-center gap-1.5 justify-center"><MessageSquareCode className="w-3.5 h-3.5 text-indigo-400" /> Client Feedback</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tighter leading-none">
            Loved by Fast-Shipping Teams
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Review realistic results delivered to CTOs, scaleup co-founders, and engineering managers globally.
          </p>
        </div>

        {/* Testimonials Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch" id="testimonials-grid">
          {testimonials.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-slate-900 border border-slate-850 hover:border-indigo-500/30 p-6 sm:p-8 rounded-xl flex flex-col justify-between space-y-6 transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Visual rating & quote decorator */}
                <div className="flex items-center justify-between">
                  {/* Star row */}
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-4 h-4 fill-amber-400 stroke-none" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-slate-800 shrink-0 group-hover:text-slate-700 transition-colors" />
                </div>

                {/* Quote Text */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic animate-none">
                  "{test.quote}"
                </p>
              </div>

              {/* Author metadata & metrics banner */}
              <div className="space-y-4 pt-4 border-t border-slate-900">
                {/* Solved Metric Badge */}
                <span className="inline-flex items-center gap-1.5 bg-indigo-950/40 border border-indigo-500/20 text-indigo-400 px-3 py-1 rounded-lg text-[10px] font-mono font-bold tracking-wide">
                  <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400" /> Resolved Metric: {test.metricsSolved}
                </span>

                <div className="flex items-center gap-3">
                  {/* Initials Avatar */}
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-900 to-slate-950 border border-indigo-500/20 flex items-center justify-center font-display text-xs font-bold text-indigo-400 shrink-0">
                    {test.initials}
                  </div>
                  <div>
                    <span className="block text-slate-200 font-bold text-xs sm:text-sm">{test.author}</span>
                    <span className="block text-slate-500 text-[10px] sm:text-xs font-semibold leading-normal">
                      {test.role} — <strong className="text-slate-400 font-medium">{test.company}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
