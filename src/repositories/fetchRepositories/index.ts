import type { GitHubRepository } from '@/types/github';
import { GITHUB_API_BASE, GITHUB_TOKEN } from '@/repositories/config';

export const fetchRepositories = async (
  username: string
): Promise<GitHubRepository[]> => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos`, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new Error('User not found.');
        case 403:
          throw new Error('API rate limit exceeded. Please try again later.');
        default:
          throw new Error(`GitHub API error: ${response.statusText}`);
      }
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(
      'An unexpected error occurred while fetching repositories.'
    );
  }
};
