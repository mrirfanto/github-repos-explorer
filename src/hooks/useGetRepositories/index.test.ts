import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGetRepositories } from '.';
import * as fetchRepositoriesRepo from '@/repositories/fetchRepositories';

vi.mock('@/repositories/fetchRepositories');

const mockRepositories = [
  {
    id: 1,
    name: 'test-repo-1',
    full_name: 'testuser/test-repo-1',
    description: 'A test repository',
    html_url: 'https://github.com/testuser/test-repo-1',
    stargazers_count: 10,
    language: 'JavaScript',
    updated_at: '2023-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'test-repo-2',
    full_name: 'testuser/test-repo-2',
    description: 'A test repository',
    html_url: 'https://github.com/testuser/test-repo-2',
    stargazers_count: 5,
    language: 'TypeScript',
    updated_at: '2023-01-02T00:00:00Z',
  },
];

describe('useGetRepositories', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty state', () => {
    const { result } = renderHook(() => useGetRepositories());

    expect(result.current.repositories).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.selectedUser).toBe(null);
  });

  it('should handle successful repository fetch', async () => {
    vi.mocked(fetchRepositoriesRepo.fetchRepositories).mockResolvedValueOnce(
      mockRepositories
    );

    const { result } = renderHook(() => useGetRepositories());

    await act(async () => {
      await result.current.fetchUserRepositories('testuser');
    });

    expect(result.current.repositories).toEqual(mockRepositories);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.selectedUser).toBe('testuser');
  });

  it('should handle repository fetch errors', async () => {
    const errorMessage = 'User not found';
    vi.mocked(fetchRepositoriesRepo.fetchRepositories).mockRejectedValueOnce(
      new Error(errorMessage)
    );

    const { result } = renderHook(() => useGetRepositories());

    await act(async () => {
      await result.current.fetchUserRepositories('no user');
    });

    expect(result.current.repositories).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.loading).toBe(false);
    expect(result.current.selectedUser).toBe('no user');
  });

  it('should set loading state during fetch', async () => {
    vi.mocked(fetchRepositoriesRepo.fetchRepositories).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve([]), 100))
    );

    const { result } = renderHook(() => useGetRepositories());

    act(() => {
      result.current.fetchUserRepositories('testuser');
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.selectedUser).toBe('testuser');
  });

  it('should not fetch with empty username', async () => {
    const { result } = renderHook(() => useGetRepositories());

    await act(async () => {
      await result.current.fetchUserRepositories('');
    });

    expect(fetchRepositoriesRepo.fetchRepositories).not.toHaveBeenCalled();
    expect(result.current.repositories).toEqual([]);
  });
});
