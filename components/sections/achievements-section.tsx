import { Award, BadgeCheck, Rocket, ScrollText, Stars } from 'lucide-react';

import type { ProfileData } from '@/data/profile';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

interface AchievementsSectionProps {
  profile: ProfileData;
}

const achievementIcons = [ScrollText, Award, BadgeCheck, Stars, Rocket];

export function AchievementsSection({ profile }: AchievementsSectionProps) {
  return (
    <section id="achievements" className="relative py-24 sm:py-28">
      <div className="shell space-y-12">
        <Reveal>
          <SectionHeading
            eyebrow="Achievements"
            title="Academic progress with a focus on credible impact"
            description="A compact view of thesis milestones, publications, credentials, and the broader research agenda behind the portfolio."
          />
        </Reveal>

        <div className="relative pl-0 lg:pl-8">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-cyan/40 via-electric/30 to-transparent lg:block" />
          <div className="space-y-5">
            {profile.achievements.map((achievement, index) => {
              const Icon = achievementIcons[index % achievementIcons.length];

              return (
                <Reveal key={achievement.title} delay={0.04 * index}>
                  <article className="premium-card relative rounded-[1.75rem] lg:ml-6">
                    <div className="absolute -left-12 top-8 hidden h-10 w-10 items-center justify-center rounded-full border border-cyan/25 bg-cyan/10 text-cyan lg:flex">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{achievement.title}</h3>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">{achievement.detail}</p>
                      </div>
                      {achievement.year ? (
                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-500">
                          {achievement.year}
                        </span>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}