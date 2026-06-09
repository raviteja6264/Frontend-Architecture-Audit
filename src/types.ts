export interface ProblemCard {
  id: string;
  title: string;
  symptom: string;
  impactTitle: string;
  businessImpact: string;
}

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  benefits: string[];
  outcomes: string[];
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface DeliverableItem {
  id: string;
  title: string;
  iconName: string;
  tagline: string;
  details: string;
  exampleDeliverable: string;
  badge: string;
  format: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  metricsSolved: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  frequency: string;
  description: string;
  timeline: string;
  isPopular: boolean;
  features: string[];
  ctaText: string;
  idealFor: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface LeadFormInput {
  name: string;
  email: string;
  company: string;
  role: string;
  teamSize: string;
  challenges: string[];
  message?: string;
  referral?: string;
}
