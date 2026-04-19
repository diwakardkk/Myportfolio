import { BookOpenText, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

import type { ProfileData } from '@/data/profile';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

interface ContactSectionProps {
  profile: ProfileData;
}

export function ContactSection({ profile }: ContactSectionProps) {
  return (
    <section id="contact" className="relative py-14 sm:py-16">
      <div className="shell max-w-5xl">
        <Reveal>
          <SectionHeading
            eyebrow="Let's Connect"
            title="Open to postdoctoral conversations and research collaborations"
            description="Reach out for postdoctoral opportunities, collaborations in trustworthy healthcare AI, or conversations around interpretable clinical systems."
          />

          <div className="mt-8 space-y-4">
            <div className="premium-card rounded-[1.75rem] p-5">
              <div className="flex min-w-0 items-start gap-3 text-slate-200 sm:items-center">
                <Mail className="h-4 w-4 text-cyan" />
                <a href={`mailto:${profile.contact.email}`} className="focus-ring break-all rounded-md text-sm hover:text-white">
                  {profile.contact.email}
                </a>
              </div>
            </div>
            <div className="premium-card rounded-[1.75rem] p-5">
              <div className="flex min-w-0 items-start gap-3 text-slate-200 sm:items-center">
                <Phone className="h-4 w-4 text-cyan" />
                <a href={`tel:${profile.contact.phone.replace(/\s+/g, '')}`} className="focus-ring rounded-md text-sm hover:text-white">
                  {profile.contact.phone}
                </a>
              </div>
            </div>
            <div className="premium-card rounded-[1.75rem] p-5">
              <div className="flex items-center gap-3 text-slate-200">
                <MapPin className="h-4 w-4 text-cyan" />
                <span className="text-sm">{profile.contact.location}</span>
              </div>
            </div>
            <div className="premium-card rounded-[1.75rem] p-5">
              <div className="flex min-w-0 items-start gap-3 text-slate-200 sm:items-center">
                <Linkedin className="h-4 w-4 text-cyan" />
                <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="focus-ring break-all rounded-md text-sm hover:text-white">
                  linkedin.com/in/diwakarpro
                </a>
              </div>
            </div>
            <div className="premium-card rounded-[1.75rem] p-5">
              <div className="flex items-center gap-3 text-slate-200">
                <BookOpenText className="h-4 w-4 text-cyan" />
                <a href={profile.contact.scholarUrl} target="_blank" rel="noreferrer" className="focus-ring rounded-md text-sm hover:text-white">
                  Google Scholar
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={`mailto:${profile.contact.email}`}
              className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan to-electric px-5 py-3 text-sm font-semibold text-slate-950 sm:w-auto"
            >
              Email Me
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white sm:w-auto"
            >
              LinkedIn
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={profile.contact.scholarUrl}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full border border-cyan/25 bg-cyan/10 px-5 py-3 text-sm font-semibold text-cyan sm:w-auto"
            >
              Google Scholar
              <BookOpenText className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-10 px-1 text-sm leading-7 text-[#fffffa]/76">
            <p>
              For research discussions, postdoctoral roles, and collaboration opportunities, email directly at{' '}
              <a href={`mailto:${profile.contact.email}`} className="focus-ring break-all font-medium text-cyan hover:text-white">
                {profile.contact.email}
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}