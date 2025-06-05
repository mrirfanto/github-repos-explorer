import { useState } from 'react';
import type { GitHubRepository } from '@/types/github';
import { fetchRepositories } from '@/repositories/fetchRepositories';

interface UseGetRepositoriesResult {
  repositories: GitHubRepository[];
  loading: boolean;
  error: string | null;
  selectedUser: string | null;
  fetchUserRepositories: (username: string) => Promise<void>;
}

export const useGetRepositories = (): UseGetRepositoriesResult => {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const fetchUserRepositories = async (username: string): Promise<void> => {
    if (!username.trim()) {
      return;
    }

    setLoading(true);
    setError(null);
    setSelectedUser(username);

    try {
      const repos = await fetchRepositories(username);
      setRepositories(repos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setRepositories([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    repositories,
    loading,
    error,
    selectedUser,
    fetchUserRepositories,
  };
};
