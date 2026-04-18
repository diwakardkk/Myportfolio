import { ArrowUpRight, BookText, Link2 } from 'lucide-react';

import type { ProfileData } from '@/data/profile';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

interface PublicationsSectionProps {
  profile: ProfileData;
}

export function PublicationsSection({ profile }: PublicationsSectionProps) {
  return (
    <section id="publications" className="relative py-20 sm:py-24">
      <div className="shell space-y-10">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Publications"
            title="Resume-verified publication record"
            description="A compact bibliography drawn from the CV, with verified DOI links where available and clear status labels for communicated manuscripts."
          />

          <div className="flex flex-wrap gap-3">
            <a
              href={profile.contact.scholarUrl}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-5 py-3 text-sm text-cyan transition hover:border-cyan/50 hover:text-white"
            >
              Google Scholar
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="glass-panel overflow-hidden rounded-[1.75rem] border-white/10">
            {profile.publications.map((publication, index) => (
              <article
                key={publication.title}
                className="grid gap-4 border-b border-white/10 px-5 py-5 last:border-b-0 sm:px-6 lg:grid-cols-[110px_minmax(0,1fr)_240px] lg:gap-6"
              >
                <div className="flex flex-wrap items-start gap-2 lg:flex-col">
                  <span className="rounded-full border border-electric/30 bg-electric/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-electric">
                    {publication.year}
                  </span>
                  {publication.tag ? (
                    <span className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-cyan">
                      {publication.tag}
                    </span>
                  ) : null}
                  {publication.status ? (
                    <span className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-violet">
                      {publication.status}
                    </span>
                  ) : null}
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold leading-7 text-white sm:text-xl">{publication.title}</h3>

                  <div className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
                    <BookText className="h-4 w-4 text-cyan" />
                    <span className="font-medium text-white/90">{publication.journal}</span>
                    {publication.publisher ? <span className="text-slate-500">• {publication.publisher}</span> : null}
                  </div>

                  {publication.citation ? <p className="text-sm text-slate-400">{publication.citation}</p> : null}

                  <p className="text-sm leading-7 text-slate-300">{publication.highlight}</p>

                  <div className="flex flex-wrap gap-2">
                    {publication.categoryTags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-cyan">
                    <Link2 className="h-4 w-4" />
                    {publication.doiLabel || 'DOI'}
                  </div>

                  {publication.doiUrl ? (
                    <a
                      href={publication.doiUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring mt-3 inline-flex items-start gap-2 text-sm leading-6 text-cyan transition hover:text-white"
                    >
                      <span className="break-all">{publication.doiUrl.replace('https://doi.org/', '')}</span>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0" />
                    </a>
                  ) : (
                    <p className="mt-3 text-sm leading-6 text-slate-400">DOI not assigned yet.</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}