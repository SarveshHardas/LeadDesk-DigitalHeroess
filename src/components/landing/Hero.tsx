'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';

interface HeroProps {
  onOpenLeadModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenLeadModal }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-medium mb-6 shadow-inner animate-fade-in">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Next-Gen CRM & Lead Intelligence Platform</span>
            <span className="hidden sm:inline-block text-slate-500">|</span>
            <span className="hidden sm:inline-block text-slate-300 font-semibold">Zero Pipeline Waste</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-100 tracking-tight leading-[1.1] mb-6">
            Capture, Qualify & Convert{' '}
            <span className="text-gradient-primary">High-Value Leads</span> 3x Faster
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-8">
            LeadDesk Mini simplifies client intake, automates spam filtering, and equips sales teams with real-time lead analytics in one intuitive dashboard.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
            <Button
              variant="primary"
              size="lg"
              onClick={onOpenLeadModal}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto text-base font-semibold shadow-xl shadow-indigo-600/30"
            >
              Start Free Trial
            </Button>
            <a href="#workflow" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                leftIcon={<Zap className="w-5 h-5 text-indigo-400" />}
                className="w-full sm:w-auto text-base"
              >
                Explore Live Demo
              </Button>
            </a>
          </div>

          {/* Social Proof & Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-12 pt-8 border-t border-slate-800/80 w-full max-w-3xl">
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-1">
                <span>99.8%</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-xs text-slate-400 mt-1">Lead Accuracy Rate</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-1">
                <span>&lt; 50ms</span>
                <Zap className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="text-xs text-slate-400 mt-1">Intake Latency</span>
            </div>
            <div className="col-span-2 sm:col-span-1 flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-1">
                <span>500+</span>
                <Users className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-xs text-slate-400 mt-1">Agencies & SaaS Teams</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive App Mockup Frame */}
        <div className="mt-14 relative max-w-5xl mx-auto rounded-2xl glass-panel p-2.5 sm:p-4 border border-white/10 shadow-2xl overflow-hidden group">
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 bg-slate-950/60 rounded-t-xl mb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-400">leaddesk-mini.app/admin/overview</span>
            </div>
            <Badge variant="status" status="New" showDot>
              Live Lead Sync Active
            </Badge>
          </div>

          <div className="bg-slate-950/80 rounded-xl p-4 sm:p-6 border border-slate-800/60 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Lead Preview Item 1 */}
            <div className="p-4 rounded-lg glass-card border border-slate-800 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Acme Corp Enterprise</span>
                <Badge variant="status" status="New">New</Badge>
              </div>
              <span className="text-xs text-slate-400">budget: $25k+</span>
              <p className="text-xs text-slate-300 line-clamp-2">&quot;Looking for an omnichannel CRM migration for our sales pipeline...&quot;</p>
              <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-800/60 flex items-center justify-between">
                <span>Verified lead</span>
                <span>2 mins ago</span>
              </div>
            </div>

            {/* Lead Preview Item 2 */}
            <div className="p-4 rounded-lg glass-card border border-slate-800 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">HyperGrowth Labs</span>
                <Badge variant="status" status="Contacted">Contacted</Badge>
              </div>
              <span className="text-xs text-slate-400">budget: $10k-$25k</span>
              <p className="text-xs text-slate-300 line-clamp-2">&quot;Interested in custom API hooks &amp; automated client onboarding...&quot;</p>
              <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-800/60 flex items-center justify-between">
                <span>Demo Scheduled</span>
                <span>1 hour ago</span>
              </div>
            </div>

            {/* Lead Preview Item 3 */}
            <div className="p-4 rounded-lg glass-card border border-slate-800 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Zenith Studio</span>
                <Badge variant="status" status="Closed">Closed</Badge>
              </div>
              <span className="text-xs text-slate-400">budget: $5k-$10k</span>
              <p className="text-xs text-slate-300 line-clamp-2">&quot;Contract signed! Ready for deployment next Monday.&quot;</p>
              <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-800/60 flex items-center justify-between">
                <span>Won $12,500</span>
                <span>Yesterday</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
