import React from 'react';
import { Send, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

export const Workflow: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Prospect Submits Intake Form',
      description: 'Your lead enters their details, budget range ($1k to $25k+), and project message directly on your landing page.',
      icon: <Send className="w-5 h-5 text-indigo-400" />,
    },
    {
      step: '02',
      title: 'Real-Time Validation & Spam Shield',
      description: 'Zod schemas validate inputs instantly while honeypot logic silently rejects bot spam and duplicate requests.',
      icon: <ShieldAlert className="w-5 h-5 text-cyan-400" />,
    },
    {
      step: '03',
      title: 'Admin Dashboard Intake & Conversion',
      description: 'Sales managers review the lead in the protected admin panel, filter by budget, and toggle status to Closed.',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    },
  ];

  return (
    <section id="workflow" className="py-20 relative border-t border-slate-800/80 bg-slate-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mt-4">
            3 Simple Steps to Streamlined Pipeline Management
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4">
            From initial lead submission to closed contract—LeadDesk Mini powers your entire pipeline workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-2xl border border-slate-800 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-black text-slate-800 group-hover:text-indigo-500/40 transition-colors duration-200">
                  {item.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                  {item.icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
