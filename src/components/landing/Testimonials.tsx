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
    <section className="py-24 relative border-b border-white/10 bg-[#0a0b0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-1 text-amber-400 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#f4f3ef] tracking-tight font-display">
            Validated By High-Growth{' '}
            <span className="font-serif-italic font-normal text-amber-400 font-serif">
              Sales Leaders
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 font-sans">
            See how modern SaaS and agency teams eliminate lead drop-off using LeadDesk Mini.
          </p>
        </div>

        {/* Magazine Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <Card key={index} className="tactile-card p-8 flex flex-col justify-between border border-white/10">
              <CardContent className="p-0">
                <Quote className="w-8 h-8 text-amber-500/30 mb-4" />
                <p className="text-sm text-slate-300 font-sans leading-relaxed italic mb-8">
                  &quot;{rev.text}&quot;
                </p>
              </CardContent>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center font-bold text-white text-xs shadow-md font-mono">
                  {rev.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#f4f3ef] font-display">{rev.name}</h4>
                  <p className="text-xs text-slate-400">
                    {rev.role} · <span className="text-amber-400 font-semibold">{rev.company}</span>
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
