'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { logoutAction } from '@/actions/auth.actions';
import { Sparkles, LogOut, ExternalLink, Shield } from 'lucide-react';
import { UserSession } from '@/types/auth';

interface AdminHeaderProps {
  user?: UserSession | null;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ user }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Context */}
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-slate-100 tracking-tight flex items-center gap-1.5">
              LeadDesk <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-mono">ADMIN</span>
            </span>
          </Link>
          <span className="hidden sm:inline-block text-slate-700">|</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            Protected Portal
          </span>
        </div>

        {/* User Session Badge & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" target="_blank">
            <Button variant="ghost" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
              <span className="hidden sm:inline">View Site</span>
            </Button>
          </Link>

          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-medium">{user?.name || 'Administrator'}</span>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleLogout}
            leftIcon={<LogOut className="w-4 h-4 text-slate-400" />}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
