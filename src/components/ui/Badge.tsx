import React from 'react';
import { cn, getStatusBadgeStyle } from '@/lib/utils';
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
    const style = getStatusBadgeStyle(status);
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors select-none',
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
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold select-none',
        variant === 'default' && 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20',
        variant === 'outline' && 'bg-transparent text-slate-300 border border-slate-700',
        variant === 'ghost' && 'bg-slate-800/60 text-slate-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
