import { JsonLd } from '@/components/JsonLd';
import { ProjectGrid } from '@/components/ProjectGrid';
import { getProjects } from '@/lib/projects';
import { env } from '@/lib/env';

// Statically generated, revalidated on an interval (ISR). Next requires this to
// be a literal; keep it in sync with REVALIDATE_SECONDS in lib/config.ts.
export const revalidate = 60;

const REPO_URL = 'https://github.com/lukecarva/vitrine';

export default async function HomePage() {
  const projects = await getProjects();

  const stackCount = new Set(projects.flatMap((project) => project.stack)).size;
  const featuredCount = projects.filter((project) => project.featured).length;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Vitrine — Selected work',
    url: `${env.siteUrl}/`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${env.siteUrl}/projects/${project.slug}`,
        name: project.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="hero">
        <h1>
          Selected <em>work</em>, served headless.
        </h1>
        <p className="lead">
          Projects managed in WordPress and delivered through a decoupled React frontend. Typed end
          to end with WPGraphQL, statically rendered and revalidated on demand.
        </p>

        <div className="hero__actions">
          <a className="button" href="#projects">
            Browse projects
          </a>
          <a className="button button--ghost" href={REPO_URL} target="_blank" rel="noreferrer noopener">
            View source ↗
          </a>
        </div>

        {projects.length > 0 ? (
          <dl className="hero__stats">
            <div>
              <dt>Projects</dt>
              <dd>{projects.length}</dd>
            </div>
            <div>
              <dt>Technologies</dt>
              <dd>{stackCount}</dd>
            </div>
            <div>
              <dt>Featured</dt>
              <dd>{featuredCount}</dd>
            </div>
          </dl>
        ) : null}
      </section>

      <div className="section-head" id="projects">
        <h2>Projects</h2>
        {projects.length > 0 ? (
          <span className="section-head__count">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </span>
        ) : null}
      </div>

      {projects.length === 0 ? (
        <p>
          No projects yet. Add a few in{' '}
          <a href={`${env.wordpressUrl}/wp-admin/edit.php?post_type=project`}>wp-admin</a>.
        </p>
      ) : (
        <ProjectGrid projects={projects} />
      )}
    </>
  );
}
