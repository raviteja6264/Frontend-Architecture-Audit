import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { FaqItem } from "../types";

export default function Faqs() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const faqs: FaqItem[] = [
    {
      id: "faq-1",
      category: "Process",
      question: "What exactly is a Frontend Architecture Audit?",
      answer: "It is an intensive, expert architectural review of your frontend web application's codebase. Unlike automated generic scanners which only tell you about basic lint rules, this audit investigates state propagation trees, circular import locks, component coupling, bundle payloads, build optimization settings, and team review bottlenecks to provide a custom, human-drafted 90-day action plan."
    },
    {
      id: "faq-2",
      category: "Value",
      question: "My team is highly capable. Why do we need an external consultant?",
      answer: "When you are scaling fast and shipping features daily under pressure, the team naturally develops localized tunnel-vision. An external React expert brings outside industry best-practices and a neutral, un-biased perspective. It helps identify deep-seated systemic leaks (like memory leaks or redundant recheck loops) that your team has simply lived with due to lack of diagnostic bandwidth."
    },
    {
      id: "faq-3",
      category: "Time Commitment",
      question: "How much of my team's time will this diagnostic take?",
      answer: "Very little. I design my process to be low-friction for your developers. I need: (1) A 30-min discovery call, (2) Read-only access to your git repository, and (3) A 90-minute joint review walk-through call on Day 7. Your development engineering loops suffer zero distraction, and they get premium, clear recipes ready for execution."
    },
    {
      id: "faq-4",
      category: "Access",
      question: "Do you need write access to our primary repositories?",
      answer: "No. I require strictly read-only access to your source code repository or an exported ZIP file of your codebase. I do not modify your branches or submit pull requests directly during the audit phase to keep your active workflows 100% secure."
    },
    {
      id: "faq-5",
      category: "Privacy",
      question: "How do you protect our intellectual property and NDA structures?",
      answer: "I treat client IP with highest security diligence. I will execute standard mutual Non-Disclosure Agreements (NDAs) before you grant read access or disclose technical details. Your code never leaves secure sandboxes, and it is never shared, published, or fed into public generative training engines."
    },
    {
      id: "faq-6",
      category: "Stack Scope",
      question: "We use a different stack like Vue or Next.js. Can you audit our app?",
      answer: "I specialize and audit systems written in React, JavaScript, and TypeScript ecosystems (including meta-frameworks like Next.js, Remix, React Native, Vite setup, and standard SPAs). If your system is purely Vue or Angular, please book a Discovery Call first so I can inspect whether I possess the precise domain mastery to deliver un-compromised outcomes."
    },
    {
      id: "faq-7",
      category: "Timeline",
      question: "What is the standard turnaround time, and how fast can we initiate?",
      answer: "Our Starter audit takes 3 business days; our Growth audit takes 7 calendar days. Enterprise audits vary between 10-14 days. Once contracts are signed and NDA/access is cleared, I can typically initiate the audit within 2-3 business days."
    },
    {
      id: "faq-8",
      category: "Slack Support",
      question: "What does the 14 days of direct Slack developer support cover?",
      answer: "During the first 14 days after the Day 7 walkthrough, your development team has an open, direct private Slack channel with me. They can share screen snippets, ask questions as they implement the suggested steps, and receive asynchronous feedback on their refactored code patterns."
    },
    {
      id: "faq-9",
      category: "Fix Execution",
      question: "Do you perform the suggested codebase fixes yourself?",
      answer: "The flat-rate audits focus on diagnostics, architecture drafting, and joint walk-through tutoring. However, if your team lacks immediate bandwidth to implement the recommendations, I offer follow-up 'Remediation Implementation' support where I work as a code architect to pair-program and execute the refactoring directly on your branches."
    },
    {
      id: "faq-10",
      category: "Customization",
      question: "Can we customize the deliverables to cover specific security compliance needs?",
      answer: "Yes, absolutely. If your team is preparing for SOC2 certification, a crucial Series-A financial due diligence round, or a major enterprise client sign-off, we can adapt our audit parameters to focus strictly on payload defense layers and secure third-party package profiles."
    }
  ];

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 border-t border-slate-900 bg-slate-950/80 relative" id="faqs">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/1 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-3">
            <span className="flex items-center gap-1.5 justify-center"><HelpCircle className="w-3.5 h-3.5 text-indigo-400" /> Common Queries</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tighter leading-none">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
            Clear responses answers about deliverables, confidentiality, code access policies, and timelines.
          </p>
        </div>

        {/* FAQs Accordion list */}
        <div className="space-y-4" id="faqs-accordion">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-slate-900 border-indigo-500/30 shadow-md shadow-indigo-500/2"
                    : "bg-slate-950/40 border-slate-900 hover:border-slate-800"
                }`}
              >
                {/* Header line toggle */}
                <button
                  onClick={() => handleToggle(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer select-none"
                  aria-expanded={isOpen}
                  id={`faq-${faq.id}-toggle`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono tracking-wider font-bold text-slate-500 uppercase border border-slate-800 px-2.5 py-0.5 rounded bg-slate-950">
                      {faq.category}
                    </span>
                    <span className="font-semibold text-xs sm:text-sm text-slate-200">
                      {faq.question}
                    </span>
                  </div>
                  <div className="text-slate-500 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Collapsible Answer panel with Framer Motion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-slate-900/60 bg-slate-950/40"
                    >
                      <div className="p-5 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
