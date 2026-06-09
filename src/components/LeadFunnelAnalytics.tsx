import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BarChart3, PieChart, TrendingUp, Gauge, RotateCcw, 
  CalendarRange, Zap, Sparkles, ChevronDown, ChevronUp, Trash2, Users, Database
} from "lucide-react";
import { getStats, resetStats, subscribeToStats, trackConversion, trackImpression, ConversionStats } from "../utils/conversionTracker";

export default function LeadFunnelAnalytics() {
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState<ConversionStats>(getStats());
  const [recentLeads, setRecentLeads] = useState<any[]>([]);

  // Reload statistics and recent leads
  const reloadData = () => {
    setStats(getStats());
    try {
      const leads = JSON.parse(localStorage.getItem("frontend_audit_leads") || "[]");
      // Pick last 3 leads, reverse to show newest first
      setRecentLeads(leads.slice(-3).reverse());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    reloadData();
    // Subscribe to custom conversion event
    const unsubscribe = subscribeToStats((updatedStats) => {
      setStats(updatedStats);
      // Also reload the lead objects
      try {
        const leads = JSON.parse(localStorage.getItem("frontend_audit_leads") || "[]");
        setRecentLeads(leads.slice(-3).reverse());
      } catch (e) {
        console.error(e);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all funnel statistics and simulated leads?")) {
      resetStats();
      localStorage.removeItem("frontend_audit_leads");
      reloadData();
    }
  };

  // Live generation of a mock lead for easy simulation
  const handleSimulateLead = () => {
    const mockCompanies = ["Linear Labs", "Vercel Inc", "Stripe Checkout", "Figma Design", "Dub.co", "Supabase Studio"];
    const mockNames = ["Alex Rivera", "Jordan Smith", "Casey Thorne", "Taylor Vance", "Morgan Finch", "Jamie Cruz"];
    const mockEmails = ["alex@linearlabs.sh", "jordan@vercel.com", "casey@stripe.dev", "taylor@figma.com", "morgan@dub.co", "jamie@supabase.co"];
    const mockChallenges = ["Context render-gaps causing layout shifts", "Slow chunk loading on mobile nodes", "Heavy node dependency tree coupling", "State hydration re-renders", "Bundle sizes exceeding 3MB"];

    const rIdx = Math.floor(Math.random() * mockCompanies.length);
    const type = Math.random() > 0.5 ? "consultation" : "sample_audit";

    const timestamp = new Date().toISOString();
    const mockLead = {
      id: "sim_" + Math.random().toString(36).substring(2, 9),
      type,
      timestamp,
      contactInfo: {
        name: mockNames[Math.floor(Math.random() * mockNames.length)],
        email: mockEmails[Math.floor(Math.random() * mockEmails.length)],
        company: mockCompanies[rIdx],
        phone: "+1 (555) 019-" + Math.floor(1000 + Math.random() * 9000),
        linkedin: "linkedin.com/in/simulated",
        websiteUrl: `https://${mockCompanies[rIdx].toLowerCase().replace(/\s+/g, "")}.io`
      },
      companyDetails: {
        companySize: "11-50 Employees",
        industry: "SaaS"
      },
      engineeringDetails: {
        techStack: ["React", "TypeScript", "Next.js"],
        frontendTeamSize: "3-5"
      },
      challenges: {
        challenges: ["Technical Debt", "Slow Application Performance"],
        biggestChallenge: mockChallenges[Math.floor(Math.random() * mockChallenges.length)]
      },
      businessImpact: {
        businessImpact: "Weekly",
        architectureRating: 4
      },
      auditInterest: ["Performance Audit", "Frontend Architecture Audit"],
      consultation: {
        preferredMeetingTime: "Next Wednesday 3 PM",
        anythingElse: "Simulated analytics verify check"
      }
    };

    // Store lead
    const existingLeads = JSON.parse(localStorage.getItem("frontend_audit_leads") || "[]");
    existingLeads.push(mockLead);
    localStorage.setItem("frontend_audit_leads", JSON.stringify(existingLeads));

    // Fast-track conversions
    trackConversion(type);
  };

  // Helper calculation formulas
  const calcRate = (conversions: number, impressions: number) => {
    if (impressions === 0) return "0.0";
    return ((conversions / impressions) * 100).toFixed(1);
  };

  const totalCR = calcRate(stats.conversions, stats.impressions);
  const consultationCR = calcRate(stats.consultationConversions, stats.consultationImpressions);
  const sampleCR = calcRate(stats.sampleConversions, stats.sampleImpressions);

  return (
    <div className="fixed bottom-4 left-4 z-50 font-sans" id="lead-funnel-analytics-tool">
      {/* Small Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-indigo-500/30 text-white rounded-full shadow-lg cursor-pointer transition-all duration-300 group"
        id="analytics-toggle-btn"
      >
        <div className="relative">
          <Database className="w-4 h-4 text-indigo-400" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        </div>
        <span className="text-[10px] uppercase tracking-widest font-bold">
          CR: <span className="text-emerald-400 font-mono">{totalCR}%</span>
        </span>
        {isOpen ? (
          <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
        ) : (
          <ChevronUp className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
        )}
      </button>

      {/* Expanded Metrics Dashboard Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12, x: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12, x: -10 }}
            className="absolute bottom-12 left-0 w-80 sm:w-96 rounded-2xl border border-slate-805 bg-slate-950 p-5 shadow-2xl space-y-4"
            id="analytics-dashboard-panel"
            style={{ border: "1px solid rgba(79, 70, 229, 0.2)" }}
          >
            {/* Header section with telemetry bar */}
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-900">
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-indigo-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Lead Funnel Intel</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <button
                  onClick={handleSimulateLead}
                  title="Inject test lead to test live rates"
                  className="flex items-center gap-1 px-2 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 rounded-md text-[9px] font-bold uppercase tracking-wider cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] transition-all"
                  id="simulate-lead-btn"
                >
                  <Zap className="w-2.5 h-2.5 text-indigo-400 shrink-0" /> Simulation
                </button>
                <button
                  onClick={handleReset}
                  title="Reset metrics"
                  className="p-1 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer rounded"
                  id="reset-analytics-btn"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Overall conversion metrics widget */}
            <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-3.5 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Combined Conversion Rate</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-mono font-black text-white">{totalCR}%</span>
                  <span className="text-[10px] text-emerald-450 flex items-center gap-0.5 font-bold"><TrendingUp className="w-3 h-3" /> Live</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-full border border-indigo-500/20 flex items-center justify-center bg-indigo-950/20 relative">
                <Gauge className="w-6 h-6 text-indigo-400 absolute" />
                {/* Simulated circle stroke mapping */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="28"
                    cy="28"
                    r="22"
                    stroke="rgba(79, 70, 229, 0.1)"
                    strokeWidth="3.5"
                    fill="transparent"
                  />
                  <circle
                    cx="28"
                    cy="28"
                    r="22"
                    stroke="#4f46e5"
                    strokeWidth="3.5"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 22}
                    strokeDashoffset={2 * Math.PI * 22 * (1 - Math.min(Number(totalCR), 100) / 100)}
                  />
                </svg>
              </div>
            </div>

            {/* Section metrics grid */}
            <div className="grid grid-cols-2 gap-2 text-[10px]" id="analytics-sections-grid">
              {/* Consultation Funnel */}
              <div className="bg-slate-900/60 border border-slate-900 p-3 rounded-lg space-y-2">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span className="font-bold text-slate-300 uppercase tracking-wider text-[8px]">Consultations</span>
                </div>
                <div className="grid grid-cols-2 gap-1 font-mono text-[10px] text-slate-400">
                  <div>Views</div>
                  <div className="text-right text-slate-205">{stats.consultationImpressions}</div>
                  <div>Starts</div>
                  <div className="text-right text-slate-205">{stats.consultationConversions}</div>
                </div>
                <div className="pt-1 border-t border-slate-850 flex justify-between font-bold text-white">
                  <span>Conv. %</span>
                  <span className="text-cyan-400 font-mono">{consultationCR}%</span>
                </div>
              </div>

              {/* Sample Audit Funnel */}
              <div className="bg-slate-900/60 border border-slate-900 p-3 rounded-lg space-y-2">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                  <span className="font-bold text-slate-300 uppercase tracking-wider text-[8px]">Sample Audits</span>
                </div>
                <div className="grid grid-cols-2 gap-1 font-mono text-[10px] text-slate-400">
                  <div>Views</div>
                  <div className="text-right text-slate-205">{stats.sampleImpressions}</div>
                  <div>Starts</div>
                  <div className="text-right text-slate-205">{stats.sampleConversions}</div>
                </div>
                <div className="pt-1 border-t border-slate-850 flex justify-between font-bold text-white">
                  <span>Conv. %</span>
                  <span className="text-cyan-400 font-mono">{sampleCR}%</span>
                </div>
              </div>
            </div>

            {/* Recents Leads Feed */}
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Live Funnel Entries ({recentLeads.length})</span>
              {recentLeads.length === 0 ? (
                <div className="text-[10px] text-slate-650 bg-slate-900/20 border border-slate-900/60 rounded-lg p-4 text-center">
                  None detected. Click "Simulation" or submit a lead to trace live conversions.
                </div>
              ) : (
                <div className="space-y-1.5" id="recent-submissions-panel">
                  {recentLeads.map((lead) => {
                    const isConsult = lead.type === "consultation";
                    const isSim = lead.id && lead.id.toString().startsWith("sim_");
                    return (
                      <div
                        key={lead.id}
                        className="bg-slate-900/80 border border-slate-850 rounded-lg p-2 flex items-center justify-between gap-1.5 text-[10px]"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {/* Circle initial placeholder */}
                          <div className="w-6 h-6 rounded-md bg-indigo-950 border border-indigo-500/20 flex items-center justify-center shrink-0 font-display font-bold text-[9px] text-indigo-400 uppercase">
                            {lead.contactInfo.name ? lead.contactInfo.name.charAt(0) : "A"}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-200 truncate leading-tight flex items-center gap-1">
                              {lead.contactInfo.name || "Anonymous"} 
                              {isSim && (
                                <span className="px-1 text-[7px] font-bold bg-violet-950 text-violet-300 border border-violet-800 rounded uppercase">Sim</span>
                              )}
                            </div>
                            <div className="text-[8px] text-slate-500 leading-none truncate">
                              {lead.contactInfo.company || "Enterprise"}
                            </div>
                          </div>
                        </div>

                        {/* Funnel Type Tag badge */}
                        <div className="text-right shrink-0">
                          <span className={`inline-block px-1.5 py-0.5 rounded text-[7px] font-bold uppercase tracking-wider ${
                            isConsult 
                              ? "bg-emerald-950/50 border border-emerald-500/20 text-emerald-400" 
                              : "bg-blue-950/50 border border-blue-500/20 text-blue-400"
                          }`}>
                            {isConsult ? "Consult" : "Sample"}
                          </span>
                          <span className="block text-[7px] text-slate-500 mt-0.5 font-mono">
                            {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer telemetries */}
            <div className="text-[8px] font-mono text-slate-600 flex justify-between pt-1">
              <span>Local Database Persistence: OK</span>
              <span>UTC Context: Active</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
