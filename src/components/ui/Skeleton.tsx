import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  ...props
}) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-slate-800/60 border border-slate-800/40',
        variant === 'text' && 'h-4 w-full rounded',
        variant === 'circular' && 'rounded-full shrink-0',
        variant === 'rectangular' && 'rounded-xl',
        className
      )}
      {...props}
    />
  );
};
