import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Sarah Jenkins',
      role: 'Head of Growth',
      company: 'Apex Digital Agency',
      avatar: 'SJ',
      text: 'LeadDesk Mini replaced our messy Notion and Google Sheet intake pipeline. Our response time dropped from 4 hours to under 10 minutes, boosting our deal conversion by 34%.',
    },
    {
      name: 'Marcus Vance',
      role: 'Founder & CEO',
      company: 'Vance Scale Studio',
      avatar: 'MV',
      text: 'The built-in honeypot spam protection alone saved us hundreds of junk bot submissions per week. The admin dashboard is lightning fast and ridiculously clean.',
    },
    {
      name: 'Elena Rostova',
      role: 'VP of Sales',
      company: 'CloudFlow SaaS',
      avatar: 'ER',
      text: 'We set up LeadDesk Mini in less than 15 minutes. The optimistic status toggles make reviewing incoming high-budget leads effortless for our account team.',
    },
  ];

  return (
    <section className="py-20 relative border-t border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-1 text-amber-400 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            Loved By High-Performing Growth Leaders
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4">
            See how modern B2B teams use LeadDesk Mini to eliminate pipeline drop-off.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <Card key={index} className="glass-card p-6 flex flex-col justify-between border border-slate-800">
              <CardContent className="p-0">
                <Quote className="w-8 h-8 text-indigo-500/40 mb-4" />
                <p className="text-sm text-slate-300 leading-relaxed italic mb-6">&quot;{rev.text}&quot;</p>
              </CardContent>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-bold text-white text-sm shadow-md">
                  {rev.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{rev.name}</h4>
                  <p className="text-xs text-slate-400">
                    {rev.role} · <span className="text-indigo-400">{rev.company}</span>
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
