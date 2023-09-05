import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <section className="hero">
      <span className="hero__eyebrow">Error 404</span>
      <h1>
        This page is <em>off the map</em>.
      </h1>
      <p className="lead">
        The page you are looking for does not exist or may have moved. Let&apos;s get you back to the
        work.
      </p>
      <div className="hero__actions">
        <Link className="button" href="/">
          Back to work
        </Link>
        <Link className="button button--ghost" href="/about">
          About the project
        </Link>
      </div>
    </section>
  );
}
