import React from 'react';
import { Search, ToggleRight, Trash2, Database, Lock, RefreshCw } from 'lucide-react';

export const Features: React.FC = () => {
  const featureGrid = [
    {
      icon: <Search className="w-5 h-5 text-indigo-400" />,
      title: 'Full-Text Multi-Field Search',
      desc: 'Instantly query lead names, emails, budget tiers, and custom inquiry notes powered by MongoDB compound text indexes.',
    },
    {
      icon: <ToggleRight className="w-5 h-5 text-emerald-400" />,
      title: 'Optimistic Status Mutations',
      desc: 'Update lead status from New to Contacted or Closed with zero latency lag using React optimistic state hooks.',
    },
    {
      icon: <Trash2 className="w-5 h-5 text-rose-400" />,
      title: 'Soft-Delete Data Safety',
      desc: 'Archive unwanted or invalid leads safely with soft-delete flags, preserving audit logs and reporting integrity.',
    },
    {
      icon: <Database className="w-5 h-5 text-cyan-400" />,
      title: 'MongoDB Serverless Connection Pooling',
      desc: 'High-speed database driver architecture optimized for Next.js App Router and serverless deployment targets.',
    },
    {
      icon: <Lock className="w-5 h-5 text-amber-400" />,
      title: 'JWT Session Auth & Route Protection',
      desc: 'Secure admin routes using HTTP-only session cookies and Next.js edge middleware authorization checks.',
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-purple-400" />,
      title: 'Automated Demo Data Seeding',
      desc: 'Populate rich production-style lead data with a single click to test filters, metrics, and workflows instantly.',
    },
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            Engineered For Precision & Performance
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4">
            Every feature in LeadDesk Mini is built to production standards with strict TypeScript, clean architecture, and modern UX design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureGrid.map((feat, index) => (
            <div
              key={index}
              className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">{feat.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
