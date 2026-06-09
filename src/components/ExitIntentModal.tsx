import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Mail, Building2, User, Download, Sparkles, 
  CheckCircle, ShieldCheck, ArrowRight, FileText, ClipboardCheck, Clock
} from "lucide-react";
import confetti from "canvas-confetti";
import { trackImpression, trackConversion } from "../utils/conversionTracker";

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Strict non-intrusive guards: 
    // Do not show if already prompted in this session, or if already converted
    const hasPrompted = sessionStorage.getItem("exit_intent_prompted") === "true";
    const hasConverted = localStorage.getItem("frontend_audit_converted") === "true";

    if (hasPrompted || hasConverted) {
      return;
    }

    let delayTimer: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // clientY < 15 is highly precise for moving the mouse into tabs / address bar
      if (e.clientY < 15) {
        // Debounce slightly to ensure it is not a rapid transient mouse move
        delayTimer = setTimeout(() => {
          setIsOpen(true);
          sessionStorage.setItem("exit_intent_prompted", "true");
          trackImpression("sample_audit");
        }, 150);
      }
    };

    const handleMouseEnter = () => {
      if (delayTimer) clearTimeout(delayTimer);
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (delayTimer) clearTimeout(delayTimer);
    };
  }, []);

  // Sync ESC key for accessible dismissals
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const triggerCelebration = () => {
    confetti({
      particleCount: 120,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#6366f1", "#a855f7", "#3b82f6", "#10b981"]
    });
  };

  const downloadChecklist = () => {
    const checklistContent = `===========================================================
PRO PROFESSIONAL FRONTEND ARCHITECTURE & PERFORMANCE CHECKLIST
===========================================================
Lead Architect Reference: Raviteja M (raviteja.m6666@gmail.com)
Prepared Exclusively For: ${company || "Product SaaS Enterprise Owner"}
Generated On: ${new Date().toLocaleDateString()}
===========================================================

This high-performance audit checklist outlines key performance,
scalability, and architectural criteria used to grade world-class
React and full-stack web applications.

1. BUNDLE SIZE & ASSET OPTIMIZATION
[ ] Bundle Ceiling: Total JS package size in main path is under 350KB gzipped.
[ ] Route-Level Split: All secondary routes are lazy-loaded dynamically with react-router or lazy().
[ ] Dynamic Imports: Heavy libraries (e.g. charts, localizations, PDF parsers) use local dynamic imports.
[ ] Asset Strategy: Fonts are self-hosted with font-display: swap. Images use modern WebP format and correct sizes.

2. STATE MANAGEMENT & RERENDER TOPOLOGY
[ ] Localized Isolation: State remains inside local React branches until absolutely required globally.
[ ] Context Optimization: React context is segregated. Values and state setters are split into separate hooks to prevent cascades.
[ ] Reference Stability: Heavy callbacks and calculations utilize useCallback() and useMemo() with correct primitives as dependencies.
[ ] No Inline Objects: Prop assignments avoid un-memoized object literals passing into virtual components.

3. NETWORK & DATA HYDRATION EFFICIENCY
[ ] Cache Strategy: API payloads use stale-while-revalidate caches (e.g. SWR, React Query) with rigorous query invalidations.
[ ] Debounced Actions: Realtime queries, searchable inputs, and keyup trackers are correctly throttled or debounced.
[ ] Lazy Render: Infinite scroll arrays or complex dashboards use virtualized lists (e.g. react-window) to offset layout threads.
[ ] Secure Secrets: Crucial API keys remain 100% server-side behind secure proxy paths (/api/*).

4. RENDERING PATHS & WEB VITALS
[ ] LCP (Largest Contentful Paint): Under 1.8 seconds on 3G Fast throttling limits.
[ ] INP (Interaction to Next Paint): Under 150ms. Heavy layout-blocking operations run in requestAnimationFrame.
[ ] CLS (Cumulative Layout Shift): Guaranteed 0.0 rating using rigid visual wrappers and aspect ratios.
[ ] Hydration Matching: SSR layouts mirror client states instantly. Initial layouts use skeletons to preserve visual layout heights.

===========================================================
NEED A DEEPER DIAGNOSTIC FOR YOUR SPECIFIC COMPLEX WORK?
Schedule a quick audit consultation session with Raviteja M.
Direct scheduling form: ${window.location.origin}#scheduling-booking-section
Email support contact: raviteja.m6666@gmail.com
===========================================================`;

    const blob = new Blob([checklistContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Frontend_Architecture_Audit_Checklist.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);

    // Simulate database record creation
    setTimeout(() => {
      const submission = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36),
        type: "lead_recovered_exit_intent",
        timestamp: new Date().toISOString(),
        contactInfo: { name, email, company }
      };

      // Save to existing localStorage funnel array
      const existingLeads = JSON.parse(localStorage.getItem("frontend_audit_leads") || "[]");
      existingLeads.push(submission);
      localStorage.setItem("frontend_audit_leads", JSON.stringify(existingLeads));
      
      // Set overall target converted to true so exit intent never triggers again
      localStorage.setItem("frontend_audit_converted", "true");

      trackConversion("sample_audit");
      
      setIsSubmitting(false);
      setIsSuccess(true);
      triggerCelebration();
      
      // Download checklist automatically on submit
      downloadChecklist();
    }, 1000);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
          id="exit-intent-overlay-container"
        >
          {/* Subtle Outer Backdrop Click Detector */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            onClick={handleClose}
          />

          {/* Premium Exit Intent Card Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative w-full max-w-[480px] bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl z-10 overflow-hidden text-left"
            id="exit-intent-dialog-card"
          >
            {/* Header Glowing Accent Arc */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent pointer-events-none" />

            {/* Close Button Trigger */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-slate-350 hover:bg-slate-850/80 transition-colors cursor-pointer"
              aria-label="Dismiss offer"
              id="exit-intent-close-btn"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSuccess ? (
              <div className="relative">
                {/* Visual Asset Emblem Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <FileText className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-900/40">
                      Wait! Before you navigate away...
                    </span>
                    <h3 className="text-[10px] font-mono text-slate-500 font-bold uppercase mt-1">
                      FREE DIAGNOSTIC CHECKLIST
                    </h3>
                  </div>
                </div>

                <h3 className="font-display font-medium text-xl sm:text-2xl text-slate-100 tracking-tight leading-tight uppercase">
                  Grade Your Team's Frontend Core Stack
                </h3>
                <p className="text-slate-400 text-xs mt-2.5 leading-relaxed">
                  Download our **Quick Frontend Architecture & Performance Audit Checklist PDF**. Designed for CTOs and Engineering leads to identify unoptimized React renders, bloated node bundle chunks, and Lighthouse bottlenecks in minutes.
                </p>

                {/* Lead Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Your First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alexander"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-550/60 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-200 placeholder:text-slate-650 focus:outline-none transition-all"
                        id="exit-intent-input-name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Work Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. alex@enterprise.com"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-550/60 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-200 placeholder:text-slate-650 focus:outline-none transition-all"
                        id="exit-intent-input-email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>Company Name</span>
                      <span className="text-[8px] text-slate-600 lowercase font-medium">optional</span>
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. CloudSync Corp"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-550/60 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-200 placeholder:text-slate-650 focus:outline-none transition-all"
                        id="exit-intent-input-company"
                      />
                    </div>
                  </div>

                  {/* Submission Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer text-center disabled:opacity-50 disabled:cursor-not-allowed mt-2 hover:shadow-indigo-500/10 focus:outline-none h-[44px]"
                    id="exit-intent-submit-btn"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 animate-spin shrink-0" /> Generative Compiling Audit File...
                      </span>
                    ) : (
                      <>
                        <Download className="w-4 h-4 shrink-0" /> Instantly Download Free Checklist
                      </>
                    )}
                  </button>
                </form>

                {/* Underlining visual tag */}
                <div className="mt-5 pt-4 border-t border-slate-850/60 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black">
                    100% Secure &amp; Zero Spam Guaranteed
                  </span>
                </div>
              </div>
            ) : (
              // Successful lead conversion state
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-6"
                id="exit-intent-success-view"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5 animate-bounce">
                  <CheckCircle className="w-7 h-7" />
                </div>

                <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded uppercase tracking-wider mb-2">
                  System Hydration Complete
                </span>

                <h3 className="font-display font-medium text-2xl text-slate-100 uppercase tracking-tight">
                  Enjoy Your Free Checklist!
                </h3>
                <p className="text-slate-400 text-xs mt-3 max-w-sm leading-relaxed">
                  Excellent choice! The **Quick Architecture Audit Checklist** has been successfully compiled and downloaded as a direct reference file to your device.
                </p>

                {/* Additional Action triggers to funnel to booking call */}
                <div className="mt-8 space-y-3.5 w-full">
                  <div className="p-3 bg-slate-950/80 border border-slate-850 rounded-2xl text-left flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[10px] font-mono font-bold text-slate-300 uppercase">Pro Tip:</h4>
                      <p className="text-[10px] text-slate-450 leading-relaxed mt-0.5">
                        Instead of manual diagnostics, book a free 30-minute deep-dive consultation to have Raviteja M audit your core codebase directly via screenshare.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={downloadChecklist}
                      className="flex-1 py-3 px-4 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-[10px] font-mono font-black uppercase tracking-wider cursor-pointer text-center"
                      id="exit-intent-redownload-btn"
                    >
                      Re-download Checklist
                    </button>
                    
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        const element = document.getElementById("scheduling-booking-section");
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="flex-1 py-3 px-4 bg-indigo-650 hover:bg-indigo-550 text-white rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer text-center flex items-center justify-center gap-1 hover:shadow-indigo-500/10"
                      id="exit-intent-book-btn"
                    >
                      Book 30m Deepdive <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
