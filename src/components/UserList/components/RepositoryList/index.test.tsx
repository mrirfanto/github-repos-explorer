import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RepositoryList } from '.';
import type { GitHubRepository } from '@/types/github';

const mockRepositories: GitHubRepository[] = [
  {
    id: 1,
    name: 'awesome-project',
    full_name: 'testuser/awesome-project',
    description: 'An awesome project for testing',
    html_url: 'https://github.com/testuser/awesome-project',
    stargazers_count: 42,
    language: 'JavaScript',
    updated_at: '2023-12-01T10:30:00Z',
  },
  {
    id: 2,
    name: 'simple-tool',
    full_name: 'testuser/simple-tool',
    description: 'A simple tool for testing',
    html_url: 'https://github.com/testuser/simple-tool',
    stargazers_count: 0,
    language: 'TypeScript',
    updated_at: '2023-11-15T15:45:00Z',
  },
];

describe('RepositoryList', () => {
  it('should render loading state', () => {
    render(
      <RepositoryList repositories={[]} loading={true} username="testuser" />
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should render empty state when user has no repositories', () => {
    render(
      <RepositoryList repositories={[]} loading={false} username="testuser" />
    );

    expect(
      screen.getByText("testuser doesn't have any public repositories yet.")
    ).toBeInTheDocument();
  });

  it('should display repository stats correctly', () => {
    render(
      <RepositoryList
        repositories={mockRepositories}
        loading={false}
        username="testuser"
      />
    );

    expect(screen.getByText('42')).toBeInTheDocument(); // stars
    expect(screen.getByText('awesome-project')).toBeInTheDocument(); // title
    expect(
      screen.getByText('An awesome project for testing')
    ).toBeInTheDocument(); // description
  });
});
