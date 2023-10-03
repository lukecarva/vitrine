import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProjectCard } from '@/components/ProjectCard';
import type { ProjectSummary } from '@/lib/graphql/types';

function makeProject(overrides: Partial<ProjectSummary> = {}): ProjectSummary {
  return {
    databaseId: 1,
    title: 'Headless Commerce',
    slug: 'headless-commerce',
    excerpt: '<p>A decoupled storefront.</p>',
    role: 'Full-stack',
    stack: ['React', 'WordPress', 'TypeScript'],
    featured: false,
    year: null,
    client: null,
    liveUrl: null,
    featuredImage: null,
    projectTags: null,
    ...overrides,
  };
}

describe('ProjectCard', () => {
  it('renders the title as a link to the project page', () => {
    render(<ProjectCard project={makeProject()} />);

    const link = screen.getByRole('link', { name: 'Headless Commerce' });
    expect(link).toHaveAttribute('href', '/projects/headless-commerce');
  });

  it('renders each technology in the stack', () => {
    render(<ProjectCard project={makeProject()} />);

    for (const tech of ['React', 'WordPress', 'TypeScript']) {
      expect(screen.getByText(tech)).toBeInTheDocument();
    }
  });

  it('shows a Featured badge only for featured projects', () => {
    const { rerender } = render(<ProjectCard project={makeProject({ featured: false })} />);
    expect(screen.queryByText('Featured')).not.toBeInTheDocument();

    rerender(<ProjectCard project={makeProject({ featured: true })} />);
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('omits the role when absent', () => {
    render(<ProjectCard project={makeProject({ role: null })} />);
    expect(screen.queryByText('Full-stack')).not.toBeInTheDocument();
  });

  it('shows the year when present', () => {
    render(<ProjectCard project={makeProject({ year: 2025 })} />);
    expect(screen.getByText('2025')).toBeInTheDocument();
  });
});
