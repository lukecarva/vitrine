import type { Metadata } from 'next';
import Link from 'next/link';

const REPO_URL = 'https://github.com/lukecarva/vitrine';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Vitrine is a production-shaped reference that decouples WordPress from a typed Next.js frontend.',
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'website',
    title: 'About — Vitrine',
    description:
      'Vitrine is a production-shaped reference that decouples WordPress from a typed Next.js frontend.',
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <article>
      <section className="hero">
        <span className="hero__eyebrow">About the project</span>
        <h1>
          A headless stack, <em>done properly</em>.
        </h1>
        <p className="lead">
          Vitrine is a small but complete reference for building a decoupled site: WordPress owns
          content and editing, and a typed Next.js frontend serves it — fast, static, and
          revalidated on demand.
        </p>
      </section>

      <div className="prose">
        <h2>How it works</h2>
        <p>
          Editors manage <strong>Project</strong> entries in wp-admin. WordPress never renders them
          with a theme; instead it exposes the content through WPGraphQL and a lean REST namespace.
          The Next.js app reads that content at build time, pre-renders a static page per project,
          and revalidates on an interval and on demand when a project changes.
        </p>

        <h2>The stack</h2>
        <ul>
          <li>
            <strong>CMS &amp; API</strong> — WordPress 6.8 with a custom, namespaced plugin (PSR-4),
            a custom post type, registered meta, and a flat tag taxonomy.
          </li>
          <li>
            <strong>Data access</strong> — WPGraphQL (primary) and a custom <code>hwr/v1</code> REST
            namespace, defined from a single source of truth so the surfaces cannot drift.
          </li>
          <li>
            <strong>Frontend</strong> — Next.js App Router, React and TypeScript, with GraphQL
            queries validated against the live schema in CI.
          </li>
          <li>
            <strong>Editing</strong> — a native Gutenberg document-sidebar panel built in React, with
            an optional ACF field group.
          </li>
        </ul>

        <h2>Engineering practices</h2>
        <p>
          The project leans on the practices that make a codebase trustworthy: tests on both sides
          (PHPUnit, Vitest and Playwright), linting and static analysis (PHPCS, PHPStan, ESLint),
          a secure-by-default posture (per-post capability checks, signed preview links, restrictive
          CORS and rate-limited webhooks), and documented architecture decisions.
        </p>

        <p>
          The full write-up, architecture diagram and decision records live in the{' '}
          <a href={REPO_URL} target="_blank" rel="noreferrer noopener">
            source repository
          </a>
          .
        </p>
      </div>

      <p style={{ marginTop: '2.5rem' }}>
        <Link className="button button--ghost" href="/">
          ← Back to work
        </Link>
      </p>
    </article>
  );
}
