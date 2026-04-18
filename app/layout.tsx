import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Sora } from 'next/font/google';

import { profile } from '@/data/profile';
import '@/styles/globals.css';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: profile.seo.title,
  description: profile.seo.description,
  keywords: profile.seo.keywords,
  metadataBase: new URL('https://example.netlify.app'),
  openGraph: {
    title: profile.seo.title,
    description: profile.seo.description,
    type: 'website',
    images: [profile.seo.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: profile.seo.title,
    description: profile.seo.description,
    images: [profile.seo.ogImage],
  },
  alternates: {
    canonical: '/',
  },
};

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#050816',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${sora.variable} ${jakarta.variable} font-body text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}