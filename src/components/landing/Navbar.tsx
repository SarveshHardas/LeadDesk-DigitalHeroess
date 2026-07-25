'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Sparkles, Menu, X, ShieldCheck, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenLeadModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLeadModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-100 tracking-tight flex items-center gap-1.5">
              LeadDesk <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-mono border border-indigo-500/30">MINI</span>
            </span>
            <span className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">Lead Intelligence CRM</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors duration-150">Features</a>
          <a href="#benefits" className="hover:text-white transition-colors duration-150">Benefits</a>
          <a href="#workflow" className="hover:text-white transition-colors duration-150">Workflow</a>
          <a href="#faq" className="hover:text-white transition-colors duration-150">FAQ</a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/admin/login">
            <Button variant="ghost" size="sm" leftIcon={<ShieldCheck className="w-4 h-4" />}>
              Admin Portal
            </Button>
          </Link>
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenLeadModal}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Get Started Free
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-6 flex flex-col gap-4 animate-fade-in">
          <nav className="flex flex-col gap-3 text-sm font-medium text-slate-300">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-900 text-slate-200"
            >
              Features
            </a>
            <a
              href="#benefits"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-900 text-slate-200"
            >
              Benefits
            </a>
            <a
              href="#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-900 text-slate-200"
            >
              Workflow
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-900 text-slate-200"
            >
              FAQ
            </a>
          </nav>
          <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
            <Link href="/admin/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" fullWidth leftIcon={<ShieldCheck className="w-4 h-4" />}>
                Admin Portal
              </Button>
            </Link>
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadModal();
              }}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Get Started Free
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
