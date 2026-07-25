import React from 'react';
import { cn } from '@/lib/utils';
import { LeadStatus } from '@/types/lead';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'status' | 'outline' | 'ghost';
  status?: LeadStatus;
  showDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  status,
  showDot = true,
  children,
  ...props
}) => {
  if (variant === 'status' && status) {
    const statusStyles: Record<LeadStatus, { bg: string; text: string; border: string; dot: string }> = {
      New: {
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        border: 'border-amber-500/25',
        dot: 'bg-amber-400',
      },
      Contacted: {
        bg: 'bg-[#222630]',
        text: 'text-slate-300',
        border: 'border-slate-700/60',
        dot: 'bg-slate-400',
      },
      Closed: {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        border: 'border-emerald-500/25',
        dot: 'bg-emerald-400',
      },
    };

    const style = statusStyles[status];

    return (
      <div
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border transition-colors select-none font-mono',
          style.bg,
          style.text,
          style.border,
          className
        )}
        {...props}
      >
        {showDot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0 animate-pulse', style.dot)} />}
        <span>{children || status}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide uppercase select-none font-mono',
        variant === 'default' && 'bg-amber-500/10 text-amber-300 border border-amber-500/20',
        variant === 'outline' && 'bg-transparent text-slate-300 border border-slate-700/60',
        variant === 'ghost' && 'bg-[#191c22] text-slate-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
