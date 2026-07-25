'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { logoutAction } from '@/actions/auth.actions';
import { LogOut, ExternalLink, Shield } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#121418]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between font-sans">
        {/* Brand Logo & Context */}
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#d97706] to-[#f59e0b] flex items-center justify-center shadow-md">
              <span className="font-mono font-black text-xs text-white">LD</span>
            </div>
            <span className="text-sm font-bold text-[#f4f3ef] tracking-tight flex items-center gap-1.5 font-display">
              LeadDesk <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono border border-amber-500/20 font-bold uppercase">ADMIN</span>
            </span>
          </Link>
          <span className="hidden sm:inline-block text-slate-700">|</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            Protected Route
          </span>
        </div>

        {/* User Session Badge & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" target="_blank">
            <Button variant="ghost" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
              <span className="hidden sm:inline">View Site</span>
            </Button>
          </Link>

          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#191c22] border border-white/10 text-xs font-mono">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-bold">{user?.name || 'Administrator'}</span>
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
