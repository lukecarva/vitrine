import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { ThemeToggle } from '@/components/ThemeToggle';
import { env } from '@/lib/env';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700'],
  variable: '--font-display',
});

const REPO_URL = 'https://github.com/lukecarva/vitrine';

const SITE_NAME = 'Vitrine';
const SITE_TITLE = 'Vitrine — Headless WordPress + React';
const SITE_DESCRIPTION =
  'Selected projects, served from a headless WordPress backend through a Next.js frontend.';

// Sets the theme before first paint so there is no flash of the wrong theme.
// Only an explicit choice forces a theme; otherwise the OS preference wins.
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export const metadata: Metadata = {
  // Resolves relative canonical/Open Graph URLs to absolute ones.
  metadataBase: new URL(env.siteUrl),
  title: {
    default: SITE_TITLE,
    template: '%s — Vitrine',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  // Tints the browser UI to match the active theme.
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f7fb' },
    { media: '(prefers-color-scheme: dark)', color: '#070a14' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <header className="site-header">
          <div className="container site-header__inner">
            <Link href="/" className="brand" aria-label={`${SITE_NAME}, home`}>
              Vit<span>rine</span>
            </Link>
            <div className="site-header__right">
              <nav className="site-nav" aria-label="Primary">
                <Link href="/" className="site-nav__link">
                  Work
                </Link>
                <Link href="/about" className="site-nav__link">
                  About
                </Link>
                <a
                  href={REPO_URL}
                  className="site-nav__link"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Source ↗
                </a>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main id="main-content" className="container site-main">
          {children}
        </main>
        <footer className="site-footer">
          <div className="container site-footer__inner">
            <p className="site-footer__note">A headless WordPress + React reference.</p>
            <a
              href={REPO_URL}
              className="site-nav__link"
              target="_blank"
              rel="noreferrer noopener"
            >
              Source ↗
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
