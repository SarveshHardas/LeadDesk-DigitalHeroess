'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Menu, X, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenLeadModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLeadModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 max-w-6xl w-[calc(100%-2rem)]">
      <div className="tactile-panel rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between border border-white/10 shadow-2xl bg-[#121418]/85 backdrop-blur-2xl">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group focus:outline-none rounded-full px-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#d97706] to-[#f59e0b] flex items-center justify-center shadow-md shadow-amber-950/40 group-hover:scale-105 transition-transform duration-200">
            <span className="font-mono font-black text-xs text-white">LD</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-[#f4f3ef] tracking-tight font-display">
              LeadDesk
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 font-mono border border-amber-500/20 font-semibold uppercase">
              Mini
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-wide text-slate-300">
          <a href="#features" className="hover:text-white transition-colors duration-150">
            Features
          </a>
          <a href="#benefits" className="hover:text-white transition-colors duration-150">
            Benefits
          </a>
          <a href="#workflow" className="hover:text-white transition-colors duration-150">
            Workflow
          </a>
          <a href="#faq" className="hover:text-white transition-colors duration-150">
            FAQ
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/admin/login">
            <Button variant="ghost" size="sm" leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}>
              Admin
            </Button>
          </Link>
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenLeadModal}
            rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
            className="rounded-full px-4"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 tactile-panel rounded-2xl p-5 border border-white/10 flex flex-col gap-4 animate-scale-up bg-[#121418]/95 shadow-2xl">
          <nav className="flex flex-col gap-2 text-sm font-medium text-slate-300">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 text-slate-200"
            >
              Features
            </a>
            <a
              href="#benefits"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 text-slate-200"
            >
              Benefits
            </a>
            <a
              href="#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 text-slate-200"
            >
              Workflow
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 text-slate-200"
            >
              FAQ
            </a>
          </nav>
          <div className="flex flex-col gap-2 pt-3 border-t border-white/10">
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
              rightIcon={<ArrowUpRight className="w-4 h-4" />}
            >
              Get Started Free
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
