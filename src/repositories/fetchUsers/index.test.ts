import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchUsers } from '.';

vi.mock('@/repositories/config', () => ({
  GITHUB_API_BASE: 'https://api.github.com',
  GITHUB_TOKEN: 'test-token',
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('fetchUsers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch users with correct headers and URL', async () => {
    const mockResponse = {
      total_count: 2,
      items: [
        {
          id: 1,
          login: 'testuser1',
          avatar_url: 'https://avatar1.jpg',
          html_url: 'https://github.com/testuser1',
        },
        {
          id: 2,
          login: 'testuser2',
          avatar_url: 'https://avatar2.jpg',
          html_url: 'https://github.com/testuser2',
        },
      ],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await fetchUsers('test');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.github.com/search/users?q=test&per_page=5',
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer test-token`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );
    expect(result).toEqual(mockResponse.items);
  });

  it('should handle API rate limiting (403)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
      statusText: 'Forbidden',
    } as Response);

    await expect(fetchUsers('test')).rejects.toThrow(
      'API rate limit exceeded. Please try again later.'
    );
  });

  it('should handle user not found (404)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as Response);

    await expect(fetchUsers('test')).rejects.toThrow(
      'No users found matching your search.'
    );
  });

  it('should handle network errors', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchUsers('test')).rejects.toThrow('Network error');
  });

  it('should handle empty query', async () => {
    const result = await fetchUsers('');
    expect(result).toEqual([]);
    expect(mockFetch).not.toHaveBeenCalled();
  });
});
