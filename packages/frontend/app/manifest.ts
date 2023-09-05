import type { MetadataRoute } from 'next';

/**
 * Web app manifest (served at /manifest.webmanifest and linked automatically by
 * Next). Makes the site installable and gives it a name, colors and icon.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vitrine — Headless WordPress + React',
    short_name: 'Vitrine',
    description:
      'Selected projects, served from a headless WordPress backend through a Next.js frontend.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070a14',
    theme_color: '#5b53f0',
    icons: [
      {
        src: '/icon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
        purpose: 'any',
      },
    ],
  };
}
