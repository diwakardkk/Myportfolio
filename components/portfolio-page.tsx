'use client';

import { useEffect, useState, startTransition } from 'react';

import type { ProfileData } from '@/data/profile';
import { mergeProfileData } from '@/lib/profile-runtime';

import { AdminControls } from '@/components/admin/admin-controls';
import { NeuralBackdrop } from '@/components/background/neural-backdrop';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { AboutSection } from '@/components/sections/about-section';
import { AchievementsSection } from '@/components/sections/achievements-section';
import { ContactSection } from '@/components/sections/contact-section';
import { HeroSection } from '@/components/sections/hero-section';
import { PostdocSection } from '@/components/sections/postdoc-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { PublicationsSection } from '@/components/sections/publications-section';
import { ResearchSection } from '@/components/sections/research-section';
import { SkillsSection } from '@/components/sections/skills-section';

interface PortfolioPageProps {
  initialProfile: ProfileData;
}

interface AdminSessionState {
  authenticated: boolean;
  runtimeEditingEnabled: boolean;
  passwordChangeSupported: boolean;
  visibilityEnabled: boolean;
  message?: string;
}

const defaultAdminState: AdminSessionState = {
  authenticated: false,
  runtimeEditingEnabled: false,
  passwordChangeSupported: false,
  visibilityEnabled: false,
};

export function PortfolioPage({ initialProfile }: PortfolioPageProps) {
  const [persistedProfile, setPersistedProfile] = useState(initialProfile);
  const [draftProfile, setDraftProfile] = useState(initialProfile);
  const [adminState, setAdminState] = useState<AdminSessionState>(defaultAdminState);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const adminFlag = searchParams.get('admin') === '1';

    setAdminState((previous) => ({
      ...previous,
      visibilityEnabled:
        previous.visibilityEnabled ||
        adminFlag ||
        process.env.NEXT_PUBLIC_SHOW_ADMIN_TRIGGER === 'true',
    }));
  }, []);

  useEffect(() => {
    const loadProfileOverride = async () => {
      try {
        const response = await fetch('/.netlify/functions/profile-read', { cache: 'no-store' });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as {
          profile?: Partial<ProfileData>;
        };

        if (payload.profile) {
          startTransition(() => {
            const mergedProfile = mergeProfileData(initialProfile, payload.profile);
            setPersistedProfile(mergedProfile);
            setDraftProfile(mergedProfile);
          });
        }
      } catch {
        // Public portfolio rendering should not fail if runtime profile loading is unavailable.
      }
    };

    const loadSession = async () => {
      try {
        const response = await fetch('/.netlify/functions/admin-session', {
          credentials: 'include',
          cache: 'no-store',
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as AdminSessionState;
        setAdminState((previous) => ({ ...previous, ...payload }));
      } catch {
        // Ignore unavailable admin session in public mode.
      }
    };

    void Promise.all([loadProfileOverride(), loadSession()]);
  }, [initialProfile]);

  const displayedProfile = adminState.authenticated ? draftProfile : persistedProfile;

  return (
    <div className="relative overflow-hidden bg-ink text-slate-100">
      <NeuralBackdrop />
      <Navbar profile={displayedProfile} />

      <main className="relative z-10">
        <HeroSection profile={displayedProfile} />
        <AboutSection profile={displayedProfile} />
        <ResearchSection profile={displayedProfile} />
        <SkillsSection profile={displayedProfile} />
        <PublicationsSection profile={displayedProfile} />
        <ProjectsSection profile={displayedProfile} />
        <AchievementsSection profile={displayedProfile} />
        <PostdocSection profile={displayedProfile} />
        <ContactSection profile={displayedProfile} />
      </main>

      <Footer profile={displayedProfile} />

      <AdminControls
        profile={persistedProfile}
        draftProfile={draftProfile}
        adminState={adminState}
        onAdminStateChange={setAdminState}
        onDraftChange={setDraftProfile}
        onPersistedChange={(nextProfile) => {
          setPersistedProfile(nextProfile);
          setDraftProfile(nextProfile);
        }}
        onResetDraft={() => setDraftProfile(persistedProfile)}
      />
    </div>
  );
}