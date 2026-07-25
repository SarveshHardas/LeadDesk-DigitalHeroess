import React from 'react';
import { Card } from '@/components/ui/Card';
import { LeadMetrics } from '@/types/lead';
import { Users, Sparkles, PhoneCall, CheckCircle2 } from 'lucide-react';

interface MetricsCardsProps {
  metrics: LeadMetrics | null;
  isLoading?: boolean;
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({ metrics, isLoading }) => {
  const cards = [
    {
      title: 'Total Inbound Leads',
      value: metrics?.totalLeads ?? 0,
      subtext: 'Active pipeline records',
      icon: <Users className="w-4 h-4 text-amber-400" />,
      border: 'border-white/10',
    },
    {
      title: 'New / Uncontacted',
      value: metrics?.newLeads ?? 0,
      subtext: 'Requires sales action',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      border: 'border-amber-500/20',
    },
    {
      title: 'In Contact Pipeline',
      value: metrics?.contactedLeads ?? 0,
      subtext: 'Demos & proposals sent',
      icon: <PhoneCall className="w-4 h-4 text-slate-300" />,
      border: 'border-slate-700/60',
    },
    {
      title: 'Closed & Won Deals',
      value: metrics?.closedLeads ?? 0,
      subtext: `${metrics?.conversionRate ?? 0}% Conversion rate`,
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
      border: 'border-emerald-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, idx) => (
        <Card
          key={idx}
          className={`tactile-card p-5 border ${card.border} bg-[#121418] relative overflow-hidden`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">{card.title}</span>
            <div className="w-8 h-8 rounded-lg bg-[#191c22] border border-white/10 flex items-center justify-center">
              {card.icon}
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#f4f3ef] font-mono tracking-tight">
              {isLoading ? '...' : card.value}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-sans">{card.subtext}</p>
        </Card>
      ))}
    </div>
  );
};
