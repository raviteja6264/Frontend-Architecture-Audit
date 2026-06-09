import React from "react";
import { Mail, Linkedin, FileTerminal, ArrowUp, Calendar, ExternalLink } from "lucide-react";

interface FooterProps {
  onOpenConsultation: () => void;
  onOpenSample: () => void;
}

export default function Footer({ onOpenConsultation, onOpenSample }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 relative" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-slate-900" id="footer-details-grid">
          {/* Col 1: Bio / Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5" id="footer-logo">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 font-display font-black text-white flex items-center justify-center text-sm shadow-md">
                F
              </div>
              <span className="font-display font-black text-sm text-white uppercase tracking-tighter">
                Frontend Architecture Audit
              </span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              Surgical diagnostics, state flow audits, bundle analysis, and performance optimization guidelines designed to eliminate technical debt for scaling engineering teams.
            </p>
            <div className="flex items-center gap-3" id="footer-direct-contact">
              <a
                href="mailto:raviteja.m6666@gmail.com"
                className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-755 text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg text-[10px] font-mono transition-colors"
                title="Send Email"
              >
                <Mail className="w-3.5 h-3.5" /> raviteja.m6666@gmail.com
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-755 text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg text-[10px] font-mono transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5 text-indigo-400" /> LinkedIn <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Inclusions / Links */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[10px] font-mono font-bold text-slate-400 tracking-widest uppercase block">
              Core Capabilities
            </span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-500">
              <button onClick={() => document.querySelector("#challenges")?.scrollIntoView({ behavior: "smooth" })} className="text-left hover:text-indigo-400 transition-colors cursor-pointer">Team Pain Points</button>
              <button onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })} className="text-left hover:text-indigo-400 transition-colors cursor-pointer">Services Review</button>
              <button onClick={() => document.querySelector("#process")?.scrollIntoView({ behavior: "smooth" })} className="text-left hover:text-indigo-400 transition-colors cursor-pointer">Audit Progress Steps</button>
              <button onClick={() => document.querySelector("#deliverables")?.scrollIntoView({ behavior: "smooth" })} className="text-left hover:text-indigo-400 transition-colors cursor-pointer">Audit Deliverables</button>
              <button onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })} className="text-left hover:text-indigo-400 transition-colors cursor-pointer">About Raviteja</button>
              <button onClick={() => document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" })} className="text-left hover:text-indigo-400 transition-colors cursor-pointer">Audit Cost Pricing</button>
            </div>
          </div>

          {/* Col 3: Call Actions */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[10px] font-mono font-bold text-slate-400 tracking-widest uppercase block">
              Instant Options
            </span>
            <div className="flex flex-col gap-2">
              <button
                onClick={onOpenConsultation}
                className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer uppercase tracking-wider text-[10px]"
                id="footer-call-btn"
              >
                <Calendar className="w-3.5 h-3.5" /> Schedule Free Call
              </button>
              <button
                onClick={onOpenSample}
                className="py-2.5 px-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900 hover:text-slate-100 text-slate-400 text-xs font-semibold cursor-pointer transition-colors"
                id="footer-sample-btn"
              >
                Download Mock Report
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits Line */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs text-slate-600 font-mono" id="footer-bottom-line">
          <div>
            © {currentYear} Frontend Architecture Audit. All rights reserved by{" "}
            <strong className="text-slate-500 font-semibold text-[11px]">Raviteja M</strong>.
          </div>
          <div className="flex items-center gap-4">
            <span>Security Compliant GDPR & NDA</span>
            <button
              onClick={handleScrollToTop}
              className="flex items-center gap-1 hover:text-indigo-400 transition-colors cursor-pointer"
              title="Scroll to Top"
              id="footer-scroll-top-btn"
            >
              Back to top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
