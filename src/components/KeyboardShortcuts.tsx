import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Keyboard, Eye, Navigation, Calendar, 
  HelpCircle, Sparkles, X, ChevronRight, Check, Command
} from "lucide-react";

interface Shortcut {
  key: string;
  action: string;
  targetId: string;
  description: string;
}

const SHORTCUTS: Shortcut[] = [
  { key: "H", action: "Navigate Home", targetId: "hero", description: "Return to initial intro & diagnostic start" },
  { key: "S", action: "View Services", targetId: "services", description: "Inspect high-leverage optimization specialties" },
  { key: "R", action: "Review Sample Report", targetId: "report-view-section", description: "Open interactive 10-page premium audit template" },
  { key: "C", action: "Browse Case Studies", targetId: "client-case-studies", description: "Analyse Before/After performance case profiles" },
  { key: "P", action: "Check Pricing", targetId: "pricing", description: "Explore flat-rate frontend re-engineering tiers" },
  { key: "B", action: "Book Consultation", targetId: "scheduling-booking-section", description: "Select interview slot on live Calendly sync" },
];

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNotification, setActiveNotification] = useState<{ key: string; action: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Avoid intercepting shortcuts if user is typing in form elements
      const activeElement = document.activeElement;
      if (activeElement) {
        const tagName = activeElement.tagName.toLowerCase();
        const isEditable = activeElement.getAttribute("contenteditable") === "true";
        if (
          tagName === "input" || 
          tagName === "textarea" || 
          tagName === "select" || 
          isEditable
        ) {
          return;
        }
      }

      const pressedKey = event.key.toUpperCase();

      // Help menu trigger: both '?' and 'K'
      if (pressedKey === "K" || event.key === "?") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // Close legend on Escape
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        return;
      }

      // Find matching shortcut
      const match = SHORTCUTS.find((s) => s.key === pressedKey);
      if (match) {
        event.preventDefault();
        const element = document.getElementById(match.targetId);
        if (element) {
          // Smooth scroll to the target
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          
          // Flash a beautiful micro-toast notification
          setActiveNotification({ key: match.key, action: match.action });
          
          // Auto close modal if scrolling
          setIsOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Clear toast feedback notification after delay
  useEffect(() => {
    if (activeNotification) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [activeNotification]);

  return (
    <>
      {/* Floating Status Indicator at bottom for power-users */}
      <div className="fixed bottom-4 right-36 z-50 hidden sm:block font-sans" id="hud-shortcut-info-badge">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-slate-900/90 border border-slate-850 hover:border-indigo-500/20 text-slate-400 hover:text-white rounded-full text-[10px] font-mono tracking-wider transition-colors cursor-pointer"
          title="Press K or ? to view interactive terminal hotkeys panel"
          id="hotkey-trigger-floating"
        >
          <Keyboard className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>CTO HUD</span>
          <span className="bg-slate-950 px-1 py-0.5 rounded text-[8px] border border-slate-800 text-slate-400">
            Press [K]
          </span>
        </button>
      </div>

      {/* 1. Micro Toast Notification Feedbacks */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.92 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 font-sans pointer-events-none select-none"
            id="toast-shortcut-notifications"
          >
            <div className="flex items-center gap-3 bg-slate-900/95 border border-indigo-500/40 rounded-full px-5 py-2.5 shadow-2xl backdrop-blur-md">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-mono font-bold shrink-0">
                {activeNotification.key}
              </span>
              <p className="text-[11px] font-medium text-slate-250">
                <span className="text-slate-400">Navigating to</span> <span className="text-white font-semibold uppercase">{activeNotification.action}</span>
              </p>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping ml-1" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Command HUD Legend Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 z-50 font-sans flex items-center justify-center p-4"
            id="hotkeys-hud-overlay-root"
          >
            {/* Dark back curtain blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Panel Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-lg bg-slate-900/95 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8"
              id="hotkeys-modal-card"
            >
              {/* Hotkeys Background Lights */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

              {/* Close Button top-right */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-1.5 rounded-xl bg-slate-950 border border-slate-850 hover:bg-slate-900 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                id="hud-close-action"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 border-b border-slate-850 pb-5 mb-5 select-none">
                <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl shrink-0">
                  <Command className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-widest">
                      Developer Operations HUD
                    </span>
                  </div>
                  <h3 className="font-display font-black text-base text-slate-100 uppercase mt-0.5 tracking-tight">
                    Keyboard Console Shortcuts
                  </h3>
                </div>
              </div>

              {/* Brief User Info */}
              <p className="text-[11.5px] text-slate-450 leading-relaxed mb-6 select-none font-sans">
                Engineered for technical leaders, CTOs, and principal architects. Simply tap any key below to instant-jump directly to the target system component.
              </p>

              {/* Shortcuts List Grid */}
              <div className="space-y-2.5" id="hud-shortcuts-items-list">
                {SHORTCUTS.map((shortcut) => (
                  <button
                    key={shortcut.key}
                    onClick={() => {
                      const element = document.getElementById(shortcut.targetId);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "start" });
                        setActiveNotification({ key: shortcut.key, action: shortcut.action });
                        setIsOpen(false);
                      }
                    }}
                    className="w-full flex items-center justify-between p-3 bg-slate-950/60 hover:bg-slate-950 border border-slate-850 hover:border-slate-800 rounded-2xl text-left select-none transition-all group cursor-pointer"
                    id={`shortcut-btn-${shortcut.key.toLowerCase()}`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Keyboard Key Graphic */}
                      <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono font-bold tracking-tight shadow-md select-none group-hover:border-indigo-500/40 group-hover:text-indigo-400 transition-colors shrink-0">
                        {shortcut.key}
                      </span>
                      <div>
                        <span className="text-xs font-sans font-bold text-slate-200 block">
                          {shortcut.action}
                        </span>
                        <span className="text-[10px] text-slate-500 font-sans block mt-0.5 leading-snug">
                          {shortcut.description}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-650 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>

              {/* Help & Modal Toggle Key Tip Footer */}
              <div className="mt-6 pt-5 border-t border-slate-850 flex items-center justify-between select-none">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
                  Press <span className="text-slate-400 font-bold bg-slate-950 px-1 py-0.5 border border-slate-850 rounded font-mono">[Esc]</span> to leave HUD
                </span>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-indigo-400/90 font-black tracking-wider uppercase">
                  <span>Power User Mode Active</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
