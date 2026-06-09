import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, CheckCircle, Calendar, Download, Send, Sparkles, Building2, 
  ShieldAlert, Cpu, Phone, Linkedin, Globe, Users, Flame, HelpCircle, 
  MessageSquare, Star, ArrowRight, ShieldCheck, ClipboardCheck
} from "lucide-react";
import { trackImpression, trackConversion } from "../utils/conversionTracker";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType: "consultation" | "sample_audit";
}

export default function LeadModal({ isOpen, onClose, initialType }: LeadModalProps) {
  const [modalType, setModalType] = useState<"consultation" | "sample_audit">(initialType);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // SECTION 1: CONTACT INFORMATION
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  // SECTION 2: COMPANY DETAILS
  const [companySize, setCompanySize] = useState("");
  const [industry, setIndustry] = useState("");

  // SECTION 3: ENGINEERING DETAILS
  const [techStack, setTechStack] = useState<string[]>([]);
  const [frontendTeamSize, setFrontendTeamSize] = useState("");

  // SECTION 4: CHALLENGES
  const [challenges, setChallenges] = useState<string[]>([]);
  const [biggestChallenge, setBiggestChallenge] = useState("");

  // SECTION 5: BUSINESS IMPACT
  const [businessImpact, setBusinessImpact] = useState("");
  const [architectureRating, setArchitectureRating] = useState<number | null>(null);

  // SECTION 6: AUDIT INTEREST
  const [servicesInterest, setServicesInterest] = useState<string[]>([]);

  // SECTION 7: CONSULTATION
  const [preferredMeetingTime, setPreferredMeetingTime] = useState("");
  const [anythingElse, setAnythingElse] = useState("");

  // Sync modal type with props when changed externally
  React.useEffect(() => {
    if (isOpen) {
      setModalType(initialType);
      setIsSuccess(false);
      resetForm();
      // Track impression on open
      trackImpression(initialType);
    }
  }, [isOpen, initialType]);

  const handleTabSwitch = (type: "consultation" | "sample_audit") => {
    if (type === "consultation") {
      window.open("https://forms.gle/mvsSajCo8yvRba219", "_blank", "noopener,noreferrer");
      trackImpression("consultation");
      trackConversion("consultation");
    } else {
      setModalType(type);
      trackImpression(type);
    }
  };

  const resetForm = () => {
    setName("");
    setCompany("");
    setEmail("");
    setPhone("");
    setLinkedin("");
    setWebsiteUrl("");
    setCompanySize("");
    setIndustry("");
    setTechStack([]);
    setFrontendTeamSize("");
    setChallenges([]);
    setBiggestChallenge("");
    setBusinessImpact("");
    setArchitectureRating(null);
    setServicesInterest([]);
    setPreferredMeetingTime("");
    setAnythingElse("");
  };

  const toggleTechStack = (tech: string) => {
    setTechStack(prev => 
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const toggleChallenge = (challenge: string) => {
    setChallenges(prev => 
      prev.includes(challenge) ? prev.filter(c => c !== challenge) : [...prev, challenge]
    );
  };

  const toggleServiceInterest = (service: string) => {
    setServicesInterest(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation for multi-section required fields
    if (modalType === "consultation") {
      if (techStack.length === 0) {
        alert("Please select at least one Frontend Technology Stack option.");
        return;
      }
      if (!companySize) {
        alert("Please select your Company Size.");
        return;
      }
      if (!industry) {
        alert("Please select your Industry.");
        return;
      }
      if (!frontendTeamSize) {
        alert("Please select your Frontend Team Size.");
        return;
      }
      if (!biggestChallenge.trim()) {
        alert("Please tell us about your biggest frontend challenge today.");
        return;
      }
    }

    setIsSubmitting(true);

    // Simulate backend request
    setTimeout(() => {
      const timestamp = new Date().toISOString();
      const submission = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36),
        type: modalType,
        timestamp,
        contactInfo: { name, email, company, phone, linkedin, websiteUrl },
        companyDetails: { companySize, industry },
        engineeringDetails: { techStack, frontendTeamSize },
        challenges: { challenges, biggestChallenge },
        businessImpact: { businessImpact, architectureRating },
        auditInterest: servicesInterest,
        consultation: { preferredMeetingTime, anythingElse }
      };

      // Persist in localStorage
      const existingLeads = JSON.parse(localStorage.getItem("frontend_audit_leads") || "[]");
      existingLeads.push(submission);
      localStorage.setItem("frontend_audit_leads", JSON.stringify(existingLeads));

      // Track successful conversion
      trackConversion(modalType);

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const downloadSampleAudit = () => {
    const reportContent = `=========================================
FRONTEND ARCHITECTURE AUDIT [SAMPLE REPORT]
Consulting Lead Architect: Raviteja M
=========================================

1. EXECUTIVE SUMMARY
We conducted an in-depth audit of the core SaaS Application frontend architecture. 
The codebase exhibits significant component over-coupling, unoptimized state-propagation paths in the React tree, 
and lack of modular package boundaries. Implementing our proposed 90-day roadmap will reduce cold-load bundle sizes 
by 44% and double the velocity of the product engineering team.

2. DETECTED SEVERITIES & ANTI-PATTERNS
   - CRITICAL: App-wide context trigger-cascades (State Over-rehydration)
   - HIGH: Large un-split bundles in the primary user paths (~4.2MB bundle size)
   - MEDIUM: Inconsistent build-tool caching and non-deterministic package boundaries

3. 90-DAY TRANSFORMATION ROADMAP:
   - Phase 1 (Days 1-30): Decouple global state cascades and isolate state chunks.
   - Phase 2 (Days 31-60): Route-level code-splitting, module federation boundaries, and bundle optimization.
   - Phase 3 (Days 61-90): Automated performance gateways, package lint automation, and team standardizations.

Prepared for custom execution with: ${company || "SaaS Enterprise"}
Contact Raviteja M: raviteja.m6666@gmail.com
=========================================`;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `frontend_architecture_audit_sample_${company.toLowerCase().replace(/\s+/g, "_") || "report"}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            id="modal-backdrop"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl z-10 flex flex-col max-h-[95vh] sm:max-h-[90vh]"
            id="modal-container"
          >
            {/* Header background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header Sticky block */}
            <div className="relative border-b border-slate-800/80 p-5 sm:p-6 shrink-0 bg-slate-900/95 backdrop-blur-sm z-20 flex justify-between items-start">
              <div className="pr-8">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-indigo-400">Consultation Form Portal</span>
                <h3 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-tighter mt-1 leading-none">
                  {modalType === "consultation" ? "Free Architecture Consultation" : "Get Sample Audit Document"}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors cursor-pointer"
                aria-label="Close modal"
                id="close-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 space-y-6" id="modal-scrollable-body">
              {!isSuccess && (
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-850 max-w-sm">
                  <button
                    onClick={() => handleTabSwitch("consultation")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                      modalType === "consultation"
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" /> Consultation Form
                  </button>
                  <button
                    onClick={() => handleTabSwitch("sample_audit")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                      modalType === "sample_audit"
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" /> Fast Sample Download
                  </button>
                </div>
              )}

              {/* Success View */}
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                  id="modal-success-screen"
                >
                  <div className="w-16 h-16 rounded-full bg-indigo-950/50 border border-indigo-500/30 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-indigo-400 animate-pulse" />
                  </div>
                  
                  <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight mb-4 max-w-md">
                    Thank You.
                  </h3>
                  
                  <p className="text-slate-350 max-w-lg text-sm leading-relaxed mb-8">
                    We will review your submission and contact you within 24-48 hours regarding your free consultation.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
                    {modalType === "sample_audit" && (
                      <button
                        onClick={downloadSampleAudit}
                        className="flex items-center justify-center gap-2 bg-indigo-650 hover:bg-indigo-550 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all duration-300 w-full cursor-pointer text-xs uppercase tracking-wider"
                        id="download-now-btn"
                      >
                        <Download className="w-4 h-4" /> Download Sample Report
                      </button>
                    )}
                    <button
                      onClick={onClose}
                      className="px-6 py-3.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200 font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors w-full"
                      id="close-success-btn"
                    >
                      Back to Website
                    </button>
                  </div>
                </motion.div>
              ) : modalType === "consultation" ? (
                /* ------------------------------------------------------------
                   STYLISH MULTI-SECTION CONSULTATION QUESTIONNAIRE
                   ------------------------------------------------------------ */
                <form onSubmit={handleSubmit} className="space-y-8" id="lead-consultation-form">
                  
                  {/* Title and Intro */}
                  <div className="bg-slate-950/40 border border-slate-850 p-4 rounded-xl space-y-1">
                    <h4 className="text-xs font-mono font-bold uppercase text-indigo-400">Form Title</h4>
                    <p className="text-sm font-bold text-slate-200">Frontend Architecture & Performance Audit - Free Consultation</p>
                    <div className="h-[1px] bg-slate-850 my-2" />
                    <h4 className="text-xs font-mono font-bold uppercase text-indigo-400">Form Description</h4>
                    <p className="text-xs text-slate-450 leading-relaxed">
                      Thank you for your interest. This free consultation helps identify frontend architecture, performance, scalability, and technical debt challenges in your application. The consultation lasts 20-30 minutes and includes preliminary recommendations.
                    </p>
                  </div>

                  {/* SECTION 1: CONTACT INFORMATION */}
                  <div className="space-y-4 border border-slate-850/80 bg-slate-950/20 p-5 rounded-2xl relative">
                    <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                      <Users className="w-4 h-4 text-indigo-400" />
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">SECTION 1: CONTACT INFORMATION</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name <span className="text-indigo-400">*</span></label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Answer"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                          id="form-fullname"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Company Name <span className="text-indigo-400">*</span></label>
                        <input
                          type="text"
                          required
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Your Answer"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                          id="form-company"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Work Email <span className="text-indigo-400">*</span></label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your Answer"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                          id="form-work-email"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Website URL <span className="text-indigo-400">*</span></label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                          <input
                            type="text"
                            required
                            value={websiteUrl}
                            onChange={(e) => setWebsiteUrl(e.target.value)}
                            placeholder="Your Answer (e.g. https://yourcompany.com)"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-3 text-xs text-slate-200 placeholder:text-slate-650 focus:outline-none focus:border-indigo-500 transition-colors"
                            id="form-website"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                          <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Your Answer"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-3 text-xs text-slate-200 placeholder:text-slate-650 focus:outline-none focus:border-indigo-500 transition-colors"
                            id="form-phone"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">LinkedIn Profile</label>
                        <div className="relative">
                          <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                          <input
                            type="text"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            placeholder="Your Answer"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-3 text-xs text-slate-200 placeholder:text-slate-650 focus:outline-none focus:border-indigo-500 transition-colors"
                            id="form-linkedin"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: COMPANY DETAILS */}
                  <div className="space-y-4 border border-slate-850/80 bg-slate-950/20 p-5 rounded-2xl relative">
                    <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                      <Building2 className="w-4 h-4 text-indigo-400" />
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">SECTION 2: COMPANY DETAILS</h4>
                    </div>

                    <div>
                      <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Company Size <span className="text-indigo-400">*</span></span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {[
                          "1-10 Employees",
                          "11-50 Employees",
                          "51-200 Employees",
                          "201-1000 Employees",
                          "1,000+ Employees"
                        ].map((choice) => (
                          <button
                            key={choice}
                            type="button"
                            onClick={() => setCompanySize(choice)}
                            className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs cursor-pointer transition-all ${
                              companySize === choice 
                                ? "bg-indigo-650/40 border-indigo-500 text-white shadow-md shadow-indigo-500/5 font-semibold"
                                : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                            }`}
                          >
                            <span>{choice}</span>
                            <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                              companySize === choice ? "border-indigo-400 bg-indigo-550" : "border-slate-700 bg-slate-900"
                            }`}>
                              {companySize === choice && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Industry <span className="text-indigo-400">*</span></label>
                      <select
                        required
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                        id="form-industry"
                      >
                        <option value="">-- Choose Industry --</option>
                        <option value="SaaS">SaaS</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="FinTech">FinTech</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Enterprise Software">Enterprise Software</option>
                        <option value="Agency">Agency</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* SECTION 3: ENGINEERING DETAILS */}
                  <div className="space-y-4 border border-slate-850/80 bg-slate-950/20 p-5 rounded-2xl relative">
                    <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                      <Cpu className="w-4 h-4 text-indigo-400" />
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">SECTION 3: ENGINEERING DETAILS</h4>
                    </div>

                    <div>
                      <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Frontend Technology Stack <span className="text-indigo-400">*</span></span>
                      <p className="text-[10px] text-slate-500 mb-2">Select all that apply:</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {["React", "Angular", "Vue", "Next.js", "TypeScript", "JavaScript", "Other"].map((tech) => {
                          const isSelected = techStack.includes(tech);
                          return (
                            <button
                              key={tech}
                              type="button"
                              onClick={() => toggleTechStack(tech)}
                              className={`flex items-center gap-2 p-3 rounded-xl border text-left text-xs cursor-pointer transition-all ${
                                isSelected 
                                  ? "bg-indigo-650/40 border-indigo-500 text-white shadow-md shadow-indigo-500/5 font-semibold"
                                  : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                              }`}
                            >
                              <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                                isSelected ? "border-indigo-400 bg-indigo-550 text-white" : "border-slate-700 bg-slate-900"
                              }`}>
                                {isSelected && <span className="text-[8px] font-bold">✓</span>}
                              </div>
                              <span>{tech}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Approximate Frontend Team Size <span className="text-indigo-400">*</span></span>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {["1-2", "3-5", "6-10", "11-20", "20+"].map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setFrontendTeamSize(size)}
                            className={`flex items-center justify-between p-3 rounded-xl border text-center text-xs cursor-pointer transition-all ${
                              frontendTeamSize === size 
                                ? "bg-indigo-650/40 border-indigo-500 text-white shadow-md shadow-indigo-500/5 font-semibold"
                                : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                            }`}
                          >
                            <span>{size}</span>
                            <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                              frontendTeamSize === size ? "border-indigo-400 bg-indigo-550" : "border-slate-700 bg-slate-900"
                            }`}>
                              {frontendTeamSize === size && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 4: CHALLENGES */}
                  <div className="space-y-4 border border-slate-850/80 bg-slate-950/20 p-5 rounded-2xl relative">
                    <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                      <ShieldAlert className="w-4 h-4 text-indigo-400" />
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">SECTION 4: CHALLENGES</h4>
                    </div>

                    <div>
                      <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">What challenges are you currently facing?</span>
                      <p className="text-[10px] text-slate-500 mb-2">Select all that apply:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          "Slow Application Performance",
                          "Large Bundle Sizes",
                          "Technical Debt",
                          "Poor Code Maintainability",
                          "Slow Development Velocity",
                          "Scalability Concerns",
                          "Frequent Production Bugs",
                          "Difficult Onboarding",
                          "Architecture Issues",
                          "State Management Issues",
                          "Other"
                        ].map((challenge) => {
                          const isSelected = challenges.includes(challenge);
                          return (
                            <button
                              key={challenge}
                              type="button"
                              onClick={() => toggleChallenge(challenge)}
                              className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs cursor-pointer transition-all ${
                                isSelected 
                                  ? "bg-indigo-650/40 border-indigo-505 text-white shadow-md font-semibold"
                                  : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                              }`}
                            >
                              <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                                isSelected ? "border-indigo-400 bg-indigo-550 text-white" : "border-slate-700 bg-slate-900"
                              }`}>
                                {isSelected && <span className="text-[8px] font-bold">✓</span>}
                              </div>
                              <span className="leading-tight">{challenge}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">What is your biggest frontend challenge today? <span className="text-indigo-400">*</span></label>
                      <textarea
                        required
                        value={biggestChallenge}
                        onChange={(e) => setBiggestChallenge(e.target.value)}
                        rows={3}
                        placeholder="Your Answer"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder:text-slate-650 focus:outline-none focus:border-indigo-500 transition-colors resize-y min-h-[80px]"
                        id="form-biggest-challenge"
                      />
                    </div>
                  </div>

                  {/* SECTION 5: BUSINESS IMPACT */}
                  <div className="space-y-4 border border-slate-850/80 bg-slate-950/20 p-5 rounded-2xl relative">
                    <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                      <Flame className="w-4 h-4 text-indigo-400" />
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">SECTION 5: BUSINESS IMPACT</h4>
                    </div>

                    <div>
                      <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">How often do frontend issues affect business operations?</span>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {["Rarely", "Monthly", "Weekly", "Daily"].map((freq) => (
                          <button
                            key={freq}
                            type="button"
                            onClick={() => setBusinessImpact(freq)}
                            className={`flex items-center justify-between p-3 rounded-xl border text-center text-xs cursor-pointer transition-all ${
                              businessImpact === freq 
                                ? "bg-indigo-650/40 border-indigo-500 text-white shadow-md font-semibold"
                                : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                            }`}
                          >
                            <span>{freq}</span>
                            <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                              businessImpact === freq ? "border-indigo-400 bg-indigo-550" : "border-slate-700 bg-slate-900"
                            }`}>
                              {businessImpact === freq && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">How would you rate your frontend architecture?</span>
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 px-1 mb-1">
                        <span>1 = Poor</span>
                        <span>10 = Excellent</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 justify-between">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setArchitectureRating(rating)}
                            className={`w-9 h-9 rounded-lg border text-xs font-bold flex items-center justify-center cursor-pointer transition-all ${
                              architectureRating === rating 
                                ? "bg-indigo-600 border-indigo-400 text-white shadow-md scale-105"
                                : "bg-slate-950 border-slate-800 text-slate-450 hover:border-slate-700 hover:text-slate-350"
                            }`}
                          >
                            {rating}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 6: AUDIT INTEREST */}
                  <div className="space-y-4 border border-slate-850/80 bg-slate-950/20 p-5 rounded-2xl relative">
                    <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                      <HelpCircle className="w-4 h-4 text-indigo-400" />
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">SECTION 6: AUDIT INTEREST</h4>
                    </div>

                    <div>
                      <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Which service are you interested in?</span>
                      <p className="text-[10px] text-slate-500 mb-2">Select all that apply:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          "Frontend Architecture Audit",
                          "Performance Audit",
                          "Technical Debt Assessment",
                          "Code Quality Review",
                          "Scalability Review",
                          "Not Sure Yet"
                        ].map((srv) => {
                          const isSelected = servicesInterest.includes(srv);
                          return (
                            <button
                              key={srv}
                              type="button"
                              onClick={() => toggleServiceInterest(srv)}
                              className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs cursor-pointer transition-all ${
                                isSelected 
                                  ? "bg-indigo-650/40 border-indigo-500 text-white shadow-md font-semibold"
                                  : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                              }`}
                            >
                              <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                                isSelected ? "border-indigo-400 bg-indigo-550 text-white" : "border-slate-700 bg-slate-900"
                              }`}>
                                {isSelected && <span className="text-[8px] font-bold">✓</span>}
                              </div>
                              <span className="leading-tight">{srv}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 7: CONSULTATION */}
                  <div className="space-y-4 border border-slate-850/80 bg-slate-950/20 p-5 rounded-2xl relative">
                    <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                      <MessageSquare className="w-4 h-4 text-indigo-400" />
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">SECTION 7: CONSULTATION</h4>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Preferred Meeting Time</label>
                      <textarea
                        value={preferredMeetingTime}
                        onChange={(e) => setPreferredMeetingTime(e.target.value)}
                        rows={2}
                        placeholder="Your Answer (e.g. Next Tuesday morning, or provide direct scheduling windows...)"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder:text-slate-650 focus:outline-none focus:border-indigo-500 transition-colors resize-y min-h-[60px]"
                        id="form-meeting-time"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Anything else you'd like to share before the consultation?</label>
                      <textarea
                        value={anythingElse}
                        onChange={(e) => setAnythingElse(e.target.value)}
                        rows={2}
                        placeholder="Your Answer"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder:text-slate-650 focus:outline-none focus:border-indigo-500 transition-colors resize-y min-h-[60px]"
                        id="form-anything-else"
                      />
                    </div>
                  </div>

                  {/* Submit Block */}
                  <div className="pt-4 border-t border-slate-850 space-y-4">
                    <div className="flex items-start gap-2.5 bg-indigo-950/20 border border-indigo-900/30 p-4 rounded-xl text-[11px] text-slate-400 leading-normal">
                      <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5 animate-pulse" />
                      <span>
                        <strong>Confidentiality Guarantee:</strong> Your architectural data and tech responses are fully protected. All reviews work perfectly inside compliant NDA codes.
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-indigo-950/20 transition-all duration-300 w-full disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs uppercase tracking-wider"
                      id="modal-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing Submission...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Save Survey & Book Free Consultation
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* ------------------------------------------------------------
                   STREAMLINED SAMPLE AUDIT REQUEST FORM
                   ------------------------------------------------------------ */
                <form onSubmit={handleSubmit} className="space-y-4" id="lead-sample-form">
                  <div className="bg-slate-950/40 border border-slate-850 p-4 rounded-xl space-y-1">
                    <h4 className="text-xs font-mono font-bold uppercase text-indigo-400">Sample Report Access</h4>
                    <p className="text-xs text-slate-450 leading-relaxed">
                      Please fill out these primary fields to receive and download an executive, hands-on audit mockup. This document outlines exactly how we solve state propagation glitches and restructure React bundlers.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-450 uppercase tracking-wide mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Answer"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-205 placeholder:text-slate-650 focus:outline-none focus:border-indigo-500 transition-colors"
                        id="form-sample-name"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-450 uppercase tracking-wide mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Answer"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-205 placeholder:text-slate-650 focus:outline-none focus:border-indigo-500 transition-colors"
                        id="form-sample-email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-450 uppercase tracking-wide mb-1">Company Name *</label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                        <input
                          type="text"
                          required
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Your Answer"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-205 placeholder:text-slate-650 focus:outline-none focus:border-indigo-500 transition-colors"
                          id="form-sample-company"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-450 uppercase tracking-wide mb-1">Website URL *</label>
                      <div className="relative">
                        <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                        <input
                          type="text"
                          required
                          value={websiteUrl}
                          onChange={(e) => setWebsiteUrl(e.target.value)}
                          placeholder="https://yourcompany.com"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-205 placeholder:text-slate-650 focus:outline-none focus:border-indigo-500 transition-colors"
                          id="form-sample-website"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-450 uppercase tracking-wide mb-1">Primary Tech Stack *</label>
                    <div className="relative">
                      <Cpu className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                      <input
                        type="text"
                        required
                        value={techStack.join(", ")}
                        onChange={(e) => setTechStack(e.target.value.split(",").map(s => s.trim()))}
                        placeholder="e.g. React, Next.js, TypeScript"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-205 placeholder:text-slate-650 focus:outline-none focus:border-indigo-500 transition-colors"
                        id="form-sample-techstack"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-450 uppercase tracking-wide mb-1">Biggest Frontend Pain Point *</label>
                    <textarea
                      required
                      value={biggestChallenge}
                      onChange={(e) => setBiggestChallenge(e.target.value)}
                      rows={2}
                      placeholder="e.g. Build speed is very slow, layout shift bugs, context rendering loops..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-205 placeholder:text-slate-650 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                      id="form-sample-painpoint"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-indigo-950/20 transition-all duration-300 w-full disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs uppercase tracking-wider mt-2"
                    id="modal-sample-submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating Your Mockup...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" /> Request & Download My Audit Sample
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sticky/Fixed Footer Promise */}
            {!isSuccess && (
              <div className="relative border-t border-slate-800/80 p-4 shrink-0 bg-slate-950/40 text-center text-[10px] font-medium text-slate-500">
                🔒 Protected by 256-bit strict confidentiality. NDAs observed by default.
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
