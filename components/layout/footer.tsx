import Image from 'next/image';
import { BookOpenText, Linkedin, Mail, Phone } from 'lucide-react';

import type { ProfileData } from '@/data/profile';

interface FooterProps {
  profile: ProfileData;
}

const socialIcons = {
  linkedin: Linkedin,
  mail: Mail,
  scholar: BookOpenText,
  phone: Phone,
};

export function Footer({ profile }: FooterProps) {
  return (
    <footer className="relative z-10 border-t border-electric/15 bg-[linear-gradient(180deg,rgba(34,75,195,0.12),rgba(255,255,250,0.04))]">
      <div className="shell flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center md:w-auto">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[#fffffa]/15">
            <Image
              src={profile.personalInfo.profileImageUrl}
              alt={`${profile.personalInfo.name} portrait`}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold tracking-[0.14em] text-[#fffffa] sm:tracking-[0.2em]">{profile.personalInfo.name}</p>
            <p className="text-sm text-[#fffffa]/72">Built for research, impact, and trustworthy AI.</p>
            <p className="text-xs uppercase tracking-[0.28em] text-cyan">
              © {new Date().getFullYear()} {profile.personalInfo.name}. All rights reserved.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {profile.socialLinks.map((link) => {
            const Icon = socialIcons[link.icon];

            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#fffffa]/10 bg-[#fffffa]/[0.05] px-4 py-2 text-sm text-[#fffffa]/76 transition hover:border-cyan/40 hover:bg-cyan/10 hover:text-[#fffffa] sm:w-auto"
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}