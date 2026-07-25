'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How does LeadDesk Mini handle spam and bot submissions?',
      answer:
        'LeadDesk Mini uses multi-layered protection combining client-side Zod validation, an invisible honeypot field that deceives automated bots, and server-side rate limiting per IP.',
    },
    {
      question: 'Can I filter leads by status and budget tier in real time?',
      answer:
        'Yes! The admin panel includes instant multi-field search and status filters (New, Contacted, Closed) with zero reload lag thanks to MongoDB text indexes.',
    },
    {
      question: 'Is my lead data stored securely in a real database?',
      answer:
        'All incoming lead submissions are validated and stored persistently in MongoDB Atlas with optimized Mongoose schema indexes and soft-delete capabilities.',
    },
    {
      question: 'How do I access the Admin Dashboard demo?',
      answer:
        'Simply click the "Admin" button in the top navigation or navigate to /admin/login. You can use the automated database seeder to populate sample leads for evaluation.',
    },
    {
      question: 'Is LeadDesk Mini mobile responsive?',
      answer:
        'Absolutely. The entire application—including the landing page, intake modal, and admin control table—is optimized for mobile, tablet, and desktop devices.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 relative border-b border-white/10 bg-[#0a0b0d]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4 border border-amber-500/20">
            <HelpCircle className="w-3.5 h-3.5" />
            Knowledge Base
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#f4f3ef] tracking-tight font-display">
            Frequently Asked{' '}
            <span className="font-serif-italic font-normal text-amber-400 font-serif">
              Questions
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 font-sans">
            Everything you need to know about LeadDesk Mini architecture.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="tactile-panel rounded-2xl border border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-inset"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-[#f4f3ef] font-display">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200',
                      isOpen && 'rotate-180 text-amber-400'
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed border-t border-white/10 pt-4 animate-fade-in-up">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
