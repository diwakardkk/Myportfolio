'use client';

import { motion, useReducedMotion } from 'framer-motion';

const particles = [
  { left: '8%', top: '16%', size: 8, duration: 8 },
  { left: '18%', top: '38%', size: 10, duration: 10 },
  { left: '28%', top: '72%', size: 7, duration: 12 },
  { left: '46%', top: '20%', size: 6, duration: 11 },
  { left: '56%', top: '52%', size: 10, duration: 13 },
  { left: '68%', top: '26%', size: 8, duration: 9 },
  { left: '74%', top: '70%', size: 9, duration: 10 },
  { left: '84%', top: '42%', size: 7, duration: 12 },
  { left: '90%', top: '18%', size: 6, duration: 8 },
];

const lines = [
  { width: '26%', left: '7%', top: '24%', rotate: '8deg' },
  { width: '32%', left: '34%', top: '18%', rotate: '-10deg' },
  { width: '24%', left: '58%', top: '54%', rotate: '14deg' },
  { width: '28%', left: '18%', top: '64%', rotate: '-7deg' },
];

export function NeuralBackdrop() {
  const reducedMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-hero-radial opacity-90" />
      <div className="grid-overlay absolute inset-0 opacity-40" />

      <motion.div
        className="absolute left-[6%] top-12 h-64 w-64 rounded-full bg-cyan/20 blur-[120px]"
        animate={reducedMotion ? undefined : { x: [0, 20, 0], y: [0, -12, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[8%] top-36 h-72 w-72 rounded-full bg-violet/20 blur-[140px]"
        animate={reducedMotion ? undefined : { x: [0, -24, 0], y: [0, 16, 0], scale: [1.02, 1, 1.05] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-12 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-electric/10 blur-[150px]"
        animate={reducedMotion ? undefined : { y: [0, -18, 0], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {lines.map((line) => (
        <div
          key={`${line.left}-${line.top}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-cyan/35 to-transparent"
          style={{ width: line.width, left: line.left, top: line.top, transform: `rotate(${line.rotate})` }}
        />
      ))}

      {particles.map((particle, index) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className="absolute rounded-full bg-cyan/70 shadow-[0_0_18px_rgba(87,215,255,0.65)]"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, index % 2 === 0 ? -12 : 10, 0],
                  x: [0, index % 3 === 0 ? 10 : -6, 0],
                  opacity: [0.35, 0.95, 0.35],
                }
          }
          transition={{ duration: particle.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink" />
    </div>
  );
}