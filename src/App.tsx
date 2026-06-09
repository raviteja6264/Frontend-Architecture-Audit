import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problems from "./components/Problems";
import Services from "./components/Services";
import Process from "./components/Process";
import Deliverables from "./components/Deliverables";
import WhyWorkWithMe from "./components/WhyWorkWithMe";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Faqs from "./components/Faqs";
import Cta from "./components/Cta";
import Footer from "./components/Footer";
import LeadModal from "./components/LeadModal";
import LeadFunnelAnalytics from "./components/LeadFunnelAnalytics";
import AuditReportViewer from "./components/AuditReportViewer";
import { trackImpression, trackConversion } from "./utils/conversionTracker";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"consultation" | "sample_audit">("consultation");

  const handleOpenConsultation = () => {
    // Open the Google Form directly in a new window/tab instead of opening modal
    window.open("https://forms.gle/mvsSajCo8yvRba219", "_blank", "noopener,noreferrer");
    
    // Log conversion in local funnel tracking
    trackImpression("consultation");
    trackConversion("consultation");
  };

  const handleOpenSample = () => {
    setModalType("sample_audit");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Structural ambient styling gradient */}
      <div className="absolute inset-x-0 top-0 h-[800px] bg-radial-[circle_800px_at_50%_-200px] from-indigo-500/5 via-transparent to-transparent pointer-events-none" />

      {/* Primary Navigation */}
      <Navbar
        onOpenConsultation={handleOpenConsultation}
        onOpenSample={handleOpenSample}
      />

      <main className="flex-grow">
        {/* Sections */}
        <Hero
          onOpenConsultation={handleOpenConsultation}
          onOpenSample={handleOpenSample}
        />
        
        <Problems />
        
        <Services />
        
        <Process />
        
        <Deliverables />
        
        {/* Interactive 10-Page Premium Audit Report Template */}
        <AuditReportViewer />
        
        <WhyWorkWithMe />
        
        <Pricing onOpenConsultation={handleOpenConsultation} />
        
        <Testimonials />
        
        <Faqs />
        
        <Cta
          onOpenConsultation={handleOpenConsultation}
          onOpenSample={handleOpenSample}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenConsultation={handleOpenConsultation}
        onOpenSample={handleOpenSample}
      />

      {/* High Conversion Lead Capture Dialog */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialType={modalType}
      />

      {/* Live Conversion Funnel Tracking Overlay */}
      <LeadFunnelAnalytics />
    </div>
  );
}

