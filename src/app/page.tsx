'use client';

import React, { useState } from 'react';
import { ToastProvider } from '@/components/ui/Toast';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Benefits } from '@/components/landing/Benefits';
import { Features } from '@/components/landing/Features';
import { Workflow } from '@/components/landing/Workflow';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQ } from '@/components/landing/FAQ';
import { LeadFormSection } from '@/components/landing/LeadFormSection';
import { LeadFormModal } from '@/components/landing/LeadFormModal';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
        <Navbar onOpenLeadModal={() => setIsModalOpen(true)} />

        <main className="flex-1">
          <Hero onOpenLeadModal={() => setIsModalOpen(true)} />
          <Benefits />
          <Features />
          <Workflow />
          <Testimonials />
          <FAQ />
          <LeadFormSection />
        </main>

        <Footer />

        <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </ToastProvider>
  );
}
