'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowUpRight, Sparkles, TrendingUp, Users, Zap, ShieldCheck, Layers } from 'lucide-react';

interface HeroProps {
  onOpenLeadModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenLeadModal }) => {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-32 border-b border-white/10">
      {/* Background Subtle Grid & Texture */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetrical Editorial Header Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            {/* Top Monospace Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#191c22] border border-white/10 text-xs font-mono text-amber-400 mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>LEADDESK ARCHITECTURE // V2.4</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#f4f3ef] tracking-tight leading-[1.08] font-display">
              Capture &amp; Qualify{' '}
              <span className="font-serif-italic font-normal text-amber-glow font-serif">
                High-Intent
              </span>{' '}
              Leads Without Pipeline Noise.
            </h1>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between gap-6">
            <p className="text-base text-slate-300 font-sans leading-relaxed">
              Automated intake validation, honeypot spam shield, and real-time MongoDB pipeline analytics built for growth teams.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                onClick={onOpenLeadModal}
                rightIcon={<ArrowUpRight className="w-4 h-4" />}
                className="rounded-full font-bold shadow-lg shadow-amber-950/40"
              >
                Request Strategic Consult
              </Button>
              <a href="#workflow" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<Layers className="w-4 h-4 text-amber-400" />}
                  className="rounded-full w-full sm:w-auto"
                >
                  View Workflow
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Tactical Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#121418] border border-white/10 mb-12">
          <div className="p-3 flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Intake Latency</span>
            <span className="text-xl font-extrabold font-mono text-[#f4f3ef] mt-1 flex items-center gap-1">
              &lt; 14ms <Zap className="w-3.5 h-3.5 text-amber-400" />
            </span>
          </div>

          <div className="p-3 flex flex-col border-l border-white/10 pl-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Spam Shield</span>
            <span className="text-xl font-extrabold font-mono text-emerald-400 mt-1 flex items-center gap-1">
              99.9% <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </span>
          </div>

          <div className="p-3 flex flex-col border-l border-white/10 pl-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Conversion Rate</span>
            <span className="text-xl font-extrabold font-mono text-[#f4f3ef] mt-1 flex items-center gap-1">
              +42% <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            </span>
          </div>

          <div className="p-3 flex flex-col border-l border-white/10 pl-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Active Pipeline</span>
            <span className="text-xl font-extrabold font-mono text-amber-400 mt-1 flex items-center gap-1">
              500+ <Users className="w-3.5 h-3.5 text-amber-400" />
            </span>
          </div>
        </div>

        {/* Hero Interactive App Console Frame */}
        <div className="relative rounded-2xl bg-[#121418] p-3 sm:p-5 border border-white/10 shadow-2xl overflow-hidden group">
          {/* Console Header Bar */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-[#0a0b0d] rounded-t-xl mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-400">leaddesk.mini/console/overview</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="status" status="New" showDot>
                Engine Status: Operational
              </Badge>
            </div>
          </div>

          {/* Console Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="p-4 rounded-xl bg-[#191c22] border border-white/10 flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#f4f3ef] font-display">Apex Global Enterprise</span>
                <Badge variant="status" status="New">New Intake</Badge>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">budget: $25k+</span>
              <p className="text-xs text-slate-300 line-clamp-2">
                &quot;Requiring enterprise CRM migration with zero downtime and custom API webhooks...&quot;
              </p>
              <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-slate-400 flex justify-between">
                <span>Verified lead</span>
                <span>2 mins ago</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-4 rounded-xl bg-[#191c22] border border-white/10 flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#f4f3ef] font-display">Vance Scale Studio</span>
                <Badge variant="status" status="Contacted">Contacted</Badge>
              </div>
              <span className="text-xs font-mono text-slate-300 font-bold">budget: $10k-$25k</span>
              <p className="text-xs text-slate-300 line-clamp-2">
                &quot;Evaluating honeypot spam protection &amp; client onboarding features...&quot;
              </p>
              <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-slate-400 flex justify-between">
                <span>Demo Scheduled</span>
                <span>1 hour ago</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-4 rounded-xl bg-[#191c22] border border-white/10 flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#f4f3ef] font-display">Zenith Cloud Labs</span>
                <Badge variant="status" status="Closed">Closed Deal</Badge>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">budget: $5k-$10k</span>
              <p className="text-xs text-slate-300 line-clamp-2">
                &quot;Retainer agreement signed! Live deployment scheduled for next week.&quot;
              </p>
              <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-slate-400 flex justify-between">
                <span>Won $15,000</span>
                <span>Yesterday</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
