import { ArrowUpRight, BookText } from 'lucide-react';

import type { ProfileData } from '@/data/profile';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

interface PublicationsSectionProps {
  profile: ProfileData;
}

export function PublicationsSection({ profile }: PublicationsSectionProps) {
  return (
    <section id="publications" className="relative scroll-mt-28 py-14 sm:scroll-mt-32 sm:py-16">
      <div className="shell space-y-8">
        <Reveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Publications"
            title="List of publications"
            description=""
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={profile.contact.scholarUrl}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-5 py-3 text-sm text-cyan transition hover:border-cyan/50 hover:text-white sm:w-auto"
            >
              Google Scholar
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <div className="glass-panel overflow-visible rounded-[1.75rem] border-white/10 sm:overflow-hidden">
          {profile.publications.map((publication) => (
            <article
              key={publication.title}
              className="border-b border-white/10 px-4 py-4 last:border-b-0 sm:px-6 sm:py-5"
            >
              <div className="min-w-0 space-y-3">
                <div className="flex flex-wrap items-start gap-2">
                  <span className="rounded-full border border-electric/30 bg-electric/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-electric sm:tracking-[0.2em]">
                    {publication.year}
                  </span>
                  {publication.tag ? (
                    <span className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-cyan sm:tracking-[0.2em]">
                      {publication.tag}
                    </span>
                  ) : null}
                  {publication.status ? (
                    <span className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-violet sm:tracking-[0.2em]">
                      {publication.status}
                    </span>
                  ) : null}
                </div>

                <h3 className="text-base font-semibold leading-7 text-white sm:text-lg">
                  {publication.doiUrl ? (
                    <a
                      href={publication.doiUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring inline-flex items-start gap-2 transition hover:text-cyan"
                    >
                      <span>{publication.title}</span>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0" />
                    </a>
                  ) : (
                    publication.title
                  )}
                </h3>

                <div className="flex flex-wrap items-center gap-2 text-sm leading-6 text-slate-300">
                  <BookText className="h-4 w-4 shrink-0 text-cyan" />
                  <span className="font-medium text-white/90">{publication.journal}</span>
                  {publication.publisher ? <span className="text-slate-500">• {publication.publisher}</span> : null}
                </div>

                {publication.citation ? <p className="break-words text-sm leading-6 text-slate-400">{publication.citation}</p> : null}

                <p className="text-sm leading-6 text-slate-300">{publication.highlight}</p>

                {publication.doiUrl ? (
                  <a
                    href={publication.doiUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-flex max-w-full items-start gap-2 text-xs text-cyan transition hover:text-white"
                  >
                    <span className="break-all">{publication.doiUrl}</span>
                  </a>
                ) : null}

                <div className="flex flex-wrap gap-2">
                  {publication.categoryTags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-400 sm:tracking-[0.22em]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}