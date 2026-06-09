import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ClipboardList, Download, Mail, User, Building2, CheckCircle2, 
  ArrowRight, ShieldCheck, Zap, Cpu, CalendarClock, Eye, Sparkles
} from "lucide-react";
import { trackConversion, trackImpression } from "../utils/conversionTracker";

interface ChecklistItem {
  id: string;
  title: string;
  category: "Performance" | "Architecture" | "CI/CD & DevOps";
  description: string;
  bulletPoints: string[];
  readingTime: string;
  impactLevel: "Critically High" | "High" | "Medium-High";
  icon: typeof Cpu | typeof ShieldCheck | typeof Zap;
  downloadFilename: string;
  fileContent: string;
}

const CHECKLISTS: ChecklistItem[] = [
  {
    id: "perf-opt",
    title: "Performance Optimization Checklist",
    category: "Performance",
    description: "A 30-point roadmap to achieve under 100ms Interaction to Next Paint (INP) and sub-1s Largest Contentful Paint (LCP) for enterprise React dashboard setups.",
    icon: Zap,
    readingTime: "8 min read",
    impactLevel: "Critically High",
    downloadFilename: "React_Performance_Optimization_Roadmap.md",
    bulletPoints: [
      "Isolate high-frequency React context state propagations with selective trigger selectors.",
      "Implement route-level dynamic bundle-splitting configurations via lazy components.",
      "Establish strict CLS mitigations by assigning intrinsic sizing bounds to complex modules.",
      "Audit bundle dependencies with Rollup Analyzer to keep cold initial load packages <250KB.",
      "Leverage CSS 'content-visibility: auto' and list virtualization libraries on long charts."
    ],
    fileContent: `# PRODUCTION GUIDE: REACT PERFORMANCE & CWV OPTIMIZATION
======================================================
Prepared by: Raviteja M (Frontend Architect)
Target Metrics: LCP < 1.2s | INP < 100ms | CLS = 0.0

This professional playbook contains the precise architectural constraints verified across high-scale enterprise SaaS setups. Implement these steps systematically.

## PHASE 1: BUNDLE SIZE & LOAD GATEWAYS
[ ] Configure Route-Level Code Splitting:
    - Never import page layouts statically in the primary index router.
    - Wrap route bounds in 'React.lazy()' and dynamic import blocks.
    - Setup custom suspense state fallbacks with pre-calculated skeletal containers.
[ ] Establish Rollup Bundle Size Thresholds:
    - Configure bundler settings in 'vite.config.ts' with chunks limit of 500kb.
    - Integrate visualizer plugins to surface duplicated node modules.
    - Force dynamic imports for auxiliary analytics and heavy data tables.
[ ] Asset Optimization Policy:
    - Implement WebP/AVIF formats instead of raw PNG formats.
    - Inject pre-connect links in header for premium web fonts.

## PHASE 2: TREE RENDERING & STATE FLOW
[ ] Context Cascade Prevention:
    - Avoid wrapping 'App' in giant monolithic global React Providers.
    - Decouple states into localized Context slices (e.g., Theme, Auth, Filter).
    - Memorize values inside Providers using standard 'useMemo' hook arrays.
[ ] High-Frequency State Offloading:
    - Bind slider controls and keystroke forms to local ref objects or un-controlled nodes.
    - Incorporate event debounce gates for text input and auto-complete filters.
[ ] Virtualize Dense Lists:
    - Integrate virtual dynamic lists for views rendering more than 100 dataset items.

## PHASE 3: INTERACTIVE VELOCITY & INP RE-BALANCING
[ ] Yield Main Thread Execution:
    - Break long scripts into micro-tasks using 'requestIdleCallback' or 'setTimeout(0)'.
    - Defer tracking logs and telemetry dispatchers until page interactivity completes.
[ ] CSS Style Recalculation Defenses:
    - Prevent layout thrashing by reading DOM heights prior to triggering alterations.
    - Utilize transform/opacity CSS animation styles over coordinate transformations.`
  },
  {
    id: "react-arch",
    title: "React Architecture Standards",
    category: "Architecture",
    description: "Production-tested React engineering blueprint defining folder systems, component rules, custom hook bounds, and strict clean code principles.",
    icon: Cpu,
    readingTime: "12 min read",
    impactLevel: "High",
    downloadFilename: "Enterprise_React_Architecture_Blueprint.md",
    bulletPoints: [
      "Apply strict unidirectional folder systems to ensure decoupled codebases.",
      "Separate pure visualization layers from side-effect-heavy state containers.",
      "Limit prop-drilling depth with granular React hooks wrapping and storage structures.",
      "Introduce absolute path configurations inside TS compiler boundaries.",
      "Implement deterministic custom hook wrappers for all server API queries."
    ],
    fileContent: `# SYSTEM SPECIFICATION: ENTERPRISE REACT ARCHITECTURE
======================================================
Prepared by: Raviteja M (Frontend Architect)
Scope: Scalability, Modularity, & Clean Code Principles

Maintain high velocity and code maintainability as frontend teams scale from 3 to 100+ engineers.

## SECTION 1: SYSTEM FILE DIRECTORY DESIGN
1.  /src/components: Pure shared visual modules. No direct database or API side-effects.
2.  /src/hooks: Isolated custom state logic. Each key API query should export wrapped hooks.
3.  /src/lib: Utility hubs, API clients, and telemetry setups.
4.  /src/types: Strictly typed TypeScript models. No inline any mappings allowed.
5.  /src/utils: Pure deterministic helper algorithms.

## SECTION 2: ARCHITECTURAL BOUNDS & DEPENDENCY POLICIES
- Pure UI elements have no knowledge of backend routing or database drivers.
- Ensure props remain transparent, declarative, and thoroughly documented.
- All network operations must pass through centralized REST/GraphQL API controllers.
- Clean component limit: keep any single JSX file below 150 lines. Beyond this, decompose to sub-components.

## SECTION 3: STATE SANITIZATION CODES
- Initialize variables closest to where they are required in the DOM tree.
- Leverage custom hooks to wrap complex state configurations (reduces component cognitive clutter).
- Maintain single sources of truth. Avoid cross-synchronizing states via active 'useEffect' blocks.`
  },
  {
    id: "ci-cd-cache",
    title: "Build Caching & DevOps Playbook",
    category: "CI/CD & DevOps",
    description: "A complete integration guide to configure remote pipelines, dependencies caching, and modern build setups to cut pipeline wait times by 80%.",
    icon: ShieldCheck,
    readingTime: "10 min read",
    impactLevel: "Medium-High",
    downloadFilename: "Frontend_CI_CD_Cache_Playbook.md",
    bulletPoints: [
      "Configure fast Turbo/Nx cache graphs to skip compiling unchanged files.",
      "Synthesize deterministic lock resolution gates inside Docker build pipelines.",
      "Configure cloud CDN static file caching configurations for high-speed loads.",
      "Implement optimized multi-stage container files reducing artifact footfalls below 50MB.",
      "Set up automatic package duplicates checks to avoid bloated load payloads."
    ],
    fileContent: `# DEVOPS GUIDE: LIGHTNING FAST FRONTEND CI/CD PIPELINES
======================================================
Prepared by: Raviteja M (Frontend Architect)
Target Build Time: < 90 Seconds (Zero-Change Pipeline compiles)

Stop waiting for sluggish builds. Modern optimization pipelines transform development loops.

## RULE 1: SMART PIPELINE CACHING
- Define clear build hashes mapping input structures to output compiled artifacts.
- Leverage Turbo/Nx remote caching layers to share build results across developers.
- Configure build caches for '.vite', 'node_modules/.cache', and package manager engines.

## RULE 2: OPTIMIZED DOCKER MULTI-STAGE BUILDS
- Segment layers cleanly. Copy package specifications separately and run install first.
- Only copy source trees in later stages. This ensures local module installation caches remain cold.
- Utilize lightweight Alpine Node runtime builds for production containers.

## RULE 3: STATIC DELIVERY BOUNDARIES
- Deliver index.html with 'Cache-Control: no-store, must-revalidate' (ensures immediate updates).
- Deliver assets with 'Cache-Control: public, max-age=31536000, immutable' for instant loads.
- Ensure gzip/brotli compression algorithms are active across edge routers (nginx / Cloudflare).`
  }
];

export default function EngineeringChecklists() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedChecklist, setSelectedChecklist] = useState<ChecklistItem | null>(null);
  
  // Lead submission form states
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const openDownloadModal = (checklist: ChecklistItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedChecklist(checklist);
    setSuccessId(null);
    trackImpression("sample_audit"); // Track checklist view as a sample audit impression
  };

  const closeDownloadModal = () => {
    setSelectedChecklist(null);
    setEmail("");
    setName("");
    setCompany("");
    setRole("");
    setIsSubmitting(false);
    setSuccessId(null);
  };

  const executeDownload = (item: ChecklistItem) => {
    const blob = new Blob([item.fileContent], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = item.downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Create a nice lead object that immediately links to LeadFunnelAnalytics' localStorage feed
      const timestamp = new Date().toISOString();
      const leadId = "chk_" + Math.random().toString(36).substring(2, 9);
      const newLead = {
        id: leadId,
        type: "sample_audit" as const, // This ensures it integrates nicely into standard statistics
        timestamp,
        contactInfo: {
          name: name,
          email: email,
          company: company || "Self-Employed / Independent",
          phone: "Checklist Download Direct",
          linkedin: role ? `Role: ${role}` : "Not Shared",
          websiteUrl: `Checklist Source: ${selectedChecklist?.title}`
        },
        companyDetails: {
          companySize: "Not Queried",
          industry: "Engineering Checklist Lead"
        },
        engineeringDetails: {
          techStack: [selectedChecklist?.category || "React"],
          frontendTeamSize: "Not Queried"
        },
        challenges: {
          challenges: ["Resource Hub Lead Magnet"],
          biggestChallenge: `Downloaded resource: "${selectedChecklist?.title}"`
        },
        businessImpact: {
          businessImpact: "Checklist Lead",
          architectureRating: 10
        },
        auditInterest: [selectedChecklist?.title || "Manual Download"],
        consultation: {
          preferredMeetingTime: "Checklist Download",
          anythingElse: `Immediate lead magnet access captured for '${selectedChecklist?.title}'`
        }
      };

      try {
        // Save to localized audit leads for unified visual dashboard tracking!
        const existingLeads = JSON.parse(localStorage.getItem("frontend_audit_leads") || "[]");
        existingLeads.push(newLead);
        localStorage.setItem("frontend_audit_leads", JSON.stringify(existingLeads));
        
        // Track the successful conversion in local conversion states
        trackConversion("sample_audit");
      } catch (err) {
        console.error("Failed to sync lead checklist magnet:", err);
      }

      // Complete submission animation states
      setIsSubmitting(false);
      if (selectedChecklist) {
        setSuccessId(selectedChecklist.id);
        executeDownload(selectedChecklist);
      }
    }, 1100);
  };

  return (
    <section id="checklists" className="py-24 relative overflow-hidden bg-slate-950 border-t border-slate-900">
      {/* Background radial effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block Description */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-full font-mono text-[10px] uppercase tracking-wider inline-block mb-3">
            Free Engineering Resources
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-sans mb-4">
            Production-Grade Playbooks
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Gain immediate access to premium engineering standards, code blueprints, and optimization frameworks battle-tested in high-scale SaaS architectures.
          </p>
        </div>

        {/* Checklists Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CHECKLISTS.map((item, index) => {
            const IconComponent = item.icon;
            const isExpanded = expandedId === item.id;

            return (
              <motion.div 
                key={item.id}
                layout="position"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => handleCardClick(item.id)}
                className={`relative group bg-slate-900 border ${
                  isExpanded ? "border-indigo-500/40 shadow-lg shadow-indigo-950/20" : "border-slate-800"
                } hover:border-slate-700/85 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer select-none`}
              >
                {/* Glow layer hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity pointer-events-none duration-500" />

                <div>
                  {/* Category badging */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-[9px] font-bold text-slate-500 bg-slate-950/60 border border-slate-850 px-2 py-0.5 rounded">
                      {item.readingTime}
                    </span>
                  </div>

                  {/* Header Title and Icon */}
                  <div className="flex items-start gap-4 mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-indigo-400 shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-100 font-sans group-hover:text-indigo-400 transition-colors text-base">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-505">
                        <span className="text-slate-500">Impact:</span>
                        <span className="text-emerald-400 font-semibold">{item.impactLevel}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Expanded Features List with Framer Motion Height Transition */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 border-t border-slate-800/80 pt-4 mt-2">
                          <span className="block text-[10px] font-mono font-bold uppercase text-slate-450 tracking-wider mb-2">
                            What's Included:
                          </span>
                          {item.bulletPoints.map((bullet, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-350 leading-relaxed">
                              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-6 flex items-center justify-between pointer-events-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(item.id);
                    }}
                    className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> {isExpanded ? "Hide Preview" : "View Preview"}
                  </button>

                  <button
                    onClick={(e) => openDownloadModal(item, e)}
                    className="flex items-center gap-1.5 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all text-[10px] uppercase tracking-wider cursor-pointer hover:scale-[1.02] shadow-sm active:scale-95"
                  >
                    <Download className="w-3 h-3" /> Get Playbook
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Informative Footer Hook */}
        <div className="mt-12 bg-slate-900/40 border border-slate-850 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-950/50 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
            <div>
              <h4 className="text-slate-200 text-xs font-bold uppercase tracking-wide">
                Need customized architectural benchmarks?
              </h4>
              <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">
                Our free consultation performs custom latency profiling and uncovers deep React pattern anti-patterns tailored entirely to your proprietary software.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const element = document.getElementById("scheduling-booking-section");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="flex items-center gap-1.5 py-2.5 px-5 bg-slate-900 border border-indigo-500/30 hover:bg-slate-850 text-indigo-400 hover:text-white font-bold rounded-xl transition-all text-xs uppercase tracking-wider cursor-pointer"
          >
            Schedule Profile Audit <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* LEAD CAPTURE POPUP MODAL */}
      <AnimatePresence>
        {selectedChecklist && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDownloadModal}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Panel Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-6 sm:p-8 z-10"
            >
              {/* Glowing header accents */}
              <div className="absolute top-0 left-1/2 -translateX-1/2 w-48 h-12 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />

              <div className="relative space-y-5">
                
                {/* Header Close info */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-indigo-400">
                      LEAD MAGNET PORTAL
                    </span>
                    <h3 className="font-bold text-white text-base mt-0.5 uppercase tracking-tight">
                      Verify Corporate Email
                    </h3>
                  </div>
                  <button 
                    onClick={closeDownloadModal}
                    className="p-1 rounded-lg text-slate-500 hover:text-slate-350 transition-colors"
                  >
                    ×
                  </button>
                </div>

                {/* Checklist Summary Card */}
                <div className="p-4 bg-slate-950 border border-slate-850/80 rounded-xl space-y-1">
                  <span className="text-[8px] font-mono font-bold uppercase text-indigo-400 bg-indigo-950/50 border border-indigo-900/30 px-1.5 py-0.5 rounded">
                    Selected Resource
                  </span>
                  <p className="text-xs font-bold text-slate-200 mt-1 leading-normal">
                    {selectedChecklist.title}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Impact Potential: {selectedChecklist.impactLevel} | Size: 45KB Markdown
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {successId === selectedChecklist.id ? (
                    /* Success Screen with custom exit/entry transitions */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -15 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="text-center py-6 space-y-4"
                    >
                      <div className="w-12 h-12 bg-indigo-950/50 border border-indigo-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase">
                          Playbook Download Triggered!
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          The raw Markdown specification has been saved locally as <strong>{selectedChecklist.downloadFilename}</strong>. Please check your browser download tray!
                        </p>
                      </div>
                      <button
                        onClick={closeDownloadModal}
                        className="w-full py-2.5 bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 text-xxs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                      >
                        Return to Resources Hub
                      </button>
                    </motion.div>
                  ) : (
                    /* Form Capture with custom exit/entry transitions */
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-4"
                    >
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wide mb-1">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="e.g., Jane Done"
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-650 focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wide mb-1">
                            Work Email *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="e.g., jane@company.com"
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-650 focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wide mb-1">
                              Company Name
                            </label>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-600" />
                              <input
                                type="text"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                placeholder="e.g., SaaS Inc."
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2.5 text-xs text-slate-100 placeholder:text-slate-650 focus:outline-none focus:border-indigo-500 transition-colors"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wide mb-1">
                              Engineering Role
                            </label>
                            <select
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                            >
                              <option value="">Choose Role</option>
                              <option value="Lead Architect">Lead Architect</option>
                              <option value="Senior Developer">Senior Developer</option>
                              <option value="Engineering Manager">Engineering VP / Director</option>
                              <option value="Product Manager">Product Specialist</option>
                              <option value="Consultant">Independent / Self-employed</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-500 leading-normal bg-slate-950 p-3 rounded-lg border border-slate-850/60">
                        🔒 No Spam Policy: We protect your corporate information strictly under verified NDA guidelines.
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xxs font-mono uppercase tracking-widest transition-all duration-300 shadow-md shadow-indigo-950/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-3.5 h-3.5 border-1.5 border-white/30 border-t-white rounded-full animate-spin" />
                            VERIFYING EMAIL...
                          </>
                        ) : (
                          <>
                            <ClipboardList className="w-3.5 h-3.5" /> ACCESS & SECURE FILE
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
