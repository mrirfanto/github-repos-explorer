import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSearchUsers } from '.';
import * as fetchUsersRepo from '@/repositories/fetchUsers';

vi.mock('@/repositories/fetchUsers');

describe('useUserSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty state', () => {
    const { result } = renderHook(() => useSearchUsers());

    expect(result.current.users).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle successful search', async () => {
    const mockUsers = [
      { id: 1, login: 'test1', avatar_url: 'avatar1.jpg', html_url: 'url1' },
    ];

    vi.mocked(fetchUsersRepo.fetchUsers).mockResolvedValueOnce(mockUsers);

    const { result } = renderHook(() => useSearchUsers());

    await act(async () => {
      await result.current.searchUsers('test');
    });

    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle search errors', async () => {
    const errorMessage = 'API Error';
    vi.mocked(fetchUsersRepo.fetchUsers).mockRejectedValueOnce(
      new Error(errorMessage)
    );

    const { result } = renderHook(() => useSearchUsers());

    await act(async () => {
      await result.current.searchUsers('test');
    });

    expect(result.current.users).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.loading).toBe(false);
  });
});
