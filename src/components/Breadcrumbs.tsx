import React from "react";
import { ChevronRight, Home, ShieldAlert, Cpu, Award } from "lucide-react";

export default function Breadcrumbs() {
  const steps = [
    {
      name: "Engineering Solutions",
      href: "#",
      icon: <Home className="w-3.5 h-3.5" />,
      title: "Return to home",
    },
    {
      name: "Diagnostics & Audits",
      href: "#services",
      icon: <Cpu className="w-3.5 h-3.5" />,
      title: "View diagnosis and validation levels",
    },
    {
      name: "Frontend Architecture Review",
      href: "#scheduling-booking-section",
      icon: <Award className="w-3.5 h-3.5" />,
      title: "Secure a diagnostic review",
    },
  ];

  const handleStepClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      const offset = 90; // height of sticky header + breadcrumbs
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Structured Data (JSON-LD string) to inject into the SEO metadata
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": steps.map((step, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": step.name,
      "item": step.href === "#" 
        ? window.location.origin 
        : `${window.location.origin}${step.href}`
    }))
  };

  return (
    <div 
      className="w-full bg-slate-950 border-b border-slate-900 py-3 px-4 sm:px-6 lg:px-8 relative z-30 select-none mt-[64px]"
      id="semantic-breadcrumbs-container"
    >
      {/* Schema.org Structured Data script block */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }} 
      />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
        
        {/* Semantic Breadcrumb List wrapper */}
        <nav 
          aria-label="Breadcrumb" 
          className="flex items-center flex-wrap gap-x-1.5 gap-y-1"
          vocab="https://schema.org/"
          typeof="BreadcrumbList"
        >
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1;
            return (
              <div 
                key={step.name} 
                className="flex items-center"
                property="itemListElement"
                typeof="ListItem"
              >
                {/* Meta position tag for SEO semantic compliance */}
                <meta property="position" content={String(idx + 1)} />

                {idx > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-700 mx-1 shrink-0" aria-hidden="true" />
                )}

                <a
                  href={step.href}
                  onClick={(e) => handleStepClick(e, step.href)}
                  className={`flex items-center gap-1.5 text-[10.5px] font-mono font-bold tracking-wider uppercase transition-all duration-200 py-1 px-1.5 rounded-md ${
                    isLast 
                      ? "text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 cursor-default" 
                      : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"
                  }`}
                  property="item"
                  typeof="WebPage"
                  title={step.title}
                >
                  <span className="text-slate-500" aria-hidden="true">{step.icon}</span>
                  <span property="name">{step.name}</span>
                </a>
              </div>
            );
          })}
        </nav>

        {/* Diagnostic Status Indicator Asset for Technical Decision Makers */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" /> SEO indexable &amp; audited
          </span>
        </div>

      </div>
    </div>
  );
}
