'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PainPoints from '@/components/PainPoints';
import ValueProps from '@/components/ValueProps';
import Features from '@/components/Features';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import AssessmentFlow from '@/components/AssessmentFlow';
import { trackPageView } from '@/lib/analytics';

export default function Home() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  useEffect(() => {
    trackPageView('landing');
  }, []);

  return (
    <main className="min-h-screen">
      <Header />

      <Hero onOpenForm={() => setIsAssessmentOpen(true)} />

      <PainPoints />

      <ValueProps />

      <Features />

      <CTASection onOpenForm={() => setIsAssessmentOpen(true)} />

      <Footer />

      <AssessmentFlow
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
      />
    </main>
  );
}
