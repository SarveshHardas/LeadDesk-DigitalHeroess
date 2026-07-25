import React from 'react';
import Link from 'next/link';
import { Sparkles, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-100 tracking-tight">
                LeadDesk <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-mono">MINI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Production-ready lead intelligence and pipeline management platform designed for modern high-growth software and agency teams.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Product Navigation</h4>
            <a href="#features" className="text-sm hover:text-white transition-colors">Features</a>
            <a href="#benefits" className="text-sm hover:text-white transition-colors">Benefits</a>
            <a href="#workflow" className="text-sm hover:text-white transition-colors">Workflow</a>
            <a href="#faq" className="text-sm hover:text-white transition-colors">FAQ</a>
          </div>

          {/* Admin & Security */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Administration</h4>
            <Link href="/admin/login" className="text-sm hover:text-white transition-colors">Admin Dashboard Login</Link>
            <span className="text-xs text-slate-500">Built with Next.js 16 & MongoDB</span>
            <span className="text-xs text-slate-500">Protected by Zod & JWT</span>
          </div>
        </div>

        {/* Bottom Attribution Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500">
            © {new Date().getFullYear()} LeadDesk Mini. All rights reserved.
          </p>

          {/* Mandatory Task Requirement Attribution */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
            <span className="text-slate-400">Built for</span>
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 underline underline-offset-2"
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
