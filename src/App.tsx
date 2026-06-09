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
import BookingSection from "./components/BookingSection";
import Cta from "./components/Cta";
import Footer from "./components/Footer";
import LeadModal from "./components/LeadModal";
import LeadFunnelAnalytics from "./components/LeadFunnelAnalytics";
import AuditReportViewer from "./components/AuditReportViewer";
import EngineeringChecklists from "./components/EngineeringChecklists";
import CaseStudies from "./components/CaseStudies";
import ShareWidget from "./components/ShareWidget";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import SkeletonLoader from "./components/SkeletonLoader";
import Breadcrumbs from "./components/Breadcrumbs";
import ExitIntentModal from "./components/ExitIntentModal";
import { trackImpression, trackConversion } from "./utils/conversionTracker";

export default function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"consultation" | "sample_audit">("consultation");

  const handleOpenConsultation = () => {
    // Smooth scroll down to the dedicated integrated BookingSection in the DOM
    const element = document.getElementById("scheduling-booking-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    
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

  if (isInitializing) {
    return <SkeletonLoader onComplete={() => setIsInitializing(false)} />;
  }

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
        {/* Semantic Breadcrumbs for SEO & Tech Discovery */}
        <Breadcrumbs />

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
        
        {/* Client Case Studies with Interactive Carousel & Metrics */}
        <CaseStudies />
        
        {/* Interactive Developer Playbooks & Downloadable Checklists Hub */}
        <EngineeringChecklists />
        
        <WhyWorkWithMe />
        
        <Pricing onOpenConsultation={handleOpenConsultation} />
        
        <Testimonials />
        
        <Faqs />
        
        {/* Dedicated Integrated Calendly Booking Hub */}
        <BookingSection />
        
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

      {/* Floating Referral / Share Widget */}
      <ShareWidget />

      {/* Exit Intent Lead Capture Recovery System */}
      <ExitIntentModal />

      {/* Interactive Power-User Keyboard Navigation Console HUD */}
      <KeyboardShortcuts />
    </div>
  );
}

