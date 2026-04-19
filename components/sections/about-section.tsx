import { GraduationCap, School } from 'lucide-react';

import type { ProfileData } from '@/data/profile';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

interface AboutSectionProps {
  profile: ProfileData;
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section id="about" className="relative py-14 sm:py-16">
      <div className="shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <Reveal>
          <SectionHeading eyebrow="About Me" title="Research rooted in healthcare reality" description={profile.about.summary} />
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">{profile.about.supportingText}</p>
        </Reveal>

        <Reveal delay={0.08} className="premium-card rounded-[2rem]">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl border border-cyan/25 bg-cyan/10 p-3 text-cyan">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Academic status</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{profile.about.statusCard.degree}</h3>
              </div>
            </div>

            <div className="grid gap-4 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl border border-cyan/25 bg-cyan/10 p-3 text-cyan">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">PhD</p>
                        <h4 className="mt-2 text-xl font-semibold text-white">{profile.about.statusCard.degree}</h4>
                      </div>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                        Session {profile.about.statusCard.session}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Institution</p>
                      <p className="mt-2 leading-7 text-slate-300">{profile.about.statusCard.institution}</p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Thesis</p>
                      <p className="mt-2 font-medium text-cyan">{profile.about.statusCard.status}</p>
                      <p className="mt-2 leading-7 text-slate-300">{profile.about.statusCard.thesisTitle}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-3 flex items-center gap-2 text-white">
                  <School className="h-4 w-4 text-cyan" />
                  Qualifications
                </div>
                <div className="space-y-4">
                  {profile.about.statusCard.previousQualifications.map((qualification) => (
                    <div key={`${qualification.degree}-${qualification.year}`} className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div>
                        <p className="font-medium text-white">{qualification.degree}</p>
                        <p className="leading-7 text-slate-300">{qualification.institution}</p>
                      </div>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                        {qualification.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}