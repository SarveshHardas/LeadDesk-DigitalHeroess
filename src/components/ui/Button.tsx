import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b0d] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none tracking-tight';

    const variants = {
      primary:
        'bg-[#d97706] hover:bg-[#f59e0b] text-white shadow-md shadow-amber-950/40 border border-amber-500/40 hover:shadow-amber-900/30',
      secondary:
        'bg-[#191c22] hover:bg-[#232732] text-[#f4f3ef] border border-white/10 shadow-sm',
      ghost:
        'bg-transparent hover:bg-white/5 text-slate-300 hover:text-white',
      destructive:
        'bg-rose-950/60 hover:bg-rose-900/80 text-rose-200 border border-rose-800/40 shadow-sm',
      outline:
        'bg-transparent hover:bg-amber-500/10 text-amber-400 border border-amber-600/30 hover:border-amber-500/60',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 h-8 font-semibold',
      md: 'text-sm px-4 py-2 gap-2 h-10 font-semibold',
      lg: 'text-base px-6 py-3 gap-2.5 h-12 font-bold',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
