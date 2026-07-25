import React from 'react';
import { Card } from '@/components/ui/Card';
import { LeadMetrics } from '@/types/lead';
import { Users, Sparkles, PhoneCall, CheckCircle2, TrendingUp, DollarSign } from 'lucide-react';

interface MetricsCardsProps {
  metrics: LeadMetrics | null;
  isLoading?: boolean;
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({ metrics, isLoading }) => {
  const cards = [
    {
      title: 'Total Pipeline Leads',
      value: metrics?.totalLeads ?? 0,
      subtext: 'Active intake records',
      icon: <Users className="w-5 h-5 text-indigo-400" />,
      border: 'border-indigo-500/20',
      gradient: 'from-indigo-500/10 to-transparent',
    },
    {
      title: 'New / Uncontacted',
      value: metrics?.newLeads ?? 0,
      subtext: 'Requires sales action',
      icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
      border: 'border-cyan-500/20',
      gradient: 'from-cyan-500/10 to-transparent',
    },
    {
      title: 'In Contact Pipeline',
      value: metrics?.contactedLeads ?? 0,
      subtext: 'Demos & proposals sent',
      icon: <PhoneCall className="w-5 h-5 text-amber-400" />,
      border: 'border-amber-500/20',
      gradient: 'from-amber-500/10 to-transparent',
    },
    {
      title: 'Closed Deals & Won',
      value: metrics?.closedLeads ?? 0,
      subtext: `${metrics?.conversionRate ?? 0}% Conversion rate`,
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      border: 'border-emerald-500/20',
      gradient: 'from-emerald-500/10 to-transparent',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, idx) => (
        <Card
          key={idx}
          className={`glass-card p-5 border ${card.border} bg-gradient-to-br ${card.gradient} relative overflow-hidden`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{card.title}</span>
            <div className="w-9 h-9 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center">
              {card.icon}
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {isLoading ? '...' : card.value}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">{card.subtext}</p>
        </Card>
      ))}
    </div>
  );
};
