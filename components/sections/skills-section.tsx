import type { ProfileData } from '@/data/profile';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

interface SkillsSectionProps {
  profile: ProfileData;
}

const skillGroups: Array<{
  key: keyof ProfileData['skills'];
  title: string;
}> = [
  { key: 'languagesAndTools', title: 'Languages & Tools' },
  { key: 'methods', title: 'Methods' },
  { key: 'theory', title: 'Theory' },
];

export function SkillsSection({ profile }: SkillsSectionProps) {
  return (
    <section id="skills" className="relative py-14 sm:py-16">
      <div className="shell space-y-8">
        <Reveal>
          <SectionHeading
            eyebrow="Technical Skills"
            title="A research stack built for experimentation and deployment"
            description="Core tools, model families, and mathematical foundations behind imaging, signal processing, and trustworthy AI workflows."
          />
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.key} delay={0.05 * index}>
              <article className="premium-card h-full rounded-[1.75rem]">
                <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                <div className="mt-5 flex flex-wrap gap-3">
                  {profile.skills[group.key].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}