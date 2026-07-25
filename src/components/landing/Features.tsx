import React from 'react';
import { Search, ToggleRight, Trash2, Database, Lock, RefreshCw, ChevronRight } from 'lucide-react';

export const Features: React.FC = () => {
  const featureList = [
    {
      code: 'SYS-01',
      icon: <Search className="w-5 h-5 text-amber-400" />,
      title: 'Full-Text Multi-Field Index Search',
      desc: 'Instant query engine searching lead names, work emails, budget allocations, and notes powered by MongoDB compound text indexes.',
    },
    {
      code: 'SYS-02',
      icon: <ToggleRight className="w-5 h-5 text-emerald-400" />,
      title: 'Optimistic Pipeline State Mutations',
      desc: 'Toggle lead status from New to Contacted or Closed with zero latency lag using React 19 optimistic UI hooks.',
    },
    {
      code: 'SYS-03',
      icon: <Trash2 className="w-5 h-5 text-rose-400" />,
      title: 'Soft-Delete Data Audit Trail',
      desc: 'Archive unwanted or non-converting leads safely with soft-delete flags, maintaining reporting compliance and audit logs.',
    },
    {
      code: 'SYS-04',
      icon: <Database className="w-5 h-5 text-cyan-400" />,
      title: 'MongoDB Serverless Connection Pool',
      desc: 'Driver architecture optimized for Next.js App Router and serverless deployment targets with zero connection leaks.',
    },
    {
      code: 'SYS-05',
      icon: <Lock className="w-5 h-5 text-amber-400" />,
      title: 'Jose JWT Session Security & Edge Middleware',
      desc: 'Secure admin control routes using HTTP-only session cookies and Next.js edge middleware authorization checks.',
    },
    {
      code: 'SYS-06',
      icon: <RefreshCw className="w-5 h-5 text-indigo-400" />,
      title: 'Automated Demo Data Seeder Engine',
      desc: 'Populate rich production-style lead data with a single click to evaluate status filters, metrics, and triage flows.',
    },
  ];

  return (
    <section id="features" className="py-24 relative border-b border-white/10 bg-[#0a0b0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-16">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
            System Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#f4f3ef] tracking-tight font-display mt-4">
            Built For Precision, Speed &amp;{' '}
            <span className="font-serif-italic font-normal text-amber-400 font-serif">
              Scalability
            </span>
          </h2>
        </div>

        {/* Architectural List Composition */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {featureList.map((feat, index) => (
            <div
              key={index}
              className="py-8 px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-[#121418] transition-colors duration-200 group rounded-xl"
            >
              <div className="flex items-center gap-4 min-w-[240px]">
                <span className="text-xs font-mono text-slate-500 group-hover:text-amber-400 transition-colors">
                  [{feat.code}]
                </span>
                <div className="w-10 h-10 rounded-lg bg-[#191c22] border border-white/10 flex items-center justify-center shrink-0">
                  {feat.icon}
                </div>
                <h3 className="text-base font-bold text-[#f4f3ef] font-display group-hover:text-amber-300 transition-colors">
                  {feat.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed max-w-xl">
                {feat.desc}
              </p>

              <div className="hidden md:flex items-center text-slate-500 group-hover:text-amber-400 transition-colors">
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
