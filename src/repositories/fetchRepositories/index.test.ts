import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchRepositories } from './index';

vi.mock('@/repositories/config', () => ({
  GITHUB_API_BASE: 'https://api.github.com',
  GITHUB_TOKEN: 'test-token',
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('fetchRepositories', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch repositories with correct headers and URL', async () => {
    const mockRepos = [
      {
        id: 1,
        name: 'test-repo',
        full_name: 'testuser/test-repo',
        description: 'A test repository',
        html_url: 'https://github.com/testuser/test-repo',
        language: 'JavaScript',
        updated_at: '2023-01-01T00:00:00Z',
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepos,
    } as Response);

    const result = await fetchRepositories('testuser');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.github.com/users/testuser/repos',
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer test-token`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );
    expect(result).toEqual(mockRepos);
  });

  it('should handle user not found', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    await expect(fetchRepositories('not-found')).rejects.toThrow(
      'User not found.'
    );
  });
});
