import { LoadingSpinner } from '@/components/LoadingSpinner';
import type { GitHubRepository } from '@/types/github';
import { HiStar } from 'react-icons/hi';

interface RepositoryListProps {
  repositories: GitHubRepository[];
  loading: boolean;
  username: string;
}

export const RepositoryList = ({
  repositories,
  loading,
  username,
}: RepositoryListProps) => {
  if (repositories.length === 0 && !loading) {
    return (
      <div className="bg-white p-4 pr-0">
        <p className="text-gray-500">
          {username} doesn&apos;t have any public repositories yet.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center p-4">
        <LoadingSpinner size={32} />
      </div>
    );
  }

  return (
    <ul className="bg-white text-sm list-none pl-4 pt-4 m-0 flex flex-col gap-4">
      {repositories.map((repository) => (
        <li key={repository.id} className="bg-gray-200 p-4 text-black">
          <div className="flex gap-4">
            <div className="flex-grow">
              <p className="text-lg font-bold">{repository.name}</p>
              <p className="text-sm">{repository.description}</p>
            </div>
            <div>
              <p className="flex gap-2 font-bold items-center">
                {repository.stargazers_count} <HiStar />
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
