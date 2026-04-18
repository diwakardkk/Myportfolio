'use client';

import { useState } from 'react';
import { PencilLine } from 'lucide-react';

import type { ProfileData } from '@/data/profile';

import { AdminDrawer } from '@/components/admin/admin-drawer';
import { PasswordModal } from '@/components/admin/password-modal';

interface AdminState {
  authenticated: boolean;
  runtimeEditingEnabled: boolean;
  passwordChangeSupported: boolean;
  visibilityEnabled: boolean;
  message?: string;
}

interface AdminControlsProps {
  profile: ProfileData;
  draftProfile: ProfileData;
  adminState: AdminState;
  onAdminStateChange: (state: AdminState | ((previous: AdminState) => AdminState)) => void;
  onDraftChange: (profile: ProfileData) => void;
  onPersistedChange: (profile: ProfileData) => void;
  onResetDraft: () => void;
}

export function AdminControls({
  profile,
  draftProfile,
  adminState,
  onAdminStateChange,
  onDraftChange,
  onPersistedChange,
  onResetDraft,
}: AdminControlsProps) {
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginError, setLoginError] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<string | undefined>();

  if (!adminState.visibilityEnabled && !adminState.authenticated) {
    return null;
  }

  const handleLogin = async (password: string) => {
    setLoginError(undefined);

    const response = await fetch('/.netlify/functions/admin-login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    const payload = (await response.json()) as AdminState & { message?: string };

    if (!response.ok) {
      setLoginError(payload.message || 'Authentication failed.');
      return;
    }

    onAdminStateChange((previous) => ({ ...previous, ...payload, authenticated: true, visibilityEnabled: true }));
    setPasswordOpen(false);
    setDrawerOpen(true);
    setFeedback(payload.message || 'Admin session active.');
  };

  const handleSave = async () => {
    setBusy(true);
    setFeedback(undefined);

    try {
      const response = await fetch('/.netlify/functions/admin-save-profile', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profile: draftProfile }),
      });

      const payload = (await response.json()) as {
        profile?: ProfileData;
        runtimeEditingEnabled?: boolean;
        passwordChangeSupported?: boolean;
        message?: string;
      };

      if (!response.ok) {
        setFeedback(payload.message || 'Unable to persist profile changes.');
        return;
      }

      onPersistedChange(payload.profile || draftProfile);
      onAdminStateChange((previous) => ({
        ...previous,
        runtimeEditingEnabled: payload.runtimeEditingEnabled ?? previous.runtimeEditingEnabled,
        passwordChangeSupported: payload.passwordChangeSupported ?? previous.passwordChangeSupported,
      }));
      setFeedback(payload.message || 'Portfolio changes saved.');
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/.netlify/functions/admin-logout', {
      method: 'POST',
      credentials: 'include',
    });

    onAdminStateChange((previous) => ({
      ...previous,
      authenticated: false,
      message: 'Admin session ended.',
    }));
    setDrawerOpen(false);
    onResetDraft();
    setFeedback('Logged out successfully.');
  };

  const handleChangePassword = async (payload: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    const response = await fetch('/.netlify/functions/admin-change-password', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const body = (await response.json()) as {
      passwordChangeSupported?: boolean;
      message?: string;
    };

    onAdminStateChange((previous) => ({
      ...previous,
      passwordChangeSupported: body.passwordChangeSupported ?? previous.passwordChangeSupported,
    }));

    return body.message || (response.ok ? 'Password updated.' : 'Unable to change password.');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (adminState.authenticated) {
            setDrawerOpen(true);
            return;
          }

          setPasswordOpen(true);
        }}
        className="focus-ring fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-slate-950/90 px-4 py-3 text-sm font-medium text-cyan shadow-[0_18px_48px_rgba(2,10,31,0.5)] backdrop-blur-xl transition hover:border-cyan/50 hover:text-white"
        aria-label="Open portfolio editor"
      >
        <PencilLine className="h-4 w-4" />
        Edit Portfolio
      </button>

      <PasswordModal open={passwordOpen} onClose={() => setPasswordOpen(false)} onSubmit={handleLogin} errorMessage={loginError} />

      <AdminDrawer
        open={drawerOpen}
        draftProfile={draftProfile}
        runtimeEditingEnabled={adminState.runtimeEditingEnabled}
        passwordChangeSupported={adminState.passwordChangeSupported}
        busy={busy}
        feedback={feedback}
        onClose={() => setDrawerOpen(false)}
        onDraftChange={onDraftChange}
        onSave={handleSave}
        onReset={() => {
          onResetDraft();
          setFeedback('Draft reset to the last persisted profile.');
        }}
        onLogout={handleLogout}
        onChangePassword={handleChangePassword}
      />
    </>
  );
}