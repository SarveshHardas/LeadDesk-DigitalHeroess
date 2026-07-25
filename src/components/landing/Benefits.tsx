import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Zap, ShieldCheck, BarChart3, Filter, Sparkles } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefitsList = [
    {
      icon: <Zap className="w-6 h-6 text-indigo-400" />,
      title: 'Instant Lead Capture',
      description: 'Capture inbound inquiries seamlessly with client-side & server-side validation that never lets high-intent prospects drop off.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
      title: 'AI & Honeypot Anti-Spam',
      description: 'Filter out bot submissions, temporary disposable emails, and duplicate inquiries before they reach your sales team.',
    },
    {
      icon: <Filter className="w-6 h-6 text-amber-400" />,
      title: 'Actionable Lead Pipeline',
      description: 'Categorize incoming leads into New, Contacted, and Closed states with instant status toggles and zero page refreshes.',
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
      title: 'Real-Time ROI Analytics',
      description: 'Track conversion velocity, total deal pipeline value, and channel performance through a streamlined executive dashboard.',
    },
  ];

  return (
    <section id="benefits" className="py-20 relative border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            Built For Growth Teams
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            Everything You Need To Scale Your Lead Pipeline
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4 leading-relaxed">
            Eliminate manual spreadsheet management and replace it with a modern lead management engine built for maximum conversion speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitsList.map((item, idx) => (
            <Card key={idx} className="glass-card hover:translate-y-[-4px] transition-all duration-200">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-2 shadow-inner">
                  {item.icon}
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-2">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
