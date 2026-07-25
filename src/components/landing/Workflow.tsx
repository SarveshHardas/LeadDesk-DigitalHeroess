import React from 'react';
import { Send, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const Workflow: React.FC = () => {
  const steps = [
    {
      step: 'STEP 01',
      title: 'Prospect Submits Intake Data',
      description: 'Your potential client enters their requirements, contact info, and budget tier ($1k to $25k+) through your custom intake modal or embedded form.',
      icon: <Send className="w-5 h-5 text-amber-400" />,
      accent: 'border-amber-500/20 bg-amber-500/10',
    },
    {
      step: 'STEP 02',
      title: 'Zod & Honeypot Anti-Spam Shield',
      description: 'System automatically validates inputs, checks rate limits, and uses invisible honeypot parameters to filter out bot spam and duplicate leads.',
      icon: <ShieldAlert className="w-5 h-5 text-cyan-400" />,
      accent: 'border-cyan-500/20 bg-cyan-500/10',
    },
    {
      step: 'STEP 03',
      title: 'Admin Triage & Optimistic Conversion',
      description: 'Sales managers review incoming records in the protected admin panel, filter by budget, and toggle status to Closed with zero latency.',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      accent: 'border-emerald-500/20 bg-emerald-500/10',
    },
  ];

  return (
    <section id="workflow" className="py-24 relative border-b border-white/10 bg-[#0a0b0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
            Pipeline Workflow
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#f4f3ef] tracking-tight font-display mt-4">
            From Prospect Form To Closed Contract In{' '}
            <span className="font-serif-italic font-normal text-amber-400 font-serif">
              3 Steps
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 font-sans max-w-xl mx-auto">
            A frictionless pipeline workflow designed for high-conversion agencies and B2B SaaS teams.
          </p>
        </div>

        {/* Timeline Visual Rhythm Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => (
            <div
              key={index}
              className="tactile-card p-8 rounded-2xl border border-white/10 flex flex-col justify-between relative overflow-hidden group hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-mono font-bold text-slate-400 tracking-wider">
                  {item.step}
                </span>
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${item.accent}`}>
                  {item.icon}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#f4f3ef] font-display mb-3 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
