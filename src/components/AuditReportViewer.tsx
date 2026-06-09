import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import PerformanceHeatmap from "./PerformanceHeatmap";
import { 
  FileText, Shield, Award, Cpu, Flame, CheckSquare, Zap, Activity,
  Download, Printer, ChevronRight, ChevronLeft, Map, BarChart2, CheckCircle2,
  AlertTriangle, Grid, RefreshCw, Layers, Sparkles, BookOpen, Clock, Users, HelpCircle
} from "lucide-react";

export default function AuditReportViewer() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("digital"); // digital | print
  const printContainerRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = printContainerRef.current?.innerHTML;
    if (!printContent) return;

    // Create iframe to isolate printing
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(`
      <html>
        <head>
          <title>Frontend Architecture & Performance Audit Report - Raviteja M</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
          <script src="https://cdn.tailwindcss.com"></script>
          <script>
            tailwind.config = {
              theme: {
                extend: {
                  fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                    mono: ['JetBrains Mono', 'monospace'],
                  }
                }
              }
            }
          </script>
          <style>
            @page {
              size: A4 portrait;
              margin: 18mm 16mm 18mm 16mm;
            }
            @media print {
              body {
                background-color: #ffffff !important;
                color: #0f172a !important;
                font-family: 'Inter', -apple-system, sans-serif;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                margin: 0;
                padding: 0;
                line-height: 1.5;
                -webkit-font-smoothing: antialiased;
              }
              .page-break {
                page-break-after: always !important;
                break-after: page !important;
                page-break-inside: avoid !important;
                break-inside: avoid !important;
                padding: 4mm 0 !important;
                border: none !important;
              }
              .no-print {
                display: none !important;
              }
              /* Ink optimization & Crisp typography */
              h1, h2, h3, h4, h5, h6 {
                color: #0f172a !important;
                font-weight: 800 !important;
                page-break-after: avoid;
                break-after: avoid;
              }
              p, li, span, td, th {
                color: #334155 !important;
              }
              /* Table styling for perfect printing */
              table {
                width: 100% !important;
                border-collapse: collapse !important;
                page-break-inside: avoid !important;
                break-inside: avoid !important;
                margin-top: 4px !important;
              }
              th, td {
                border: 1px solid #e2e8f0 !important;
                padding: 6px 10px !important;
                font-size: 11px !important;
              }
              thead {
                display: table-header-group !important;
                background-color: #f1f5f9 !important;
              }
              tr {
                page-break-inside: avoid !important;
                break-inside: avoid !important;
              }
              /* Preserve structure of section cards in print */
              .print-card, .bg-slate-50, blockquote {
                page-break-inside: avoid !important;
                break-inside: avoid !important;
                background-color: #f8fafc !important;
                border: 1px solid #e2e8f0 !important;
                border-radius: 6px !important;
                padding: 12px !important;
              }
              /* Ensure high-fidelity grids do not collapse in standard print */
              .grid {
                display: grid !important;
              }
              .grid-cols-2 {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                gap: 12px !important;
              }
              .grid-cols-3 {
                grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
                gap: 12px !important;
              }
              .grid-cols-4 {
                grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
                gap: 8px !important;
              }
              .grid-cols-5 {
                grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
                gap: 8px !important;
              }
              /* Accent colors for ink prints */
              .text-rose-600 { color: #dc2626 !important; }
              .text-amber-600 { color: #d97706 !important; }
              .text-indigo-650, .text-indigo-600, .text-indigo-400 { color: #4f46e5 !important; }
              .text-emerald-600 { color: #059669 !important; }
              .text-purple-600 { color: #7c3aed !important; }
            }
          </style>
        </head>
        <body class="p-8 bg-white text-slate-900">
          <div class="max-w-4xl mx-auto space-y-12">
            ${printContent}
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => {
                document.body.removeChild(window.frameElement);
              }, 500);
            };
          </script>
        </body>
      </html>
    `);
    doc.close();
  };

  const pages = [
    {
      id: 1,
      title: "Executive Summary",
      sub: "Application Health Index & Critical Vectors",
      icon: <Award className="w-4 h-4 text-indigo-400" />
    },
    {
      id: 2,
      title: "Application Overview",
      sub: "Audit Scope, Tech Stack and Team Demographics",
      icon: <Layers className="w-4 h-4 text-indigo-400" />
    },
    {
      id: 3,
      title: "Architecture Assessment",
      sub: "Component Design, folder decoupling & State Structures",
      icon: <Layers className="w-4 h-4 text-indigo-400" />
    },
    {
      id: 4,
      title: "Performance Assessment",
      sub: "Bundle Diagnostics & Core Web Vitals profiling",
      icon: <Flame className="w-4 h-4 text-indigo-400" />
    },
    {
      id: 5,
      title: "Code Quality Assessment",
      sub: "Clarity rates, test Coverage & Static gate safety",
      icon: <CheckSquare className="w-4 h-4 text-indigo-400" />
    },
    {
      id: 6,
      title: "Technical Debt Matrix",
      sub: "Cost of Delay, architectural risk indexes",
      icon: <Zap className="w-4 h-4 text-indigo-400" />
    },
    {
      id: 7,
      title: "Scalability Review",
      sub: "Team productivity multipliers & developer velocity",
      icon: <Clock className="w-4 h-4 text-indigo-400" />
    },
    {
      id: 8,
      title: "Risk Register Table",
      sub: "10 core architectural flaws sorted by severity",
      icon: <Grid className="w-4 h-4 text-indigo-400" />
    },
    {
      id: 9,
      title: "90-Day Roadmap",
      sub: "Modular action blocks sorted into 30-day sprints",
      icon: <Map className="w-4 h-4 text-indigo-400" />
    },
    {
      id: 10,
      title: "Final Recommendations",
      sub: "Deliverable expectations, bottom-line ROI summary",
      icon: <Activity className="w-4 h-4 text-indigo-400" />
    }
  ];

  return (
    <section className="py-24 border-t border-slate-900 bg-slate-950 relative overflow-hidden" id="report-view-section">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-r from-indigo-500/10 to-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-3">
            <span className="flex items-center gap-1.5 justify-center"><BookOpen className="w-3.5 h-3.5" /> Full Audit Blueprint</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tighter leading-none">
            Client-Facing Audit Sample Report
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Review a comprehensive, 10-page enterprise-grade Frontend Architecture deliverables report that justifies ₹10,000–₹50,000 consulting engagements.
          </p>
        </div>

        {/* Audit Report Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation: 10 Pages Tree View */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider block">Consulting Asset</span>
                  <h3 className="font-display font-bold text-slate-100 text-sm mt-0.5">Report Index Directories</h3>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">100% Comprehensive</span>
                </div>
              </div>

              {/* Page List Tree */}
              <div className="mt-4 space-y-1.5" id="report-toc-list">
                {pages.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setCurrentPage(p.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-300 ${
                      currentPage === p.id
                        ? "bg-indigo-950/40 border-indigo-505/80 shadow-md text-white"
                        : "bg-slate-950/40 border-slate-900/60 hover:border-slate-800/80 hover:bg-slate-950/90 text-slate-400"
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className={`w-6 h-6 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center border shrink-0 mt-0.5 ${
                        currentPage === p.id ? "bg-indigo-600 text-white border-indigo-400/30" : "bg-slate-900 text-slate-500 border-slate-800"
                      }`}>
                        {p.id < 10 ? `0${p.id}` : p.id}
                      </div>
                      <div className="min-w-0">
                        <span className={`text-xs font-bold block ${currentPage === p.id ? "text-slate-100 font-extrabold" : "text-slate-400"}`}>{p.title}</span>
                        <span className="text-[9px] text-slate-500 truncate block mt-0.5">{p.sub}</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${currentPage === p.id ? "text-indigo-400 translate-x-0.5" : "text-slate-700"}`} />
                  </button>
                ))}
              </div>

              {/* Utility Panel */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between gap-2.5">
                <button
                  onClick={handlePrint}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all font-sans text-[10px] uppercase tracking-wider cursor-pointer shadow-lg shadow-indigo-950/20 hover:scale-[1.02] active:scale-[0.98]"
                  title="Generate a custom PDF of this 10-page layout dynamically"
                  id="pdf-download-action"
                >
                  <Download className="w-3.5 h-3.5" /> PDF Download / Print
                </button>
              </div>
            </div>

            {/* Quick Stats Panel */}
            <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl">
              <span className="text-[9px] font-mono font-extrabold text-slate-500 uppercase tracking-widest block mb-3">Diagnostic Deliverable Info</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950 border border-slate-900 p-3 rounded-xl">
                  <span className="text-[9px] text-slate-500 block">Consulting Worth</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">₹10K – ₹50K</span>
                </div>
                <div className="bg-slate-950 border border-slate-900 p-3 rounded-xl">
                  <span className="text-[9px] text-slate-500 block">Primary Focus</span>
                  <span className="text-sm font-bold text-indigo-400">CTO & Founder ROI</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Viewer Panel: Interactive Page Sheet */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            
            {/* Control Bar toolbar */}
            <div className="bg-slate-900 border border-slate-850 py-3 px-4 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-350 uppercase tracking-wider font-mono">
                  Document View / Page {currentPage} of 10
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Print button */}
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1 py-1 px-2.5 bg-indigo-600 hover:bg-indigo-505 text-white font-bold rounded-lg transition-all font-sans text-[10px] uppercase tracking-wider cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] mr-1.5"
                  title="Print full 10-page report to PDF with tailored styling"
                >
                  <Printer className="w-3 h-3" /> Print to PDF
                </button>

                {/* Navigation Buttons */}
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-1 px-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 hover:text-white hover:border-slate-700 disabled:opacity-30 disabled:hover:text-slate-500 cursor-pointer transition-all"
                >
                  <ChevronLeft className="w-4 h-4 inline-block mr-0.5" /> Prev
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(10, prev + 1))}
                  disabled={currentPage === 10}
                  className="p-1 px-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 hover:text-white hover:border-slate-700 disabled:opacity-30 disabled:hover:text-slate-500 cursor-pointer transition-all"
                >
                  Next <ChevronRight className="w-4 h-4 inline-block ml-0.5" />
                </button>
              </div>
            </div>

            {/* Premium Paper Sheet Presentation Layout */}
            <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 sm:p-10 shadow-2xl relative min-h-[580px] overflow-hidden" id="report-sheet-frame">
              {/* PDF Ready Floating Badge */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePrint}
                className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/30 hover:border-emerald-500/50 rounded-full text-emerald-400 font-mono text-[9px] font-bold uppercase tracking-wider cursor-pointer shadow-lg shadow-emerald-950/20 select-none hover:shadow-emerald-500/10 transition-all duration-300 no-print"
                title="Click to print / download PDF report"
                id="pdf-ready-hover-badge"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-450"></span>
                </span>
                <FileText className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>PDF Ready</span>
              </motion.div>

              {/* Corner Watermarks */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-indigo-500/[0.02] rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-4 right-6 text-[9px] font-mono text-slate-600 tracking-widest uppercase select-none pointer-events-none">
                FE ARCH AUDIT REPORT // PAGE {currentPage} INTEL
              </div>

              {/* Dynamic Pages Rendering */}
              <div>
                
                {/* ---------------------------------------------------- */}
                {/* PAGE 1: EXECUTIVE SUMMARY */}
                {/* ---------------------------------------------------- */}
                {currentPage === 1 && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-800 pb-4">
                      <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">Page 01 // OVERVIEW INDEXES</span>
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tighter mt-1">
                        Executive Summary
                      </h3>
                      <p className="text-slate-400 text-xs mt-1">Prepared by Raviteja M // Lead Frontend Architecture Consultant</p>
                    </div>

                    {/* Overall Scorecards grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      <div className="bg-slate-950 border border-slate-800/80 p-3 rounded-xl text-center relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-1 bg-rose-500" />
                        <span className="text-[8px] text-slate-500 uppercase tracking-wider font-bold">Overall Health</span>
                        <div className="text-xl font-mono font-black text-rose-400 mt-2">68%</div>
                        <span className="text-[8px] font-mono text-slate-500 mt-1 block">Critical Needs</span>
                      </div>
                      <div className="bg-slate-950 border border-slate-800/80 p-3 rounded-xl text-center relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-1 bg-amber-500" />
                        <span className="text-[8px] text-slate-500 uppercase tracking-wider font-bold">Architecture</span>
                        <div className="text-xl font-mono font-black text-amber-400 mt-2">58%</div>
                        <span className="text-[8px] font-mono text-slate-500 mt-1 block">Mod. Coupling</span>
                      </div>
                      <div className="bg-slate-950 border border-slate-800/80 p-3 rounded-xl text-center relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-1 bg-indigo-500" />
                        <span className="text-[8px] text-slate-500 uppercase tracking-wider font-bold">Performance</span>
                        <div className="text-xl font-mono font-black text-indigo-400 mt-2">62%</div>
                        <span className="text-[8px] font-mono text-slate-500 mt-1 block">Heavy Bundles</span>
                      </div>
                      <div className="bg-slate-950 border border-slate-800/80 p-3 rounded-xl text-center relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500" />
                        <span className="text-[8px] text-slate-500 uppercase tracking-wider font-bold">Scalability</span>
                        <div className="text-xl font-mono font-black text-emerald-400 mt-2">71%</div>
                        <span className="text-[8px] font-mono text-slate-500 mt-1 block">Team-Ready</span>
                      </div>
                      <div className="bg-slate-950 border border-slate-800/80 p-3 rounded-xl text-center relative overflow-hidden col-span-2 sm:col-span-1">
                        <div className="absolute top-0 inset-x-0 h-1 bg-purple-500" />
                        <span className="text-[8px] text-slate-500 uppercase tracking-wider font-bold">Tech Debt Score</span>
                        <div className="text-xl font-mono font-black text-purple-400 mt-2">45%</div>
                        <span className="text-[8px] font-mono text-slate-500 mt-1 block">High Complexity</span>
                      </div>
                    </div>

                    {/* Executive summary narrative */}
                    <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                      <p>
                        This diagnostic architecture assessment establishes an exhaustive review of the core enterprise React structure, bundle distributions, state mutation lifecycles, and scalability blockers. 
                        Our preliminary audit uncovers a codebase that has grown rapidly under aggressive startup features, resulting in significant **architectural friction**, **bundle size inflation**, and **context rendering trigger layouts**.
                      </p>
                      
                      <div className="bg-indigo-950/20 border-l-2 border-indigo-500 p-4 rounded-r-xl space-y-1 my-4">
                        <h4 className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wide">Key Audit Diagnosis Summary</h4>
                        <p className="text-slate-350">
                          The current layout structure lacks robust package-isolating modular boundaries. As a consequence, code changes in sister components frequently cause unintended regressions in critical user login or checkout sequences, leading to high operational friction and an average development feature delay of four weeks.
                        </p>
                      </div>

                      <p>
                        By restructuring context layers into fine-grained atomic slices, enforcing strict typescript strictness gates inside CI/CD lint loops, and deploying focused lazy-loading partitions, the engineering team can target a **44% initial load bundle compression** and **double the overall product feature delivery speed** within the next 90 days.
                      </p>
                    </div>

                    {/* Risk Bar Meter */}
                    <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[9px] font-mono font-bold text-rose-400 uppercase tracking-widest block">Audit Threat Rating</span>
                        <span className="text-xs font-bold text-slate-200">Critical Architecture Remediation Required</span>
                      </div>
                      <span className="px-3 py-1 bg-red-950/40 border border-red-500/20 text-red-400 text-[10px] font-mono font-bold uppercase rounded-lg">Critical Risk</span>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* PAGE 2: APPLICATION OVERVIEW */}
                {/* ---------------------------------------------------- */}
                {currentPage === 2 && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-800 pb-4">
                      <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">Page 02 // TECHNICAL SCOPE ENVIRONMENT</span>
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tighter mt-1">
                        Application Overview
                      </h3>
                      <p className="text-slate-400 text-xs mt-1">Operational Stack Demographics and Workspace Scale</p>
                    </div>

                    {/* Demographic metrics listing */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl space-y-2">
                        <h4 className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider border-b border-slate-900 pb-1.5">Core Development Ecosystem</h4>
                        <div className="space-y-1.5 font-sans text-xs">
                          <div className="flex justify-between"><span className="text-slate-500">Frontend Framework:</span> <span className="text-slate-200 font-bold">React v18.2.0 (SPA Setup)</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Assembly Compiler:</span> <span className="text-slate-200 font-bold">Vite v5.0.12 (Rollup Bundler)</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Logic Typing:</span> <span className="text-slate-200 font-bold">TypeScript v5.1 (Loose strictness)</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Styling System:</span> <span className="text-slate-200 font-bold">Tailwind CSS v4 (Global Imports)</span></div>
                        </div>
                      </div>

                      <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl space-y-2">
                        <h4 className="text-[10px] font-mono font-bold text-violet-400 uppercase tracking-wider border-b border-slate-900 pb-1.5">Data Structures & Scale</h4>
                        <div className="space-y-1.5 font-sans text-xs">
                          <div className="flex justify-between"><span className="text-slate-500">State Management:</span> <span className="text-slate-200 font-bold">Redux Toolkit / Context APIs</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Active Engineer Force:</span> <span className="text-slate-200 font-bold">8 Front-end Coders</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">App Volume Size:</span> <span className="text-slate-200 font-bold">154K Lines of Code (LOC)</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Active Pipeline:</span> <span className="text-slate-200 font-bold">GitHub Actions to AWS ECS</span></div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                      <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Workspace Scale and User Traffic Metrics:</h4>
                      <p>
                        The audited application manages approximately **250,000 Monthly Active Users (MAU)**, experiencing intense concurrent operations during midweek accounting and invoicing routines. 
                        The product operates entirely behind dynamic auth tokens, meaning client-side performance directly influences core retention and daily transaction numbers.
                      </p>
                      
                      <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-2">
                        <span className="text-[9px] font-mono text-slate-500 uppercase font-black uppercase">Development Release Velocity Graph</span>
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden flex">
                          <div className="bg-rose-500 w-1/3" title="Debugging: 35%" />
                          <div className="bg-amber-500 w-1/4" title="Refactoring: 25%" />
                          <div className="bg-indigo-500 w-[41%]" title="New Features: 40%" />
                        </div>
                        <div className="flex justify-between text-[8px] font-mono text-slate-500">
                          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-rose-500 rounded" /> Debugging (35%)</span>
                          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-amber-500 rounded" /> Refactoring (25%)</span>
                          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-indigo-500 rounded" /> Features (40%)</span>
                        </div>
                      </div>

                      <p>
                        Due to high focus on feature speed, the linting loop lacks enforcement of deep compile warnings. 
                        This oversight contributes to accidental bundling of large third-party modules (like whole lodash and un-shaked lucide icon catalogs), which dramatically increases initial render latencies.
                      </p>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* PAGE 3: ARCHITECTURE ASSESSMENT */}
                {/* ---------------------------------------------------- */}
                {currentPage === 3 && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-800 pb-4">
                      <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">Page 03 // FRAMEWORK AND MODULAR REVIEWS</span>
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tighter mt-1">
                        Architecture Assessment
                      </h3>
                      <p className="text-slate-400 text-xs mt-1">Directory Structure, Coupling Boundaries & Separation of Concerns</p>
                    </div>

                    <div className="space-y-4">
                      
                      {/* ARCH FINDING 1 */}
                      <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono text-rose-450 font-bold bg-rose-950/40 border border-rose-900/30 px-2 py-0.5 rounded uppercase">Finding 01 // CRITICAL</span>
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black">State Layer</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-205">Unrestricted Application-Wide Context Trigger-Cascades</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-400 mt-2">
                          <div>
                            <strong className="text-slate-300 block mb-0.5 font-semibold">Observation:</strong> 
                            A giant unified custom React Context wraps the entire routing panel. Any modification in subview active tabs forces top-level states to update, resulting in rendering cascade cycles of unmodified sister tabs.
                          </div>
                          <div>
                            <strong className="text-slate-300 block mb-0.5 font-semibold">Business Impact:</strong> 
                            Slowing user interactions in the workspace panel leads to a high customer friction rate, increasing helpdesk tickets about "UI freezes or lagged key entry."
                          </div>
                        </div>
                        <div className="pt-2 border-t border-slate-900/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-400">
                          <div>
                            <strong className="text-slate-300 block mb-0.5 font-semibold">Recommendation:</strong> 
                            Migrate the unified context object into modular atom states using Zustand or decouple specific settings into lazy, memoized render wrappers.
                          </div>
                          <div>
                            <strong className="text-slate-300 block mb-0.5 font-semibold">Priority:</strong> 
                            <span className="text-rose-400 font-bold font-mono">PRIORITY 1 // IMMEDIATE</span>
                          </div>
                        </div>
                      </div>

                      {/* ARCH FINDING 2 */}
                      <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono text-amber-450 font-bold bg-amber-950/40 border border-amber-900/30 px-2 py-0.5 rounded uppercase">Finding 02 // HIGH</span>
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black">Separation of Concerns</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-205">Direct SQL/API mutations mixed inside Rendering Layout Layers</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-400 mt-2">
                          <div>
                            <strong className="text-slate-300 block mb-0.5 font-semibold">Observation:</strong> 
                            Several dashboard charts perform raw fetch triggers and data parsing mapping logic nested directly inside UI list items.
                          </div>
                          <div>
                            <strong className="text-slate-300 block mb-0.5 font-semibold">Business Impact:</strong> 
                            Testing these components offline is nearly impossible, resulting in a high risk of production bugs when backend JSON structures change.
                          </div>
                        </div>
                        <div className="pt-2 border-t border-slate-900/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-400">
                          <div>
                            <strong className="text-slate-300 block mb-0.5 font-semibold">Recommendation:</strong> 
                            Abstract API fetches into dedicated react-query queries and enforce presentational components to accept parsed primitives.
                          </div>
                          <div>
                            <strong className="text-slate-300 block mb-0.5 font-semibold">Priority:</strong> 
                            <span className="text-amber-400 font-bold font-mono">PRIORITY 2 // NEXT RE-ROUTE</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* PAGE 4: PERFORMANCE ASSESSMENT */}
                {/* ---------------------------------------------------- */}
                {currentPage === 4 && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-800 pb-4">
                      <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">Page 04 // WEB VITALS & TRAFFIC LATENCIES</span>
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tighter mt-1">
                        Performance Assessment
                      </h3>
                      <p className="text-slate-400 text-xs mt-1">Bundle Sizes, Paint Cycles and Edge API optimization</p>
                    </div>

                    {/* CWV Score metric block */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-slate-950 p-4 rounded-xl border border-rose-950/40 relative">
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500" />
                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Largest Contentful Paint</span>
                        <div className="text-xl font-mono font-black text-rose-400 mt-1">4.8s</div>
                        <span className="text-[9px] text-slate-450 block mt-1">Status: Needs Action</span>
                      </div>
                      <div className="bg-slate-950 p-4 rounded-xl border border-amber-950/40 relative">
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500" />
                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Total Blocking Time</span>
                        <div className="text-xl font-mono font-black text-amber-400 mt-1">840ms</div>
                        <span className="text-[9px] text-slate-450 block mt-1">Status: High Thread Lag</span>
                      </div>
                      <div className="bg-slate-950 p-4 rounded-xl border border-emerald-950/40 relative">
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Cumulative Layout Shift</span>
                        <div className="text-xl font-mono font-black text-emerald-400 mt-1">0.11</div>
                        <span className="text-[9px] text-slate-450 block mt-1">Status: Compliant</span>
                      </div>
                    </div>

                    <div className="space-y-4 text-xs text-slate-350 leading-relaxed">
                      <div>
                        <strong className="text-slate-100 block mb-1 uppercase text-xs tracking-wider">Current State Assessment:</strong>
                        The initial bundle loading payload weighs approximately **2.4MB gzip** for the login landing view, which severely bottlenecks client startup. 
                        Mobile web developers on 3G links wait over 12 seconds for full paint interactive readiness, resulting in dropped lead conversion funnels.
                      </div>

                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                        <h5 className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">Estimated Refactoring Improvements</h5>
                        <div className="space-y-2 font-mono text-[10px]">
                          <div className="flex justify-between border-b border-slate-900 pb-1">
                            <span>Diagnostic Step:</span>
                            <span className="text-indigo-400">Target Resolution Outcome</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Vite Chunk splitting rules:</span>
                            <span className="text-emerald-400 font-bold">-1.2MB Bundle Size (-50%)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Image compression + WebP tags:</span>
                            <span className="text-emerald-400 font-bold">LCP reduces to &lt;2.2s</span>
                          </div>
                          <div className="flex justify-between">
                            <span>API caches and query Hydrate wrappers:</span>
                            <span className="text-emerald-400 font-bold">Eliminate 65% of duplicate requests</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <strong className="text-slate-100 block mb-1 uppercase text-xs tracking-wider">Technical Impact Analysis:</strong>
                        The high Total Blocking Time of 840ms is caused by un-optimized layout calculations nested inside custom lists. 
                        Refactoring these with virtualization algorithms (such as react-window) will drop rendering frame load averages from 110ms to below 8ms.
                      </div>

                      {/* Interactive Visual Bottleneck Heatmap */}
                      <div className="pt-3">
                        <PerformanceHeatmap />
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* PAGE 5: CODE QUALITY ASSESSMENT */}
                {/* ---------------------------------------------------- */}
                {currentPage === 5 && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-800 pb-4">
                      <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">Page 05 // COMPLIANCE & STATIC SAFEWAYS</span>
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tighter mt-1">
                        Code Quality Assessment
                      </h3>
                      <p className="text-slate-400 text-xs mt-1">Clarity ratings, reusability metrics, testing limits</p>
                    </div>

                    {/* Metric scorecard rates */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div className="bg-slate-950 border border-slate-900 p-3.5 rounded-xl">
                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Maintainability</span>
                        <div className="text-lg font-mono font-black text-rose-450 mt-1">C- Grade</div>
                        <span className="text-[9px] text-slate-600 block">High Complexity</span>
                      </div>
                      <div className="bg-slate-950 border border-slate-900 p-3.5 rounded-xl">
                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Reusability</span>
                        <div className="text-lg font-mono font-black text-amber-455 mt-1">D+ Grade</div>
                        <span className="text-[9px] text-slate-600 block">Coupled code</span>
                      </div>
                      <div className="bg-slate-950 border border-slate-900 p-3.5 rounded-xl">
                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Strict TypeScript</span>
                        <div className="text-lg font-mono font-black text-yellow-405 mt-1">B- Grade</div>
                        <span className="text-[9px] text-slate-600 block">Loose typings</span>
                      </div>
                      <div className="bg-slate-950 border border-slate-900 p-3.5 rounded-xl">
                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Test Coverage</span>
                        <div className="text-lg font-mono font-black text-rose-450 mt-1">12% Rating</div>
                        <span className="text-[9px] text-slate-600 block">Core hooks untested</span>
                      </div>
                    </div>

                    <div className="space-y-4 text-xs text-slate-350 leading-relaxed">
                      <div>
                        <strong className="text-slate-100 block mb-1 uppercase text-xs tracking-wider">Observations and Technical Findings:</strong>
                        The codebase has significant custom logic duplication (e.g. 4 isolated forms reuse manual email-validation logic loops). 
                        Additionally, ESLint limits are configured with the low severity flag warnings instead of hard block configurations. 
                        This oversight permits developers to commit unused imports and un-typed variables, adding noise to peer merge reviews.
                      </div>

                      <div className="bg-slate-950/40 border-l-2 border-amber-500 p-4 rounded-r-xl space-y-1">
                        <h5 className="text-[10px] uppercase font-mono font-black text-amber-400">Dependency Health Alert</h5>
                        <p className="text-slate-400">
                          We flagged **24 critical dependency packages** that are multiple major versions out of date. 
                          Furthermore, the package lock directory lists 8 un-patched CVE safety advisories. This lag presents high compliance risks for clients handling sensitive corporate payment integrations.
                        </p>
                      </div>

                      <div>
                        <strong className="text-slate-100 block mb-1 uppercase text-xs tracking-wider">Target Improvement Path:</strong>
                        Introduce automated Prettier hooks and ESLint gate checks in pre-commit tasks using Husky. 
                        Targeting state hook unit testing in Vitest (specifically verifying caching and fallback hooks) will drive total code coverage indexes from 12% to over 60% within Month 2 of our roadmap.
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* PAGE 6: TECHNICAL DEBT ASSESSMENT */}
                {/* ---------------------------------------------------- */}
                {currentPage === 6 && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-800 pb-4">
                      <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">Page 06 // DELAY VALUATIONS & LIABILITIES</span>
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tighter mt-1">
                        Technical Debt Assessment
                      </h3>
                      <p className="text-slate-400 text-xs mt-1">Maturity Debt vectors cataloged by delayed release cost</p>
                    </div>

                    {/* Tech Debt Matrix Sections */}
                    <div className="space-y-3.5">
                      
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-slate-950 border border-slate-850 p-4 rounded-xl items-center">
                        <div className="md:col-span-3">
                          <span className="text-[8px] font-mono font-bold text-rose-400 uppercase tracking-widest block mb-0.5">Category 01</span>
                          <span className="text-xs font-bold text-slate-100 uppercase tracking-wide">Architecture Debt</span>
                        </div>
                        <div className="md:col-span-4 text-[11px] text-slate-400">
                          Unified state structures block sibling modules. Every feature requires heavy sibling file refactors.
                        </div>
                        <div className="md:col-span-3 text-[11px] text-red-400 font-semibold">
                          Cost of Delay: 4 Weeks
                        </div>
                        <div className="md:col-span-2 text-right">
                          <span className="px-2.5 py-0.5 bg-red-950/40 border border-red-500/20 text-red-400 text-[9px] font-mono font-bold uppercase rounded">Critical</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-slate-950 border border-slate-850 p-4 rounded-xl items-center">
                        <div className="md:col-span-3">
                          <span className="text-[8px] font-mono font-bold text-amber-400 uppercase tracking-widest block mb-0.5">Category 02</span>
                          <span className="text-xs font-bold text-slate-100 uppercase tracking-wide">Testing Debt</span>
                        </div>
                        <div className="md:col-span-4 text-[11px] text-slate-400">
                          Critical pricing and calculations hooks run inside views without visual unit tests.
                        </div>
                        <div className="md:col-span-3 text-[11px] text-amber-400 font-semibold">
                          Cost of Delay: 3 Weeks
                        </div>
                        <div className="md:col-span-2 text-right">
                          <span className="px-2.5 py-0.5 bg-amber-950/40 border border-amber-500/20 text-amber-400 text-[9px] font-mono font-bold uppercase rounded">Severe</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-slate-950 border border-slate-850 p-4 rounded-xl items-center">
                        <div className="md:col-span-3">
                          <span className="text-[8px] font-mono font-bold text-blue-400 uppercase tracking-widest block mb-0.5">Category 03</span>
                          <span className="text-xs font-bold text-slate-100 uppercase tracking-wide">Code Structure</span>
                        </div>
                        <div className="md:col-span-4 text-[11px] text-slate-400">
                          Giant component helper files exceed 1,500 lines of messy inline functions.
                        </div>
                        <div className="md:col-span-3 text-[11px] text-blue-400 font-semibold">
                          Cost of Delay: 2 Weeks
                        </div>
                        <div className="md:col-span-2 text-right">
                          <span className="px-2.5 py-0.5 bg-blue-950/40 border border-blue-500/20 text-blue-400 text-[9px] font-mono font-bold uppercase rounded">Moderate</span>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* PAGE 7: SCALABILITY REVIEW */}
                {/* ---------------------------------------------------- */}
                {currentPage === 7 && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-800 pb-4">
                      <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">Page 07 // VELOCITY AND TEAM SCALINGS</span>
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tighter mt-1">
                        Scalability Review
                      </h3>
                      <p className="text-slate-400 text-xs mt-1">Assess productivity blocks and team onboarding velocities</p>
                    </div>

                    <div className="space-y-4 text-xs text-slate-350 leading-relaxed">
                      <div>
                        <strong className="text-slate-100 block mb-1 uppercase text-xs tracking-wider">Onboarding Friction and Team Growth Barriers:</strong>
                        The complex layout patterns slow down parent workflow setups. Onboarding a junior frontend hire currently averages **32 productive calendar days** of un-focused workspace training before they can push production-level features. 
                        As compile structures grow, local startup setups require massive node engine operations, generating local build failures.
                      </div>

                      {/* Scalability card block list */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl space-y-1.5">
                          <span className="text-[9px] font-mono text-indigo-400 font-bold uppercase">Application Scalability</span>
                          <p className="text-slate-400 leading-normal">
                            Lack of isolated submodule folders prevents route-level component splitting, resulting in massive initial downloads that cause severe mobile paint lag.
                          </p>
                        </div>
                        <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl space-y-1.5">
                          <span className="text-[9px] font-mono text-violet-400 font-bold uppercase">Development Velocity</span>
                          <p className="text-slate-400 leading-normal">
                            Git branch merge conflicts occur continuously over unified global config sheets, wasting approximately **22 engineer hours per release** in manual resolutions.
                          </p>
                        </div>
                      </div>

                      <div>
                        <strong className="text-slate-100 block mb-1 uppercase text-xs tracking-wider">Release Management and Gateway Protocols:</strong>
                        The deployment layout operates fully on custom release scripts inside CI instances. However, these tools do not execute automated performance checks, allowing un-optimized imagery uploads or oversized third-party script assets to pass into production checks.
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* PAGE 8: RISK MATRIX TABLE (10 SAMPLE FINDINGS) */}
                {/* ---------------------------------------------------- */}
                {currentPage === 8 && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-800 pb-4">
                      <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">Page 08 // ARCHITECTURAL RISK MATRIX REGISTER</span>
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tighter mt-1">
                        Risk Matrix
                      </h3>
                      <p className="text-slate-400 text-xs mt-1">The 10 Core Architectural Faults and Remediation Directives</p>
                    </div>

                    {/* Highly responsive scrollable table */}
                    <div className="overflow-x-auto -mx-6 sm:mx-0">
                      <div className="inline-block min-w-full align-middle font-sans text-[10px]">
                        <div className="overflow-hidden border border-slate-800 rounded-xl bg-slate-950">
                          <table className="min-w-full divide-y divide-slate-900">
                            <thead className="bg-slate-900">
                              <tr>
                                <th scope="col" className="px-3 py-2 text-left font-bold text-slate-350 uppercase tracking-wider">Issue Findings</th>
                                <th scope="col" className="px-2 py-2 text-left font-bold text-slate-350 uppercase tracking-wider">Business Impact</th>
                                <th scope="col" className="px-2 py-2 text-left font-bold text-slate-350 uppercase tracking-wider">Severity</th>
                                <th scope="col" className="px-3 py-2 text-left font-bold text-slate-350 uppercase tracking-wider">Priority Remediation</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-850 bg-slate-950/40 text-slate-400">
                              
                              <tr>
                                <td className="px-3 py-2 font-semibold text-slate-200">1. Circular Dependencies Loop</td>
                                <td className="px-2 py-2">Causes memory leaks and random production compile crashes.</td>
                                <td className="px-2 py-2"><span className="text-rose-455 font-bold font-mono">Critical</span></td>
                                <td className="px-3 py-2 text-slate-300">Run DP-tree checks, isolate modules.</td>
                              </tr>

                              <tr>
                                <td className="px-3 py-2 font-semibold text-slate-200">2. Missing Top Error Boundaries</td>
                                <td className="px-2 py-2">Sub-component crashes freeze the entire dashboard.</td>
                                <td className="px-2 py-2"><span className="text-rose-455 font-bold font-mono">Critical</span></td>
                                <td className="px-3 py-2 text-slate-300">Mount React Error Boundary blocks.</td>
                              </tr>

                              <tr>
                                <td className="px-3 py-2 font-semibold text-slate-200">3. Nested Layout Context Loops</td>
                                <td className="px-2 py-2">Forces massive redundant DOM paint tasks on clicks.</td>
                                <td className="px-2 py-2"><span className="text-amber-455 font-bold font-mono">Severe</span></td>
                                <td className="px-3 py-2 text-slate-300">Migrate states to local Zustand atoms.</td>
                              </tr>

                              <tr>
                                <td className="px-3 py-2 font-semibold text-slate-200">4. Loose NPM Modules</td>
                                <td className="px-2 py-2">CVE compliance gaps, exposing security endpoints.</td>
                                <td className="px-2 py-2"><span className="text-amber-455 font-bold font-mono">Severe</span></td>
                                <td className="px-3 py-2 text-slate-300">Enforce yarn-audit or npm-audit checks.</td>
                              </tr>

                              <tr>
                                <td className="px-3 py-2 font-semibold text-slate-200">5. Blocking Large CSV Parser</td>
                                <td className="px-2 py-2">Causes user browser freeze loops exceeding 2.2s.</td>
                                <td className="px-2 py-2"><span className="text-amber-455 font-bold font-mono">Severe</span></td>
                                <td className="px-3 py-2 text-slate-300">Transfer parser actions into Web Workers.</td>
                              </tr>

                              <tr>
                                <td className="px-3 py-2 font-semibold text-slate-200">6. Duplicate Fetch Paths</td>
                                <td className="px-2 py-2">Triggers massive load demands on servers.</td>
                                <td className="px-2 py-2"><span className="text-blue-455 font-bold font-mono">Moderate</span></td>
                                <td className="px-3 py-2 text-slate-300">Integrate react-query fetching caches.</td>
                              </tr>

                              <tr>
                                <td className="px-3 py-2 font-semibold text-slate-205">7. Outdated Router Libraries</td>
                                <td className="px-2 py-2">Prevents deployment of modern route loaders.</td>
                                <td className="px-2 py-2"><span className="text-blue-455 font-bold font-mono">Moderate</span></td>
                                <td className="px-3 py-2 text-slate-300">Upgrade Router configuration modules.</td>
                              </tr>

                              <tr>
                                <td className="px-3 py-2 font-semibold text-slate-205">8. Global CSS Sheet Leak</td>
                                <td className="px-2 py-2">Causes accidental visual layout shifts.</td>
                                <td className="px-2 py-2"><span className="text-slate-500 font-bold font-mono">Low</span></td>
                                <td className="px-3 py-2 text-slate-300">Migrate scope sheets to CSS modules.</td>
                              </tr>

                              <tr>
                                <td className="px-3 py-2 font-semibold text-slate-205">9. Loose Type Cast Payload</td>
                                <td className="px-2 py-2">Causes runtime failures under blank mock structures.</td>
                                <td className="px-2 py-2"><span className="text-slate-500 font-bold font-mono">Low</span></td>
                                <td className="px-3 py-2 text-slate-300">Introduce strict zod schemas for payload checks.</td>
                              </tr>

                              <tr>
                                <td className="px-3 py-2 font-semibold text-slate-205">10. Loose CI Lint Standards</td>
                                <td className="px-2 py-2">Increases PR review noise with simple styling errors.</td>
                                <td className="px-2 py-2"><span className="text-slate-500 font-bold font-mono">Low</span></td>
                                <td className="px-3 py-2 text-slate-300">Deploy ESLint gate checks in commit blocks.</td>
                              </tr>

                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* PAGE 9: 90-DAY IMPROVEMENT ROADMAP */}
                {/* ---------------------------------------------------- */}
                {currentPage === 9 && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-800 pb-4">
                      <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">Page 09 // STRATEGIC PHASING TIMESTAMPS</span>
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tighter mt-1">
                        90-Day Improvement Roadmap
                      </h3>
                      <p className="text-slate-400 text-xs mt-1">Phased execution blocks sorting high-reward transformations</p>
                    </div>

                    {/* Gantt / Sprint blocks layout */}
                    <div className="space-y-4">
                      
                      <div className="relative border-l border-slate-800 pl-6 pb-2">
                        <div className="absolute -left-[4.5px] top-1 w-2.5 h-2.5 bg-indigo-500 rounded-full" />
                        <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-widest block">Month 1 // Days 1–30</span>
                        <h4 className="text-xs font-bold text-slate-100">Vite Optimization and Performance Quick Wins</h4>
                        <p className="text-slate-400 text-xs mt-1 leading-normal">
                          Focus exclusively on bundle-splitting rules, removing bloated lodash imports, implementing generic image formats, and introducing pre-commit formatting Husky filters. 
                          **Objective: Reduce initial app load bundles by &gt;40%.**
                        </p>
                      </div>

                      <div className="relative border-l border-slate-800 pl-6 pb-2">
                        <div className="absolute -left-[4.5px] top-1 w-2.5 h-2.5 bg-violet-500 rounded-full" />
                        <span className="text-[9px] font-mono font-bold text-violet-400 uppercase tracking-widest block">Month 2 // Days 31–60</span>
                        <h4 className="text-xs font-bold text-slate-100">Global State Decoupling & Component Restructuring</h4>
                        <p className="text-slate-400 text-xs mt-1 leading-normal">
                          Break up massive top-level contexts into isolated atomic state stores (Zustand). 
                          Migrate messy page fetches into cached React-Query hook classes, decoupler wrapper boundaries, and establish sub-domain folder boundaries.
                        </p>
                      </div>

                      <div className="relative border-l border-slate-800 pl-6">
                        <div className="absolute -left-[4.5px] top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                        <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">Month 3 // Days 61–90</span>
                        <h4 className="text-xs font-bold text-slate-100">Vitest Automation Platforms & Onboarding playbooks</h4>
                        <p className="text-slate-400 text-xs mt-1 leading-normal">
                          Introduce core test coverage sweeps checking business logic hooks. 
                          Assemble clean developer playbooks with automated workspace configs to dramatically streamline newcomer onboarding structures.
                        </p>
                      </div>

                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* PAGE 10: FINAL RECOMMENDATIONS */}
                {/* ---------------------------------------------------- */}
                {currentPage === 10 && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-800 pb-4">
                      <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">Page 10 // OPERATIONAL BLUEPRINT SUMMARY</span>
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tighter mt-1">
                        Final Recommendations
                      </h3>
                      <p className="text-slate-400 text-xs mt-1">Top 10 Golden rules to scale high-velocity products</p>
                    </div>

                    <div className="space-y-3 font-sans text-xs text-slate-300 leading-normal">
                      <p className="font-bold text-slate-100">
                        To maintain high productivity, the engineering team should execute these 10 core directives:
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[11px] text-slate-400 font-sans">
                        <div className="flex gap-2"><span className="text-indigo-450 font-bold font-mono shrink-0">01.</span> Enforce Atomic State slices first.</div>
                        <div className="flex gap-2"><span className="text-indigo-455 font-bold font-mono shrink-0">02.</span> Require explicit TypeScript strict gates.</div>
                        <div className="flex gap-2"><span className="text-indigo-455 font-bold font-mono shrink-0">03.</span> Route-level lazy loading partitions.</div>
                        <div className="flex gap-2"><span className="text-indigo-455 font-bold font-mono shrink-0">04.</span> Abstract API logic inside React-Query.</div>
                        <div className="flex gap-2"><span className="text-indigo-455 font-bold font-mono shrink-0">05.</span> virtualize large list views exceeding 100 rows.</div>
                        <div className="flex gap-2"><span className="text-indigo-455 font-bold font-mono shrink-0">06.</span> Standardize dependency upgrades per quarter.</div>
                        <div className="flex gap-2"><span className="text-indigo-455 font-bold font-mono shrink-0">07.</span> Block builds with critical security CVEs.</div>
                        <div className="flex gap-2"><span className="text-indigo-455 font-bold font-mono shrink-0">08.</span> Maintain unit mock tests over hook assets.</div>
                        <div className="flex gap-2"><span className="text-indigo-455 font-bold font-mono shrink-0">09.</span> Deploy visual layout tree analyzers in CI.</div>
                        <div className="flex gap-2"><span className="text-indigo-455 font-bold font-mono shrink-0">10.</span> Conduct bi-weekly modular refactor sprints.</div>
                      </div>

                      <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-1.5 mt-4">
                        <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase block">Core Business Benefits (ROI Summary)</span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] text-slate-400 font-mono pt-1">
                          <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-450 shrink-0" /> Faster Team Delivery</div>
                          <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-450 shrink-0" /> Stable Paint latency</div>
                          <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-450 shrink-0" /> Reduced Tech Debt</div>
                          <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-450 shrink-0" /> High Maintainability</div>
                          <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-450 shrink-0" /> Safe Developer flow</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
            
            {/* Quick Helper Notes */}
            <div className="text-[10px] text-slate-500 italic px-2">
              💡 <strong>Accredited Standard PDF Guide:</strong> Click "PDF Download" above to invoke a compliant workspace style rendering sheet containing print margins.
            </div>

          </div>
        </div>

      </div>

      {/* Hidden container specifically for isolating clean Print actions */}
      <div className="hidden" id="hidden-print-render-portal">
        <div ref={printContainerRef}>
          {/* Printable page copies rendered flat sequentially */}
          {pages.map((p) => (
            <div key={p.id} className="page-break space-y-8 py-8 px-4 font-sans text-slate-900 bg-white">
              <div className="border-b border-slate-200 pb-4 flex justify-between items-end">
                <div>
                  <span className="text-[9px] font-mono text-indigo-650 font-bold uppercase tracking-wider block">FRONTEND ARCHITECTURE & PERFORMANCE AUDIT REPORT</span>
                  <h2 className="font-sans font-black text-2xl text-slate-900 uppercase tracking-tight mt-1">
                    {p.id}. {p.title}
                  </h2>
                  <p className="text-[11px] text-slate-500 mt-1">{p.sub}</p>
                </div>
                <div className="text-right text-[10px] text-slate-400 font-mono">
                  CONSULTANT: RAVITEJA M // PAGE 0{p.id} OF 10
                </div>
              </div>

              {/* Individual Print Pages content duplicates */}
              {p.id === 1 && (
                <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
                  <div className="grid grid-cols-5 gap-4 border border-slate-200 p-4 rounded bg-slate-50">
                    <div>
                      <span className="text-[9px] text-slate-505 block uppercase font-bold text-slate-400">Overall Health</span>
                      <strong className="text-lg text-rose-600 font-sans">68%</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-550 block uppercase font-bold text-slate-400">Architecture</span>
                      <strong className="text-lg text-amber-600 font-sans">58%</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-550 block uppercase font-bold text-slate-400">Performance</span>
                      <strong className="text-lg text-indigo-600 font-sans">62%</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-550 block uppercase font-bold text-slate-400">Scalability</span>
                      <strong className="text-lg text-emerald-600 font-sans">71%</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-550 block uppercase font-bold text-slate-400">Tech Debt</span>
                      <strong className="text-lg text-purple-600 font-sans">45%</strong>
                    </div>
                  </div>

                  <p>
                    This diagnostic architecture assessment establishes an exhaustive review of the core enterprise React structure, bundle distributions, state mutation lifecycles, and scalability blockers. 
                    Our preliminary audit uncovers a codebase that has grown rapidly under aggressive startup features, resulting in significant architecture friction, bundle size inflation, and context rendering trigger layouts.
                  </p>
                  
                  <div className="border-l-4 border-indigo-600 pl-4 py-2 bg-indigo-50/50 rounded">
                    <strong>Key Audit Diagnosis Summary:</strong>
                    <p className="text-slate-650 text-xs mt-1">
                      The current layout structure lacks robust package-isolating modular boundaries. As a consequence, code changes in sister components frequently cause unintended regressions in critical user login or checkout sequences, leading to high operational friction and an average development feature delay of four weeks.
                    </p>
                  </div>

                  <p>
                    By restructuring context layers into fine-grained atomic slices, enforcing strict typescript strictness gates inside CI/CD lint loops, and deploying focused lazy-loading partitions, the engineering team can target a 44% initial load bundle compression and double the overall product feature delivery speed within the next 90 days.
                  </p>
                </div>
              )}

              {p.id === 2 && (
                <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="border border-slate-200 p-4 rounded bg-slate-50">
                      <h4 className="text-xs font-bold text-indigo-700 border-b border-slate-200 pb-1.5 uppercase">Core Development Ecosystem</h4>
                      <ul className="space-y-1.5 text-xs mt-2">
                        <li>Frontend Framework: <strong>React v18.2.0 (SPA Setup)</strong></li>
                        <li>Assembly Compiler: <strong>Vite v5.0.12 (Rollup Bundler)</strong></li>
                        <li>Logic Typing: <strong>TypeScript v5.1 (Loose strictness)</strong></li>
                        <li>Styling System: <strong>Tailwind CSS v4 (Global Imports)</strong></li>
                      </ul>
                    </div>

                    <div className="border border-slate-200 p-4 rounded bg-slate-50">
                      <h4 className="text-xs font-bold text-violet-700 border-b border-slate-200 pb-1.5 uppercase">Data Structures & Scale</h4>
                      <ul className="space-y-1.5 text-xs mt-2">
                        <li>State Management: <strong>Redux Toolkit / Context APIs</strong></li>
                        <li>Active Engineer Force: <strong>8 Front-end Coders</strong></li>
                        <li>App Volume Size: <strong>154K Lines of Code (LOC)</strong></li>
                        <li>Active Pipeline: <strong>GitHub Actions to AWS ECS</strong></li>
                      </ul>
                    </div>
                  </div>

                  <p>
                    The audited application manages approximately 250,000 Monthly Active Users (MAU), experiencing intense concurrent operations during midweek accounting and invoicing routines. 
                    The product operates entirely behind dynamic auth tokens, meaning client-side performance directly influences core retention and daily transaction numbers.
                  </p>
                </div>
              )}

              {p.id === 3 && (
                <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
                  <div className="border border-slate-200 p-4 rounded bg-slate-50 space-y-2">
                    <h4 className="text-xs font-bold text-rose-700">Circular Dependency loop in utils</h4>
                    <p><strong>Observation:</strong> A giant unified custom React Context wraps the entire routing panel. Any modification in subview active tabs forces top-level states to update, resulting in rendering cascade cycles of unmodified sister tabs.</p>
                    <p><strong>Business Impact:</strong> Slowing user interactions in the workspace panel leads to a high customer friction rate, increasing helpdesk tickets about UI freezes or lagged key entry.</p>
                    <p><strong>Recommendation:</strong> Migrate the unified context object into modular atom states using Zustand or decouple specific settings into lazy, memoized render wrappers.</p>
                  </div>

                  <div className="border border-slate-200 p-4 rounded bg-slate-50 space-y-2">
                    <h4 className="text-xs font-bold text-amber-700">Direct SQL/API mutations mixed inside Rendering Layout Layers</h4>
                    <p><strong>Observation:</strong> Several dashboard charts perform raw fetch triggers and data parsing mapping logic nested directly inside UI list items.</p>
                    <p><strong>Business Impact:</strong> Testing these components offline is nearly impossible, resulting in a high risk of production bugs when backend JSON structures change.</p>
                    <p><strong>Recommendation:</strong> Abstract API fetches into dedicated react-query queries and enforce presentational components to accept parsed primitives.</p>
                  </div>
                </div>
              )}

              {p.id === 4 && (
                <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="border border-slate-200 p-3 rounded">
                      <span className="text-[9px] uppercase tracking-wider block text-slate-400 font-bold">Largest Contentful Paint</span>
                      <strong className="text-lg text-rose-600 block mt-1">4.8s</strong>
                    </div>
                    <div className="border border-slate-200 p-3 rounded">
                      <span className="text-[9px] uppercase tracking-wider block text-slate-400 font-bold">Total Blocking Time</span>
                      <strong className="text-lg text-amber-600 block mt-1">840ms</strong>
                    </div>
                    <div className="border border-slate-200 p-3 rounded">
                      <span className="text-[9px] uppercase tracking-wider block text-slate-400 font-bold">Cumulative Layout Shift</span>
                      <strong className="text-lg text-emerald-600 block mt-1">0.11</strong>
                    </div>
                  </div>

                  <p>
                    The initial bundle loading payload weighs approximately 2.4MB gzip for the login landing view, which severely bottlenecks client startup. 
                    Mobile web developers on 3G links wait over 12 seconds for full paint interactive readiness, resulting in dropped lead conversion funnels.
                  </p>
                </div>
              )}

              {p.id === 5 && (
                <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div className="border border-slate-200 p-3 rounded">
                      <span className="text-[9px] uppercase block text-slate-400 font-bold">Maintainability</span>
                      <strong className="text-sm text-rose-600">C- Grade</strong>
                    </div>
                    <div className="border border-slate-200 p-3 rounded">
                      <span className="text-[9px] uppercase block text-slate-400 font-bold">Reusability</span>
                      <strong className="text-sm text-amber-600">D+ Grade</strong>
                    </div>
                    <div className="border border-slate-200 p-3 rounded">
                      <span className="text-[9px] uppercase block text-slate-400 font-bold">TypeScript</span>
                      <strong className="text-sm text-emerald-600 font-sans">B- Grade</strong>
                    </div>
                    <div className="border border-slate-200 p-3 rounded">
                      <span className="text-[9px] uppercase block text-slate-400 font-bold">Test Coverage</span>
                      <strong className="text-sm text-rose-600">12% Rating</strong>
                    </div>
                  </div>

                  <p>
                    The codebase has significant custom logic duplication (e.g. 4 isolated forms reuse manual email-validation logic loops). 
                    Additionally, ESLint limits are configured with the low severity flag warnings instead of hard block configurations. This oversight permits developers to commit unused imports and untyped variables, adding noise to peer merge reviews.
                  </p>
                </div>
              )}

              {p.id === 6 && (
                <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
                  <div className="space-y-3">
                    <div className="border border-slate-200 p-4 rounded bg-slate-50">
                      <strong className="block text-slate-900 border-b pb-1">1. Architecture Debt:</strong>
                      <p className="text-xs text-slate-600 mt-1">Unified state structures block sibling modules. Every feature requires heavy sibling file refactors. Cost of Delay: <strong>4 Weeks</strong>. Priority: <strong>Critical (High Risk)</strong></p>
                    </div>
                    <div className="border border-slate-200 p-4 rounded bg-slate-50">
                      <strong className="block text-slate-900 border-b pb-1">2. Testing Debt:</strong>
                      <p className="text-xs text-slate-600 mt-1">Critical pricing and calculations hooks run inside views without visual unit tests. Cost of Delay: <strong>3 Weeks</strong>. Priority: <strong>Severe (High Risk)</strong></p>
                    </div>
                    <div className="border border-slate-200 p-4 rounded bg-slate-50">
                      <strong className="block text-slate-900 border-b pb-1">3. Code Structure Debt:</strong>
                      <p className="text-xs text-slate-600 mt-1">Giant component helper files exceed 1,500 lines of messy inline functions. Cost of Delay: <strong>2 Weeks</strong>. Priority: <strong>Moderate</strong></p>
                    </div>
                  </div>
                </div>
              )}

              {p.id === 7 && (
                <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
                  <p>
                    The complex layout patterns slow down parent workflow setups. Onboarding a junior frontend hire currently averages 32 productive calendar days of un-focused workspace training before they can push production-level features. 
                    As compile structures grow, local startup setups require massive node engine operations, generating local build failures.
                  </p>
                </div>
              )}

              {p.id === 8 && (
                <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
                  <div className="border border-slate-200 rounded overflow-hidden">
                    <table className="min-w-full divide-y divide-slate-200 text-xs">
                      <thead className="bg-slate-550">
                        <tr>
                          <th className="px-3 py-1.5 text-left font-bold text-slate-700 uppercase">Issue Findings</th>
                          <th className="px-2 py-1.5 text-left font-bold text-slate-700 uppercase">Business Impact</th>
                          <th className="px-2 py-1.5 text-left font-bold text-slate-700 uppercase">Severity</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white text-slate-600">
                        <tr><td className="px-3 py-1.5">1. Circular Dependencies</td><td className="px-2 py-1.5">Causes random production compile failures.</td><td className="px-2 py-1.5 font-bold text-red-650">Critical</td></tr>
                        <tr><td className="px-3 py-1.5">2. Missing Error Boundaries</td><td className="px-2 py-1.5">Single file crashes break the entire panel viewport.</td><td className="px-2 py-1.5 font-bold text-red-650">Critical</td></tr>
                        <tr><td className="px-3 py-1.5">3. Nested Layout Context Loops</td><td className="px-2 py-1.5">Forces massive rendering task delays.</td><td className="px-2 py-1.5 font-bold text-amber-650">Severe</td></tr>
                        <tr><td className="px-3 py-1.5 font-semibold">4. Loose NPM Modules</td><td className="px-2 py-1.5">Security vulnerabilities expose backend.</td><td className="px-2 py-1.5 font-bold text-amber-655">Severe</td></tr>
                        <tr><td className="px-3 py-1.5 font-semibold">5. Blocking CSV parsing</td><td className="px-2 py-1.5 font-normal">Freeze user screen exceeds &gt;2s.</td><td className="px-2 py-1.5 font-bold text-amber-655">Severe</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {p.id === 9 && (
                <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
                  <div className="space-y-4">
                    <div className="border border-slate-200 p-4 rounded">
                      <strong>Month 1 (Days 1–30): Vite Optimization & Performance Quick Wins</strong>
                      <p className="text-xs text-slate-600 mt-1">Focus on bundle-splitting configs, removing un-split Lodash imports, and Husky commit gates.</p>
                    </div>
                    <div className="border border-slate-200 p-4 rounded">
                      <strong>Month 2 (Days 31–60): Global State Decoupling & Modularization</strong>
                      <p className="text-xs text-slate-600 mt-1">Abstract top level context into local Zustand atoms, establish sub-domain folders, react-query API layer.</p>
                    </div>
                    <div className="border border-slate-200 p-4 rounded">
                      <strong>Month 3 (Days 61–90): Vitest Automations & Onboarding playbooks</strong>
                      <p className="text-xs text-slate-600 mt-1">Vitest coverage suites, clean developer guides, automatic gate blocks.</p>
                    </div>
                  </div>
                </div>
              )}

              {p.id === 10 && (
                <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
                  <p className="font-bold">Golden Rules for the CTO:</p>
                  <ul className="list-disc pl-5 text-slate-600 space-y-1.5 text-xs">
                    <li>Enforce atomic state slices first inside setting workflows.</li>
                    <li>Block CI builds with unresolved critical security vulnerabilities.</li>
                    <li>Provide quarterly refactoring sprints under isolated product schedules.</li>
                  </ul>
                  <div className="bg-slate-50 p-4 border border-slate-200 rounded mt-4 text-xs font-mono">
                    <strong>Business Benefits Outcome:</strong> Reduced technical debt liability, stable paint latencies, 2X development velocity.
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
