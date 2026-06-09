import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, Clock, ShieldCheck, Sparkles, MessageSquare, 
  ChevronRight, AlertCircle, PhoneCall, Copy, Check, CheckCircle, ExternalLink, Award, Sparkle,
  Video, Cpu
} from "lucide-react";
import { trackConversion } from "../utils/conversionTracker";
import confetti from "canvas-confetti";

export default function BookingSection() {
  const [copied, setCopied] = useState(false);
  const [loadCount, setLoadCount] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const formUrl = "https://forms.gle/1Hc8nFZmSR12ueUx7?embedded=true";
  const contactEmail = "raviteja.m6666@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenDirect = () => {
    window.open("https://forms.gle/1Hc8nFZmSR12ueUx7", "_blank", "noopener,noreferrer");
    trackConversion("consultation");
    // Celebrate immediately when opened directly to feel highly interactive
    triggerCelebration();
  };

  const triggerCelebration = () => {
    // Primary aesthetic explosion
    confetti({
      particleCount: 140,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#6366f1", "#a855f7", "#ec4899", "#3b82f6"]
    });

    // Side canons running for a moment
    const duration = 1.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ["#6366f1", "#a855f7"]
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#ec4899", "#3b82f6"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    setLoadCount((prev) => {
      const nextCount = prev + 1;
      // Triggers on subsequent reloads (indicating the frame shifted to the submitted page)
      if (nextCount > 1) {
        setHasSubmitted(true);
        triggerCelebration();
        trackConversion("consultation");
      }
      return nextCount;
    });
  };

  return (
    <section className="relative py-20 sm:py-28 bg-slate-950 overflow-hidden border-t border-slate-900" id="scheduling-booking-section">
      {/* Visual background ambient grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

      {/* Aesthetic glowing orbits */}
      <div className="absolute -top-12 left-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-3">
            <span className="flex items-center gap-1.5 justify-center">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Intake & Consultation
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-100 uppercase sm:leading-tight">
            Schedule Your Audit Diagnosis
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 max-w-2xl mx-auto font-sans leading-relaxed">
            Please submit your product details on the interactive form below to book your 30-minute frontend architecture review session.
          </p>
        </div>

        {/* Live Booking Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Left Panel: Briefing, Guarantees & Contact */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* Prep Brief Info Card */}
              <div className="bg-slate-900/60 border border-slate-850 rounded-2xl p-5 sm:p-6 space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/[0.02] rounded-full blur-2xl pointer-events-none" />
                
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/40 border border-indigo-900/30 px-2 py-0.5 rounded">
                  Session Preparation
                </span>

                <h4 className="font-sans font-bold text-slate-200 text-sm uppercase tracking-tight">
                  What to expect in our call
                </h4>

                <div className="space-y-3.5 pt-1">
                  {[
                    { title: "Direct Diagnosis", text: "A 30-minute deep-dive screen share with Raviteja M.", icon: <Video className="w-3.5 h-3.5" /> },
                    { title: "Codebase Context", text: "Bring your current Lighthouse core web vitals and bundle size stats.", icon: <Cpu className="w-3.5 h-3.5" /> },
                    { title: "Immediate Leverage", text: "Walk away with 2-3 specific architectural refactoring solutions.", icon: <Sparkles className="w-3.5 h-3.5" /> }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-indigo-950/60 border border-indigo-500/20 text-indigo-400 shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-450">
                        <strong className="text-slate-350">{item.title}:</strong> {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secure NDA Guarantee Badge */}
              <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-5 flex items-center gap-4">
                <div className="p-3 bg-indigo-950/50 border border-indigo-500/20 rounded-xl shrink-0 text-indigo-400">
                  <ShieldCheck className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h5 className="font-sans font-bold text-xs text-slate-200 uppercase tracking-tight">
                    Strict NDA Protection
                  </h5>
                  <p className="text-slate-500 text-[10.5px] leading-relaxed mt-0.5">
                    Your trade secrets are safe. All design reviews and code inspections are protected by standard mutual confidentiality.
                  </p>
                </div>
              </div>

            </div>

            {/* Email Alternative Panel */}
            <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5 space-y-3.5">
              <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-slate-500 block">
                Prefer email or custom RFPs?
              </span>

              <div className="flex items-center justify-between gap-2.5 bg-slate-900/60 border border-slate-850 p-2.5 rounded-xl">
                <span className="text-[10px] font-mono text-slate-300 truncate">
                  {contactEmail}
                </span>

                <button
                  onClick={handleCopyEmail}
                  className="p-1 px-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-lg font-mono text-[9px] font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                  id="booking-copy-email-btn"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-450" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Right Panel: Clean Integrated Google Form Frame */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-850 rounded-3xl p-1 shadow-2xl relative min-h-[600px] flex flex-col justify-between overflow-hidden">
            {/* Embedded Header inside the container for custom branding */}
            <div className="px-5 py-3.5 sm:px-6 bg-slate-950/60 border-b border-slate-850 flex items-center justify-between relative z-10 shrink-0">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                </span>
                <span className="text-[10px] font-mono font-bold tracking-wider text-slate-350 uppercase">
                  Google Intake Registry
                </span>
              </div>
              
              <button
                onClick={handleOpenDirect}
                className="flex items-center gap-1.5 text-[9.5px] font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-900/50 hover:border-indigo-500/40 hover:text-white px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                id="booking-open-direct-btn"
              >
                <span>New Tab</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {/* Real Google Form Iframe Component */}
            <div className="flex-grow w-full relative h-[560px] bg-slate-950 overflow-hidden">
              <AnimatePresence mode="wait">
                {!hasSubmitted ? (
                  <div className="w-full h-full relative" key="iframe-render-view">
                    {/* Impeccable custom loader overlay for Google Form initialization */}
                    <AnimatePresence>
                      {!iframeLoaded && (
                        <motion.div
                          key="iframe-skeleton-loader"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 text-center z-15 space-y-6 select-none"
                        >
                          {/* Simulated Form template blueprint */}
                          <div className="w-full max-w-sm space-y-5 animate-pulse">
                            <div className="h-16 w-full bg-slate-900 border border-slate-850 rounded-2xl" />
                            <div className="h-6 w-3/4 bg-slate-900 rounded-lg" />
                            <div className="space-y-2">
                              <div className="h-3 w-full bg-slate-900/60 rounded" />
                              <div className="h-3 w-5/6 bg-slate-900/60 rounded" />
                            </div>
                            <div className="pt-2 space-y-3">
                              <div className="p-3.5 bg-slate-900/30 border border-slate-850/60 rounded-xl space-y-2 text-left">
                                <div className="h-3 w-1/3 bg-slate-800 rounded" />
                                <div className="h-6 w-full bg-slate-950/80 border border-slate-850 rounded" />
                              </div>
                              <div className="p-3.5 bg-slate-900/30 border border-slate-850/60 rounded-xl space-y-2 text-left">
                                <div className="h-3 w-1/4 bg-slate-800 rounded" />
                                <div className="h-6 w-full bg-slate-950/80 border border-slate-850 rounded" />
                              </div>
                            </div>
                          </div>

                          {/* Dynamic network heartbeat spinner */}
                          <div className="flex items-center gap-3 bg-slate-900 border border-indigo-500/10 rounded-full px-5 py-2.5 shadow-2xl backdrop-blur-md">
                            <Clock className="w-4 h-4 text-indigo-400 animate-spin" />
                            <span className="text-[9.5px] font-mono text-slate-350 tracking-wider uppercase">
                              Establishing secure connection...
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <iframe
                      src={formUrl}
                      className={`w-full h-full border-none rounded-b-2xl bg-slate-950 transition-all duration-700 ${
                        iframeLoaded ? "opacity-100 scale-100" : "opacity-0 scale-[0.99] blur-xs"
                      }`}
                      title="Google Consultation Form Submission"
                      onLoad={handleIframeLoad}
                      id="booking-googleform-iframe"
                    >
                      Loading…
                    </iframe>
                  </div>
                ) : (
                  <motion.div
                    key="submission-success-overlay"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-950 px-8"
                  >
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full mb-6 relative">
                      <CheckCircle className="w-12 h-12 animate-pulse" />
                      <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-400 uppercase bg-indigo-950/40 border border-indigo-900/30 px-3 py-1 rounded-full mb-3">
                      Intake Complete
                    </span>

                    <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-100 uppercase tracking-tight">
                      Thank You for Booking!
                    </h3>

                    <p className="text-slate-400 text-xs sm:text-sm mt-3 max-w-md mx-auto leading-relaxed">
                      Your architecture snapshot was successfully submitted. Raviteja M will personally review your answers and contact you directly at <span className="text-indigo-350 font-bold">{contactEmail}</span> to schedule our diagnostic dive.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={triggerCelebration}
                        className="py-2.5 px-6 bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-indigo-500/15 font-bold rounded-xl transition-all text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
                        id="booking-celebrate-again-btn"
                      >
                        <Sparkles className="w-4 h-4" /> Celebrate Again
                      </button>

                      <button
                        onClick={() => {
                          setLoadCount(0);
                          setIframeLoaded(false);
                          setHasSubmitted(false);
                        }}
                        className="py-2.5 px-6 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white font-bold rounded-xl transition-all text-xs uppercase tracking-wider cursor-pointer"
                        id="booking-resubmit-btn"
                      >
                        Submit Another Form
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom visual disclaimer footer */}
            <div className="px-5 py-3 bg-slate-950/40 border-t border-slate-850 text-center select-none shrink-0">
              <p className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-slate-650" /> Secure SSL connection provided directly by Google Forms
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
