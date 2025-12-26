'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PainPoints from '@/components/PainPoints';
import ValueProps from '@/components/ValueProps';
import Features from '@/components/Features';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import LeadModal from '@/components/LeadModal';
import { trackPageView } from '@/lib/analytics';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    trackPageView('landing');
  }, []);

  return (
    <main className="min-h-screen">
      <Header />

      <Hero onOpenForm={() => setIsModalOpen(true)} />

      <PainPoints />

      <ValueProps />

      <Features />

      <CTASection onOpenForm={() => setIsModalOpen(true)} />

      <Footer />

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
