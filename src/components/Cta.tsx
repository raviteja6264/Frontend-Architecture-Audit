import React from "react";
import { MessageSquarePlus, Download, Sparkles, AlertCircle, FileCode } from "lucide-react";

interface CtaProps {
  onOpenConsultation: () => void;
  onOpenSample: () => void;
}

export default function Cta({ onOpenConsultation, onOpenSample }: CtaProps) {
  return (
    <section className="py-20 relative overflow-hidden" id="cta-section">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-r from-indigo-550/12 to-purple-550/5 rounded-full blur-3xl" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0)_0%,rgba(2,6,23,0.95)_100%)] bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:24px_24px] opacity-60 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 sm:p-12 text-center space-y-8 relative overflow-hidden">
          {/* Subtle top light bar */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

          {/* Icon Badge */}
          <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-3">
            <span className="flex items-center gap-1.5 justify-center"><Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Stop Shipping Drag</span>
          </div>

          {/* Heading */}
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tighter leading-none">
              Stop Losing Development Velocity to Unmanaged Technical Debt
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4">
              Book a zero-risk 30-minute diagnosis directly with Raviteja M. We'll map your build bottlenecks, evaluate your global dependency nodes, and outline exactly how to double your engineering output.
            </p>
          </div>

          {/* High Value Consultation Bullet checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-2 text-left" id="cta-benefits-list">
            {[
              { label: "Find 2 core performance bottlenecks live" },
              { label: "Understand bundle cold load triggers" },
              { label: "Get modular directory layout recommendations" }
            ].map((b, idx) => (
              <div key={idx} className="flex items-start gap-2.5 bg-slate-950/40 border border-slate-900 p-3.5 rounded-xl">
                <FileCode className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span className="text-[11px] font-semibold text-slate-300 leading-snug">{b.label}</span>
              </div>
            ))}
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4" id="cta-actions-group">
            <button
              onClick={onOpenConsultation}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-xl shadow-xl shadow-indigo-950/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto cursor-pointer text-xs uppercase tracking-wider"
              id="cta-confirm-booking-btn"
            >
              <MessageSquarePlus className="w-4 h-4" /> Book Free Consultation
            </button>
            <button
              onClick={onOpenSample}
              className="flex items-center justify-center gap-2 text-slate-350 hover:text-white font-bold border border-slate-800 hover:border-slate-700 bg-slate-950/80 py-4 px-8 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto cursor-pointer text-xs uppercase tracking-wider"
              id="cta-download-sample-btn"
            >
              <Download className="w-4 h-4" /> Download Sample Audit
            </button>
          </div>

          {/* Direct CTA guarantee footnote */}
          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500">
            <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>Absolutely free. No credit card requested. Strict NDA guarantee applies.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
