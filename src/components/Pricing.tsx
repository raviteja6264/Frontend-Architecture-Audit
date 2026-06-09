import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, Calendar, TrendingUp, HelpCircle, ShieldCheck } from "lucide-react";

interface PricingProps {
  onOpenConsultation: () => void;
}

export default function Pricing({ onOpenConsultation }: PricingProps) {
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");

  const plans = [
    {
      id: "starter",
      name: "Starter Audit",
      priceUSD: "$249",
      priceINR: "₹19,900",
      frequency: "one-time",
      description: "Intended for pre-seed startup MVPs looking to align structures before rapid scaling phases.",
      timeline: "3 Days delivery",
      isPopular: false,
      features: [
        "Core React component hierarchies audit",
        "Primary bundle weight profiling & tree analyzer",
        "Global state management patterns review",
        "Executive Summary outlining top 3 bottlenecks",
        "45-minute walkthrough session with founder/lead"
      ],
      ctaText: "Book Starter Audit Session",
      idealFor: "Startups with 1-3 developers"
    },
    {
      id: "growth",
      name: "Growth Audit",
      priceUSD: "$499",
      priceINR: "₹41,900",
      frequency: "one-time",
      description: "An exhaustive diagnostic for scaling SaaS teams looking to eliminate shipping drag and performance lags.",
      timeline: "7 Days delivery",
      isPopular: true,
      features: [
        "Interactive flamegraph tracing of render cycles",
        "Strict TypeScript strictness and linting audit",
        "Vulnerability reports list for modules and dependencies",
        "Detailed, prioritized Low/Med/High severity matrix",
        "Bespoke 90-Day frontend transformation roadmap",
        "90-minute walk-through & implementation session",
        "14 days of direct Slack developer QA support"
      ],
      ctaText: "Book Growth Audit Session",
      idealFor: "SaaS products with 4-15 developers"
    },
    {
      id: "enterprise",
      name: "Enterprise Audit",
      priceUSD: "$899",
      priceINR: "₹74,900",
      frequency: "one-time",
      description: "Custom-crafted scope built for multi-portfolio products or complex monorepos with modular boundaries.",
      timeline: "14 Days delivery",
      isPopular: false,
      features: [
        "Full monorepo package boundary review (Turbo/Nx)",
        "Automated Playwright diagnostic regression setup",
        "Continuous integration (CI) compile caching setup",
        "Custom frontend coding standard documentation template",
        "30 days of direct Slack support & reviews",
        "Post-remediation verification audit (after 30 days)"
      ],
      ctaText: "Request Custom Scope Call",
      idealFor: "Enterprises / Scaleups with 15+ devs"
    }
  ];

  return (
    <section className="py-20 border-t border-slate-900 bg-slate-900/20 relative" id="pricing">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-500/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-3">
            <span className="flex items-center gap-1.5 justify-center"><TrendingUp className="w-3.5 h-3.5 text-indigo-400" /> Transparent Pricing</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tighter leading-none">
            Predictable Flat-Rate Pricing
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Bespoke execution. No variable hourly rate surprises. No generic PDFs. Choose a plan that fits your engineering team size.
          </p>
        </div>

        {/* Currency Switcher Toggle */}
        <div className="flex justify-center mb-12">
          <div className="relative p-1 bg-slate-950/80 border border-slate-850 rounded-xl flex items-center gap-1">
            <button
              onClick={() => setCurrency("USD")}
              className={`relative z-10 py-2 px-4 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-all font-bold cursor-pointer ${
                currency === "USD"
                  ? "text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {currency === "USD" && (
                <motion.div
                  layoutId="active-currency-bg"
                  className="absolute inset-0 bg-indigo-600 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              USD ($)
            </button>
            <button
              onClick={() => setCurrency("INR")}
              className={`relative z-10 py-2 px-4 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-all font-bold cursor-pointer ${
                currency === "INR"
                  ? "text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {currency === "INR" && (
                <motion.div
                  layoutId="active-currency-bg"
                  className="absolute inset-0 bg-indigo-600 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              INR (₹)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch" id="pricing-plans-grid">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10, 
                scale: plan.isPopular ? 1.05 : 1.03,
                boxShadow: plan.isPopular 
                  ? "0 20px 40px -15px rgba(99, 102, 241, 0.2)" 
                  : "0 20px 30px -15px rgba(99, 102, 241, 0.08)"
              }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 22,
                delay: idx * 0.05 
              }}
              className={`rounded-2xl border flex flex-col justify-between p-6 sm:p-8 relative ${
                plan.isPopular
                  ? "bg-slate-900 border-indigo-500/70 z-10 shadow-lg shadow-indigo-500/5 lg:scale-103"
                  : "bg-slate-950/70 border-slate-900 hover:border-indigo-500/35"
              }`}
            >
              {/* Most Popular Accent Ribbon */}
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold tracking-widest uppercase py-1 px-4 rounded-full shadow-md">
                  Most Popular Scope
                </div>
              )}

              {/* Card Header Info */}
              <div className="space-y-4">
                <div>
                  <span className="text-slate-400 text-xs font-bold tracking-wider uppercase block">
                    {plan.name}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 leading-normal block mt-1">
                    Ideal for: {plan.idealFor}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 pt-2 border-b border-slate-900 pb-4">
                  <span className="text-4xl sm:text-5xl font-display font-black tracking-tight text-slate-100">
                    {currency === "USD" ? plan.priceUSD : plan.priceINR}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold uppercase">
                    / {plan.frequency}
                  </span>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed pt-2">
                  {plan.description}
                </p>

                {/* Timeline and delivery */}
                <span className="inline-flex items-center gap-1.5 bg-slate-950/60 border border-slate-850 py-1 px-3 rounded-lg text-[10px] font-mono text-indigo-400 font-bold tracking-wider">
                  ⏱ Timeline: {plan.timeline}
                </span>

                {/* Inclusions checklist */}
                <div className="space-y-3 pt-4">
                  <span className="text-[9px] font-mono font-bold text-slate-500 tracking-wider uppercase block">
                    Scope Inclusions:
                  </span>
                  <ul className="space-y-3">
                    {plan.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start text-xs text-slate-300 leading-normal">
                        <div className="w-4 h-4 rounded-full bg-indigo-950/40 border border-indigo-500/20 flex items-center justify-center shrink-0 mr-3 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-indigo-400" />
                        </div>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Call to action */}
              <div className="pt-8 mt-6 border-t border-slate-900 space-y-3">
                <button
                  onClick={onOpenConsultation}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs cursor-pointer tracking-wider text-center transition-all uppercase duration-305 ${
                    plan.isPopular
                      ? "bg-indigo-600 hover:bg-indigo-540 text-white shadow-lg shadow-indigo-900/10 hover:scale-[1.02] active:scale-[0.98]"
                      : "bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-705 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                  id={`pricing-${plan.id}-select-btn`}
                >
                  {plan.ctaText}
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span>NDA signed before review initiation</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
