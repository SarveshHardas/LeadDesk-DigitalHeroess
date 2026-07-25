import React from 'react';
import { Zap, ShieldCheck, BarChart3, Filter, Sparkles } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefitsList = [
    {
      num: '01',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: 'Instant Lead Capture Engine',
      description: 'Streamlined intake validation that records client inquiries with zero drop-off and sub-15ms serverless processing.',
      span: 'md:col-span-7',
    },
    {
      num: '02',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: 'Honeypot Anti-Spam Shield',
      description: 'Deceives automated web bots and eliminates temporary email spam before it ever reaches your sales inbox.',
      span: 'md:col-span-5',
    },
    {
      num: '03',
      icon: <Filter className="w-5 h-5 text-cyan-400" />,
      title: 'Actionable Pipeline Triage',
      description: 'Categorize inbound leads into New, Contacted, and Closed states with instant status toggles and zero page reloads.',
      span: 'md:col-span-5',
    },
    {
      num: '04',
      icon: <BarChart3 className="w-5 h-5 text-amber-400" />,
      title: 'Real-Time Executive Analytics',
      description: 'Track conversion velocity, pipeline deal value, and lead volume through a clean, single-screen control dashboard.',
      span: 'md:col-span-7',
    },
  ];

  return (
    <section id="benefits" className="py-24 relative border-b border-white/10 bg-[#0a0b0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Core Capabilities
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#f4f3ef] tracking-tight font-display">
              Engineered For High-Growth Pipeline{' '}
              <span className="font-serif-italic font-normal text-amber-400 font-serif">
                Performance
              </span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md font-sans leading-relaxed">
            Replace manual spreadsheets and noisy inbox inquiries with a purpose-built lead intelligence engine.
          </p>
        </div>

        {/* Asymmetrical Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {benefitsList.map((item, idx) => (
            <div
              key={idx}
              className={`${item.span} tactile-card p-8 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all duration-200 group`}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-2xl font-black text-slate-400 group-hover:text-amber-400 transition-colors">
                  {item.num}
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#121418] border border-white/10 flex items-center justify-center">
                  {item.icon}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#f4f3ef] tracking-tight font-display mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
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
