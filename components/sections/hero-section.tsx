'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';

import type { ProfileData } from '@/data/profile';
import { Reveal } from '@/components/ui/reveal';

interface HeroSectionProps {
  profile: ProfileData;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section id="home" className="relative overflow-hidden pb-24 pt-20 sm:pb-28 sm:pt-24 lg:pb-32 lg:pt-28">
      <div className="shell relative z-10 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-10">
          <Reveal className="space-y-6">
            <div className="chip">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              {profile.hero.eyebrow}
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {profile.hero.badges.map((badge) => (
                  <span key={badge} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
                    {badge}
                  </span>
                ))}
              </div>

              <div className="space-y-5">
                <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                  {profile.personalInfo.name}
                </h1>
                <p className="max-w-4xl text-lg font-medium leading-8 text-cyan sm:text-xl">
                  {profile.personalInfo.roleLine}
                </p>
                <p className="max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                  {profile.personalInfo.subtitle}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-wrap gap-4">
            <a
              href="#research"
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-electric px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_14px_34px_rgba(87,215,255,0.25)] transition hover:translate-y-[-2px]"
            >
              View Research
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan/30 hover:bg-white/10"
            >
              Contact Me
              <Mail className="h-4 w-4" />
            </a>
          </Reveal>

          <Reveal delay={0.14} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {profile.hero.quickHighlights.map((highlight) => (
              <div key={highlight} className="glass-panel rounded-2xl border-white/10 px-4 py-4 text-sm font-medium text-slate-200">
                {highlight}
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.12} className="relative">
          <div className="absolute inset-x-[10%] top-8 h-72 rounded-full bg-electric/25 blur-[110px]" />
          <motion.div
            className="relative overflow-hidden rounded-[2rem] border border-electric/20 bg-[linear-gradient(180deg,rgba(34,75,195,0.18),rgba(255,255,250,0.06))] p-6 shadow-card backdrop-blur-2xl"
            animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,75,195,0.28),transparent_24%),radial-gradient(circle_at_10%_90%,rgba(56,172,6,0.2),transparent_32%)]" />
            <div className="relative space-y-6">
              <div className="grid gap-5 rounded-3xl border border-electric/15 bg-[#fffffa]/[0.06] p-5 sm:grid-cols-[1.15fr_0.85fr] sm:items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-[#fffffa]/70">Research direction</p>
                  <p className="mt-2 text-xl font-semibold text-[#fffffa]">Trustworthy AI for Clinical Decision Support</p>
                  <p className="mt-3 text-sm leading-7 text-[#fffffa]/72">
                    Interpretable medical AI, uncertainty-aware modelling, and healthcare systems designed for translational impact.
                  </p>
                </div>
                <div className="mx-auto w-full max-w-[240px]">
                  <div className="relative overflow-hidden rounded-[1.75rem] border border-[#fffffa]/20 bg-[linear-gradient(145deg,rgba(255,255,250,0.12),rgba(34,75,195,0.16))] p-2 shadow-[0_25px_70px_rgba(34,75,195,0.28)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,172,6,0.22),transparent_38%)]" />
                    <img
                      src={profile.personalInfo.profileImageUrl}
                      alt={`${profile.personalInfo.name} profile portrait`}
                      className="relative aspect-[4/5] w-full rounded-[1.25rem] object-cover"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {profile.hero.statCards.map((card, index) => (
                  <motion.div
                    key={card.label}
                    className="rounded-3xl border border-[#fffffa]/10 bg-[#fffffa]/[0.05] p-5"
                    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.12 + index * 0.06 }}
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-[#fffffa]/58">{card.label}</p>
                    <p className="mt-3 text-xl font-semibold text-[#fffffa]">{card.value}</p>
                  </motion.div>
                ))}
              </div>

              <div className="rounded-[1.75rem] border border-[#fffffa]/10 bg-[#fffffa]/[0.05] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm uppercase tracking-[0.28em] text-[#fffffa]/58">Current thesis stage</span>
                  <span className="rounded-full bg-cyan/12 px-3 py-1 text-xs font-medium text-cyan">Submitted</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#fffffa]/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan via-electric to-violet"
                    initial={reducedMotion ? false : { width: 0 }}
                    whileInView={{ width: '88%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  />
                </div>
                <p className="mt-3 text-sm leading-7 text-[#fffffa]/72">
                  Positioning research for postdoctoral collaboration across reliable AI, medical imaging, and translational healthcare systems.
                </p>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}