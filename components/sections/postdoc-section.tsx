import { ArrowRight } from 'lucide-react';

import type { ProfileData } from '@/data/profile';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

interface PostdocSectionProps {
  profile: ProfileData;
}

export function PostdocSection({ profile }: PostdocSectionProps) {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="shell">
        <Reveal className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(9,17,31,0.92),rgba(12,24,49,0.88))] p-8 shadow-card md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="space-y-5">
              <SectionHeading
                eyebrow="What I'm Looking For"
                title="Postdoctoral collaboration at the edge of reliable healthcare AI"
                description={profile.postdocInterests.summary}
              />
              <a
                href="#contact"
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-electric px-6 py-3 text-sm font-semibold text-slate-950 transition hover:translate-y-[-2px]"
              >
                Start a Conversation
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {profile.postdocInterests.areas.map((area) => (
                <div key={area} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium text-slate-100">
                  {area}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}