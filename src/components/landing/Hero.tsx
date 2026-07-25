'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowUpRight, Layers } from 'lucide-react';

interface HeroProps {
  onOpenLeadModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenLeadModal }) => {
  return (
    <>
      <section className="relative overflow-hidden min-h-screen flex items-center justify-center pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8 flex flex-col items-start text-left">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-[#f4f3ef] tracking-tight leading-[1.05] font-display">
                Capture &amp; Qualify{' '}
                <span className="font-serif-italic font-normal text-amber-glow font-serif">
                  High-Intent
                </span>{' '}
                Leads Without Pipeline Noise.
              </h1>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between gap-6">
              <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
                Automated intake validation, honeypot spam shield, and real-time MongoDB pipeline analytics built for growth teams.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
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
        </div>
      </section>

      <section className="py-16 sm:py-24 relative border-b border-white/10 bg-[#0a0b0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative rounded-2xl bg-[#121418] p-4 sm:p-6 border border-white/10 shadow-2xl overflow-hidden group">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
    </>
  );
};
