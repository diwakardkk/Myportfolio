import {
  Activity,
  MessagesSquare,
  Radar,
  ScanSearch,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import type { ProfileData, ResearchFocusIcon } from '@/data/profile';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

interface ResearchSectionProps {
  profile: ProfileData;
}

const iconMap: Record<ResearchFocusIcon, typeof ScanSearch> = {
  'scan-search': ScanSearch,
  'shield-check': ShieldCheck,
  radar: Radar,
  'messages-square': MessagesSquare,
  activity: Activity,
  sparkles: Sparkles,
};

export function ResearchSection({ profile }: ResearchSectionProps) {
  return (
    <section id="research" className="relative py-14 sm:py-16">
      <div className="shell space-y-8">
        <Reveal>
          <SectionHeading
            eyebrow="Research Focus"
            title="Systems thinking for reliable and clinically usable AI"
            description="A research portfolio spanning interpretable imaging, uncertainty-aware learning, healthcare signal analysis, and deployable clinical intelligence."
          />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {profile.researchFocus.map((item, index) => {
            const Icon = iconMap[item.icon];

            return (
              <Reveal key={item.title} delay={0.04 * index}>
                <article className="premium-card h-full rounded-[1.75rem]">
                  <div className="mb-5 inline-flex rounded-2xl border border-cyan/25 bg-cyan/10 p-3 text-cyan">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}