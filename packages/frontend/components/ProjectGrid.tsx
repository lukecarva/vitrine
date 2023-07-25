'use client';

import { useMemo, useState } from 'react';

import type { ProjectSummary } from '@/lib/graphql/types';
import { ProjectCard } from './ProjectCard';
import styles from './ProjectGrid.module.css';

interface ProjectGridProps {
  projects: ProjectSummary[];
}

/**
 * Renders the project grid with a client-side tag filter. Tags are derived from
 * the projects themselves, so the control appears only when there is something
 * to filter by.
 */
export function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const bySlug = new Map<string, string>();
    for (const project of projects) {
      for (const tag of project.projectTags?.nodes ?? []) {
        bySlug.set(tag.slug, tag.name);
      }
    }
    return Array.from(bySlug, ([slug, name]) => ({ slug, name })).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [projects]);

  const filtered = activeTag
    ? projects.filter((project) =>
        (project.projectTags?.nodes ?? []).some((tag) => tag.slug === activeTag),
      )
    : projects;

  return (
    <>
      {tags.length > 0 ? (
        <div className={styles.filters} role="group" aria-label="Filter projects by tag">
          <button
            type="button"
            className={`${styles.chip} ${activeTag === null ? styles.active : ''}`}
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag.slug}
              type="button"
              className={`${styles.chip} ${activeTag === tag.slug ? styles.active : ''}`}
              onClick={() => setActiveTag(tag.slug)}
              aria-pressed={activeTag === tag.slug}
            >
              {tag.name}
            </button>
          ))}
        </div>
      ) : null}

      <section className="grid">
        {filtered.map((project) => (
          <ProjectCard key={project.databaseId} project={project} />
        ))}
      </section>

      {filtered.length === 0 ? (
        <p className={styles.empty}>No projects match that tag.</p>
      ) : null}
    </>
  );
}
