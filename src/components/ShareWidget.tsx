import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Share2, Twitter, Linkedin, Copy, Check, 
  X, ExternalLink, Award, Sparkles, MessageSquare
} from "lucide-react";

export default function ShareWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPost, setCopiedPost] = useState(false);

  // Dynamic share text and url configuration
  const shareUrl = window.location.origin || "https://ais-pre-xmsnmzphicwznln2holowg-271123178408.asia-southeast1.run.app";
  const shareText = "Exposing unscalable React state, massive bundle chunks, and Lighthouse bottlenecks on our SaaS with a premium frontend architecture audit by Raviteja M. Check out the interactive blueprint report:";
  const fullPostTemplate = `${shareText}\n\n${shareUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyFullPost = () => {
    navigator.clipboard.writeText(fullPostTemplate);
    setCopiedPost(true);
    setTimeout(() => setCopiedPost(false), 3000);
  };

  const shareToTwitter = () => {
    // Automatically copy the professional template message to their clipboard for pasting
    navigator.clipboard.writeText(fullPostTemplate);
    setCopiedPost(true);
    setTimeout(() => setCopiedPost(false), 3000);

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  const shareToLinkedin = () => {
    // LinkedIn share-offsite reads OpenGraph tag metadata from the URL.
    // For direct pre-filled text, we automatically copy the professional template message 
    // to their clipboard so they can paste it instantly in the LinkedIn popup.
    navigator.clipboard.writeText(fullPostTemplate);
    setCopiedPost(true);
    setTimeout(() => setCopiedPost(false), 3000);

    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedinUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans" id="floating-share-widget">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute bottom-14 right-0 w-80 bg-slate-900/95 border border-slate-800 rounded-2xl p-4 shadow-2xl backdrop-blur-md select-none"
          >
            {/* Widget top header */}
            <div className="flex items-center justify-between border-b border-slate-850 pb-2.5 mb-3">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                  Referral Network
                </span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-slate-300 p-0.5 rounded hover:bg-slate-850 transition-colors cursor-pointer"
                id="share-close-btn"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed font-sans mb-3">
              Refer Raviteja M to other engineering teams or share this interactive blueprint showcase.
            </p>

            {/* Suggested Professional Post Draft Visualizer */}
            <button
              onClick={handleCopyFullPost}
              className="w-full bg-slate-950/80 hover:bg-slate-950 border border-slate-850/60 hover:border-indigo-500/30 rounded-xl p-3 mb-3 text-left transition-all relative group cursor-pointer"
              title="Click anywhere on this preview to copy the suggested professional message template"
              id="suggested-post-container-btn"
            >
              <div className="flex items-center justify-between mb-1.5 border-b border-slate-900 pb-1.5 pointer-events-none">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-extrabold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  Suggested Post Template
                </span>
                {copiedPost ? (
                  <span className="text-[8px] font-mono font-bold text-emerald-450 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/25">
                    Copied Draft!
                  </span>
                ) : (
                  <span className="text-[8px] font-mono text-slate-500 group-hover:text-indigo-400">
                    Click to Copy
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-300 leading-relaxed font-sans italic line-clamp-3 select-all pointer-events-none">
                "{shareText}"
              </p>
              <p className="text-[10.5px] text-indigo-400 font-mono mt-1 opacity-90 truncate pointer-events-none">
                {shareUrl}
              </p>
            </button>

            {/* Grid options */}
            <div className="space-y-2">
              {/* Copy Full Post Copy Draft (Link + Message) */}
              <button
                onClick={handleCopyFullPost}
                className="w-full flex items-center justify-between p-2 px-3 bg-indigo-950/20 hover:bg-indigo-950/40 border border-indigo-900/50 hover:border-indigo-500/30 rounded-xl transition-all text-xs font-semibold text-indigo-300 cursor-pointer"
                id="share-copy-post-btn"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-indigo-500/15 text-indigo-400 rounded-lg">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-sans">Copy Message + Link</span>
                </div>
                {copiedPost ? (
                  <span className="text-[8.5px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    Copied Draft!
                  </span>
                ) : (
                  <span className="text-[9px] font-mono text-indigo-400/70">Copied text</span>
                )}
              </button>

              {/* Copy URL */}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-between p-2 px-3 bg-slate-950/60 hover:bg-slate-950 border border-slate-850 hover:border-slate-800 rounded-xl transition-all text-xs font-medium text-slate-300 cursor-pointer"
                id="share-copy-btn"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-slate-800 border border-slate-700 text-slate-400 rounded-lg">
                    <Copy className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-sans">Copy Link Only</span>
                </div>
                {copiedLink ? (
                  <span className="text-[9px] font-mono font-bold text-emerald-450 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    Copied Link!
                  </span>
                ) : (
                  <span className="text-[9px] font-mono text-slate-500">Copy URL</span>
                )}
              </button>

              {/* LinkedIn Share */}
              <button
                onClick={shareToLinkedin}
                className="w-full flex items-center justify-between p-2 px-3 bg-slate-950/60 hover:bg-slate-950 border border-slate-850 hover:border-slate-800 rounded-xl transition-all text-xs font-medium text-slate-300 cursor-pointer"
                id="share-linkedin-btn"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg">
                    <Linkedin className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-sans">Share on LinkedIn</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[8px] text-slate-500 font-mono">Open</span>
                  <ExternalLink className="w-3 h-3 text-slate-550 shrink-0" />
                </div>
              </button>

              {/* Twitter Share */}
              <button
                onClick={shareToTwitter}
                className="w-full flex items-center justify-between p-2 px-3 bg-slate-950/60 hover:bg-slate-950 border border-slate-850 hover:border-slate-800 rounded-xl transition-all text-xs font-medium text-slate-300 cursor-pointer"
                id="share-twitter-btn"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg">
                    <Twitter className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-sans">Post to Twitter / X</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[8px] text-slate-500 font-mono">Open</span>
                  <ExternalLink className="w-3 h-3 text-slate-550 shrink-0" />
                </div>
              </button>
            </div>

            {/* Audit validation badge footer */}
            <div className="mt-4 pt-3 border-t border-slate-850 text-center flex items-center justify-center gap-1 select-none">
              <Award className="w-3 h-3 text-indigo-400" />
              <span className="text-[8px] font-mono text-indigo-400/80 uppercase font-black tracking-widest">
                Support Indie Engineering
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full border shadow-lg backdrop-blur-md cursor-pointer transition-colors ${
          isOpen 
            ? "bg-indigo-600 border-indigo-500 text-white shadow-indigo-500/15 animate-none" 
            : "bg-slate-900/90 border-slate-850 hover:border-indigo-500/35 text-slate-300 hover:text-white hover:bg-slate-900"
        }`}
        id="share-trigger-floating-btn"
      >
        <Share2 className="w-4 h-4 text-indigo-400 shrink-0" />
        <span className="text-xs font-medium font-sans">Share Audit Layout</span>
        {!isOpen && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
