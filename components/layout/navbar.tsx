'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Mail, MapPin, Menu, Phone, School, X } from 'lucide-react';

import type { ProfileData } from '@/data/profile';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Research', href: '#research', id: 'research' },
  { label: 'Publications', href: '#publications', id: 'publications' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Achievements', href: '#achievements', id: 'achievements' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

interface NavbarProps {
  profile: ProfileData;
}

export function Navbar({ profile }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: 0.2 },
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto mb-3 max-w-7xl rounded-[1.5rem] border border-[#fffffa]/10 bg-[#fffffa]/[0.05] px-3 py-3 backdrop-blur-xl sm:rounded-full sm:px-4 sm:py-2">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-[10px] font-medium uppercase tracking-[0.14em] text-[#fffffa]/72 sm:justify-between sm:text-[11px] sm:tracking-[0.18em]">
          <a
            href={`mailto:${profile.contact.email}`}
            className="focus-ring inline-flex max-w-full min-w-0 items-center gap-2 rounded-full text-inherit transition hover:text-white"
          >
            <Mail className="h-3.5 w-3.5 text-cyan" />
            <span className="truncate">{profile.contact.email}</span>
          </a>
          <a
            href={`tel:${profile.contact.phone.replace(/\s+/g, '')}`}
            className="focus-ring inline-flex max-w-full min-w-0 items-center gap-2 rounded-full text-inherit transition hover:text-white"
          >
            <Phone className="h-3.5 w-3.5 text-cyan" />
            <span className="truncate">{profile.contact.phone}</span>
          </a>
          <div className="hidden items-center gap-2 md:inline-flex md:max-w-[26rem]">
            <School className="h-3.5 w-3.5 text-cyan" />
            <span className="truncate">{profile.personalInfo.institution}</span>
          </div>
          <div className="inline-flex max-w-full min-w-0 items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-cyan" />
            <span className="truncate">{profile.contact.location}</span>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-[1.75rem] border px-3 py-3 transition duration-300 sm:rounded-full sm:px-4 md:px-5',
          scrolled ? 'glass-panel border-white/12 bg-slate-950/70 shadow-glow' : 'border-white/8 bg-slate-950/40',
        )}
      >
        <a href="#home" className="focus-ring flex min-w-0 items-center gap-3 rounded-full px-1 py-1 text-sm font-semibold tracking-[0.2em] text-white sm:px-2 sm:tracking-[0.32em]">
          <span className="relative inline-flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-cyan/30 bg-cyan/10">
            <Image
              src={profile.personalInfo.profileImageUrl}
              alt={`${profile.personalInfo.name} profile portrait`}
              fill
              sizes="40px"
              className="object-cover"
            />
          </span>
          <span className="truncate">{profile.personalInfo.name}</span>
        </a>

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                'focus-ring rounded-full px-4 py-2 text-sm transition',
                activeSection === item.id
                  ? 'bg-white/10 text-white shadow-[0_0_0_1px_rgba(122,162,255,0.22)]'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white',
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={profile.personalInfo.cvUrl || '#contact'}
            className="focus-ring rounded-full border border-cyan/30 bg-cyan/10 px-5 py-2 text-sm font-medium text-cyan transition hover:border-cyan/50 hover:bg-cyan/15 hover:text-white"
          >
            Download CV
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 lg:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="shell lg:hidden">
          <nav className="glass-panel mt-3 rounded-3xl border-white/10 p-4" aria-label="Mobile navigation">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'focus-ring rounded-2xl px-4 py-3 text-sm transition',
                    activeSection === item.id ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white',
                  )}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={profile.personalInfo.cvUrl || '#contact'}
                onClick={() => setMobileOpen(false)}
                className="focus-ring mt-2 rounded-2xl border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm font-medium text-cyan"
              >
                Download CV
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}