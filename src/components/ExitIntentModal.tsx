'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { X, CheckCircle2, Loader2 } from 'lucide-react';

export default function ExitIntentModal() {
  const pathname = usePathname();
  const isToolsPage = pathname === '/tools' || Boolean(pathname?.startsWith('/tools/'));

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isToolsPage) return;

    const isDismissedRecently = (): boolean => {
      try {
        const dismissedAt = localStorage.getItem('cacto_exit_intent_dismissed');
        if (!dismissedAt) return false;
        const timestamp = Number(dismissedAt);
        if (isNaN(timestamp)) return false;
        const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
        return Date.now() - timestamp < SEVEN_DAYS_MS;
      } catch {
        return false;
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 15) {
        if (!isDismissedRecently()) {
          setIsOpen(true);
        }
      }
    };

    const doc = document.documentElement;
    doc.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      doc.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isToolsPage]);

  const handleDismiss = () => {
    try {
      localStorage.setItem('cacto_exit_intent_dismissed', Date.now().toString());
    } catch {
      // ignore localStorage errors
    }
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit. Please try again.');
      }

      setStatus('success');
      try {
        localStorage.setItem('cacto_exit_intent_dismissed', Date.now().toString());
      } catch {
        // ignore localStorage errors
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  if (!isToolsPage || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1510]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#FAF6EE] text-[#1A1510] border-3 border-[#1A1510] shadow-[8px_12px_0_#1A1510] p-6 sm:p-8 rounded-2xl transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          type="button"
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-lg text-[#1A1510]/70 hover:text-[#1A1510] hover:bg-[#1A1510]/5 transition-colors border border-transparent hover:border-[#1A1510]/20"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="py-6 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#16A34A]/10 text-[#16A34A] border-2 border-[#16A34A] mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1510]">
              You&apos;re on the list! 🎉
            </h3>
            <p className="text-base text-[#1A1510]/80 max-w-md mx-auto">
              We&apos;ve reserved your spot. Watch your inbox for early invite access and exclusive creator resources.
            </p>
            <div className="pt-4">
              <button
                onClick={handleDismiss}
                type="button"
                className="w-full sm:w-auto px-6 py-3 bg-[#16A34A] text-white font-bold rounded-xl border-2 border-[#1A1510] shadow-[4px_4px_0_#1A1510] hover:bg-[#15803D] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#1A1510] transition-all"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="inline-block px-3 py-1 bg-[#16A34A]/15 text-[#16A34A] font-semibold text-xs rounded-full border border-[#16A34A]/30 mb-3 uppercase tracking-wider">
                Exclusive Early Access
              </div>
              <h2
                id="exit-modal-title"
                className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1510]"
              >
                Before you go 🌵
              </h2>
              <p className="mt-3 text-sm text-[#1A1510]/80 leading-relaxed font-semibold">
                Join our waitlist and make sure you are in for our launch.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white text-[#1A1510] placeholder-[#1A1510]/50 rounded-xl border-2 border-[#1A1510] focus:outline-none focus:ring-2 focus:ring-[#16A34A] font-medium text-base shadow-[2px_2px_0_#1A1510]"
                />
                {status === 'error' && (
                  <p className="text-sm font-medium text-red-600 bg-red-50 border border-red-200 p-2.5 rounded-lg">
                    {errorMessage}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 px-6 bg-[#16A34A] text-white font-bold rounded-xl border-2 border-[#1A1510] shadow-[4px_6px_0_#1A1510] hover:bg-[#15803D] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_4px_0_#1A1510] transition-all disabled:opacity-75 flex items-center justify-center gap-2 text-base"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Getting Access...</span>
                  </>
                ) : (
                  <span>Get Early Invite Access</span>
                )}
              </button>
            </form>

            <div className="text-center pt-1">
              <button
                onClick={handleDismiss}
                type="button"
                className="text-sm font-medium text-[#1A1510]/60 hover:text-[#1A1510] underline underline-offset-4 transition-colors"
              >
                Maybe next time
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
