import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#07080a] pt-16 pb-12 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#d97706] to-[#f59e0b] flex items-center justify-center shadow-md">
                <span className="font-mono font-black text-xs text-white">LD</span>
              </div>
              <span className="text-lg font-bold text-[#f4f3ef] tracking-tight font-display">
                LeadDesk <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono border border-amber-500/20">MINI</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Production-grade lead intelligence and pipeline management platform designed for high-growth SaaS and agency teams.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">Product Navigation</h4>
            <a href="#features" className="text-xs hover:text-white transition-colors">Features</a>
            <a href="#benefits" className="text-xs hover:text-white transition-colors">Benefits</a>
            <a href="#workflow" className="text-xs hover:text-white transition-colors">Workflow</a>
            <a href="#faq" className="text-xs hover:text-white transition-colors">FAQ</a>
          </div>

          {/* Admin & Security */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">Administration</h4>
            <Link href="/admin/login" className="text-xs hover:text-white transition-colors">Admin Portal Login</Link>
            <span className="text-[11px] font-mono text-slate-500">Next.js 16 &amp; MongoDB Atlas</span>
            <span className="text-[11px] font-mono text-slate-500">Zod &amp; Jose JWT Session</span>
          </div>
        </div>

        {/* Bottom Attribution Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p className="text-slate-500">
            © {new Date().getFullYear()} LeadDesk Mini. All rights reserved.
          </p>

          {/* Mandatory Task Requirement Attribution */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121418] border border-white/10">
            <span className="text-slate-400">Built for</span>
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 underline underline-offset-2"
            >
              Digital Heroes Training Task
              <ExternalLink className="w-3 h-3 inline" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
