import { fetchUsers } from '@/repositories/fetchUsers';
import type { GitHubUser } from '@/types/github';
import { useState } from 'react';

interface UseUserSearchResult {
  clearResults: () => void;
  error: string | null;
  loading: boolean;
  searchUsers: (query: string) => Promise<void>;
  users: GitHubUser[];
}

export const useSearchUsers = (): UseUserSearchResult => {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearchUsers = async (query: string) => {
    if (!query.trim()) {
      clearResults();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const users = await fetchUsers(query);
      setUsers(users);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setUsers([]);
    setError(null);
  };

  return {
    users,
    loading,
    error,
    clearResults,
    searchUsers: handleSearchUsers,
  };
};
