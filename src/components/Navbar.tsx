import React, { useState, useEffect } from "react";
import { Menu, X, Terminal, MessageSquarePlus, Share2 } from "lucide-react";

interface NavbarProps {
  onOpenConsultation: () => void;
  onOpenSample: () => void;
}

export default function Navbar({ onOpenConsultation, onOpenSample }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Challenges", href: "#challenges" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Deliverables", href: "#deliverables" },
    { label: "About", href: "#about" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQs", href: "#faqs" },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-900 shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
      id="main-navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 cursor-pointer group"
            id="nav-logo"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md group-hover:scale-105 transition-transform">
              <span className="font-display text-base font-black">F</span>
            </div>
            <div>
              <span className="font-display font-black text-sm sm:text-base tracking-tight text-white uppercase block leading-none">
                Frontend Architecture <span className="text-indigo-400">Audit</span>
              </span>
              <span className="block text-[8px] font-mono tracking-widest text-slate-500 uppercase mt-0.5 font-bold">
                by Raviteja M
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="text-slate-400 hover:text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-4 text-sm font-medium">
            <button
              onClick={onOpenSample}
              className="text-slate-400 hover:text-white font-semibold text-xs border border-slate-850 hover:border-slate-700 bg-slate-900/60 py-2 px-4 rounded-xl transition-all cursor-pointer uppercase tracking-wider"
              id="navbar-download-sample-btn"
            >
              Sample Audit
            </button>
            <button
              onClick={onOpenConsultation}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2 px-5 rounded-full shadow-lg shadow-indigo-600/10 transition-all cursor-pointer uppercase tracking-wider"
              id="navbar-book-consult-btn"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" /> Book Free Call
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-b border-slate-900 bg-slate-950" id="mobile-menu-container">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="block w-full text-left py-3 px-3 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-slate-100 font-semibold text-sm transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 grid grid-cols-2 gap-3 border-t border-slate-900/60 mt-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenSample();
                }}
                className="flex items-center justify-center py-2.5 px-3 rounded-xl text-slate-300 bg-slate-900 border border-slate-800 text-xs font-semibold cursor-pointer"
                id="mobile-download-sample-btn"
              >
                Sample Audit
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenConsultation();
                }}
                className="flex items-center justify-center py-2.5 px-3 rounded-full bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                id="mobile-book-consult-btn"
              >
                Book Free Call
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
