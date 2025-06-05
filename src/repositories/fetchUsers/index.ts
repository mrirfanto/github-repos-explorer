import type { GitHubUser } from '@/types/github';
import type { SearchUsersResponse } from './types';
import { GITHUB_API_BASE, GITHUB_TOKEN } from '@/repositories/config';

export const fetchUsers = async (query: string): Promise<GitHubUser[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(
        query
      )}&per_page=5`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );

    if (!response.ok) {
      switch (response.status) {
        case 403:
          throw new Error('API rate limit exceeded. Please try again later.');
        case 404:
          throw new Error('No users found matching your search.');
        case 422:
          throw new Error(
            'Invalid search query. Please try different keywords.'
          );
        default:
          throw new Error(`GitHub API error: ${response.statusText}`);
      }
    }

    const data: SearchUsersResponse = await response.json();
    return data.items;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while searching users.');
  }
};
