import { ArrowUpRight, BrainCircuit, ShieldHalf, Stethoscope } from 'lucide-react';

import type { ProfileData } from '@/data/profile';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

interface ProjectsSectionProps {
  profile: ProfileData;
}

const projectIcons = [BrainCircuit, ShieldHalf, Stethoscope, ArrowUpRight];

export function ProjectsSection({ profile }: ProjectsSectionProps) {
  return (
    <section id="projects" className="relative py-24 sm:py-28">
      <div className="shell space-y-12">
        <Reveal>
          <SectionHeading
            eyebrow="Featured Work"
            title="Research projects designed for clinical relevance"
            description="Selected pipelines and applied systems at the intersection of AI performance, interpretability, and healthcare deployment readiness."
          />
        </Reveal>

        <div className="grid gap-5 xl:grid-cols-2">
          {profile.projects.map((project, index) => {
            const Icon = projectIcons[index % projectIcons.length];

            return (
              <Reveal key={project.title} delay={0.05 * index}>
                <article className="premium-card group h-full rounded-[1.9rem] border-white/10 bg-[linear-gradient(180deg,rgba(10,17,32,0.92),rgba(5,8,22,0.92))]">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="rounded-2xl border border-cyan/25 bg-cyan/10 p-3 text-cyan transition group-hover:border-cyan/50 group-hover:bg-cyan/15">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-500">
                      Research Pipeline
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{project.description}</p>

                  <div className="mt-6 grid gap-4 text-sm leading-7 text-slate-300">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Challenge</p>
                      <p className="mt-2">{project.challenge}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Approach</p>
                      <p className="mt-2">{project.approach}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Impact</p>
                      <p className="mt-2">{project.impact}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.technologies.map((technology) => (
                      <span key={technology} className="rounded-full border border-cyan/15 bg-cyan/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-cyan">
                        {technology}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}