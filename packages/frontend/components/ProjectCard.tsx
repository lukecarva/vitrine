import Image from 'next/image';
import Link from 'next/link';

import type { ProjectSummary } from '@/lib/graphql/types';
import { StackList } from './StackList';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: ProjectSummary;
}

/**
 * Card for a single project in the listing grid.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const image = project.featuredImage?.node;
  const imageUrl = image?.sourceUrl;
  const monogram = project.title.trim().charAt(0).toUpperCase() || '•';

  return (
    <article className={`${styles.card} ${project.featured ? styles.featured : ''}`}>
      {imageUrl ? (
        // `fill` + a fixed-aspect wrapper keeps cards uniform and never
        // distorts arbitrary source ratios (it crops via object-fit: cover).
        // `sizes` lets Next serve an appropriately scaled image per breakpoint.
        <div className={styles.imageWrap}>
          <Image
            className={styles.image}
            src={imageUrl}
            alt={image?.altText || project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1120px) 50vw, 360px"
          />
        </div>
      ) : (
        // No cover image: a branded gradient placeholder keeps every card the
        // same shape so the grid stays even.
        <div className={`${styles.imageWrap} ${styles.placeholder}`} aria-hidden="true">
          <span className={styles.monogram}>{monogram}</span>
        </div>
      )}

      <div className={styles.body}>
        <div className={styles.meta}>
          {project.role || project.year ? (
            <p className={styles.role}>
              {project.role ? <span>{project.role}</span> : null}
              {project.role && project.year ? <span aria-hidden="true"> · </span> : null}
              {project.year ? <span>{project.year}</span> : null}
            </p>
          ) : null}
          {project.featured ? <span className={styles.badge}>Featured</span> : null}
        </div>

        <h2 className={styles.title}>
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h2>

        {project.excerpt ? (
          <div
            className={styles.excerpt}
            // project.excerpt is WordPress post HTML, filtered through wp_kses on
            // save except for trusted roles with the unfiltered_html capability.
            // It is rendered here as already-trusted markup, not re-sanitized on
            // the client.
            dangerouslySetInnerHTML={{ __html: project.excerpt }}
          />
        ) : null}

        <StackList stack={project.stack} />

        <span className={styles.cta} aria-hidden="true">
          View project
          <span className={styles.arrow}>→</span>
        </span>
      </div>
    </article>
  );
}
