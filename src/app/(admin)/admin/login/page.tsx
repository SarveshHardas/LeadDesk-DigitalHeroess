'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ToastProvider, useToast } from '@/components/ui/Toast';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { loginAction } from '@/actions/auth.actions';
import { Lock, Mail, ArrowUpRight, Info } from 'lucide-react';

function AdminLoginForm() {
  const router = useRouter();
  const { success, error: toastError } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fillDemoCredentials = () => {
    setEmail('admin@leaddesk.com');
    setPassword('AdminPassword123!');
    setErrorMsg(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !password) {
      setErrorMsg('Please provide both email address and password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await loginAction({ email, password });

      if (res.success) {
        success('Access Granted', 'Welcome to LeadDesk Mini Admin Control Center.');
        router.push('/admin');
        router.refresh();
      } else {
        setErrorMsg(res.error || 'Authentication failed');
        toastError('Login Failed', res.error || 'Check credentials and try again.');
      }
    } catch {
      setErrorMsg('An unexpected connection error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-[#f4f3ef] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="w-full max-w-md relative z-10">
        
        {/* Header Brand */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 mb-4 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#d97706] to-[#f59e0b] flex items-center justify-center shadow-lg shadow-amber-950/40 group-hover:scale-105 transition-transform">
              <span className="font-mono font-black text-sm text-white">LD</span>
            </div>
          </Link>
          <h1 className="text-2xl font-extrabold text-[#f4f3ef] font-display tracking-tight">Admin Control Center</h1>
          <p className="text-xs text-slate-400 mt-1">Sign in to manage lead pipeline &amp; status triage</p>
        </div>

        {/* Demo Credentials Assistant Box */}
        <div className="mb-6 p-4 rounded-xl bg-[#121418] border border-amber-500/30 flex flex-col gap-2.5 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-mono">
              <Info className="w-4 h-4 text-amber-400" />
              <span>Demo Admin Credentials</span>
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-[11px] font-mono font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20 transition-colors"
            >
              Auto-Fill Credentials
            </button>
          </div>
          <div className="text-xs font-mono text-slate-300 flex flex-col gap-1 pl-6">
            <span>Email: <strong className="text-white">admin@leaddesk.com</strong></span>
            <span>Password: <strong className="text-white">AdminPassword123!</strong></span>
          </div>
        </div>

        <Card className="tactile-card border border-white/10 shadow-2xl p-6 sm:p-8 bg-[#121418]">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-lg">Session Authorization</CardTitle>
            <CardDescription className="text-xs">Enter your credentials to access protected routes</CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs animate-fade-in-up font-sans">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-4" noValidate>
              <Input
                label="Admin Work Email"
                type="email"
                placeholder="admin@leaddesk.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                fullWidth
                rightIcon={<ArrowUpRight className="w-4 h-4" />}
                className="mt-2 font-bold shadow-lg shadow-amber-950/40 rounded-lg"
              >
                Sign In To Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors">
            ← Return to Public Landing Page
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <ToastProvider>
      <AdminLoginForm />
    </ToastProvider>
  );
}
