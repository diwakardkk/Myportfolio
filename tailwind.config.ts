import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#112675',
        surface: '#16318b',
        panel: '#224bc3',
        cyan: '#38ac06',
        electric: '#224bc3',
        violet: '#fffffa',
      },
      fontFamily: {
        display: ['var(--font-sora)'],
        body: ['var(--font-jakarta)'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255, 255, 250, 0.18), 0 18px 60px rgba(34, 75, 195, 0.22)',
        card: '0 20px 80px rgba(16, 31, 95, 0.32)',
      },
      backgroundImage: {
        'grid-fade': 'linear-gradient(rgba(255, 255, 250, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 250, 0.1) 1px, transparent 1px)',
        'hero-radial': 'radial-gradient(circle at top, rgba(255, 255, 250, 0.16), transparent 28%), radial-gradient(circle at 80% 20%, rgba(56, 172, 6, 0.18), transparent 26%), radial-gradient(circle at 50% 60%, rgba(34, 75, 195, 0.2), transparent 24%)',
      },
      animation: {
        float: 'float 10s ease-in-out infinite',
        pulseGlow: 'pulseGlow 6s ease-in-out infinite',
        drift: 'drift 16s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.08)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(12px, -18px, 0)' },
          '100%': { transform: 'translate3d(0, 0, 0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;