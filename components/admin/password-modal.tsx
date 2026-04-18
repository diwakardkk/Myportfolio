'use client';

import { useState } from 'react';
import { Loader2, LockKeyhole, X } from 'lucide-react';

interface PasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (password: string) => Promise<void>;
  errorMessage?: string;
}

export function PasswordModal({ open, onClose, onSubmit, errorMessage }: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!open) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await onSubmit(password);
      setPassword('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-[1.75rem] border border-white/10 bg-slate-950/95 p-6 shadow-card">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="chip">Owner Access</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">Unlock portfolio editing</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Authentication runs through a Netlify-compatible serverless function and issues a short-lived secure session cookie.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300"
            aria-label="Close password modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2 text-sm text-slate-300">
            Admin password
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="focus-ring w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500"
                placeholder="Enter your admin password"
                autoFocus
                required
              />
            </div>
          </label>

          {errorMessage ? <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{errorMessage}</p> : null}

          <button
            type="submit"
            disabled={submitting}
            className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan to-electric px-5 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Verify & Continue
          </button>
        </form>
      </div>
    </div>
  );
}