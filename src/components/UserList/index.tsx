import type { GitHubUser } from '@/types/github';
import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi2';

interface UserListProps {
  query: string;
  users: GitHubUser[];
  loading: boolean;
  onSelectUser: (user: GitHubUser) => void;
}

export const UserList = ({
  users,
  query,
  loading,
  onSelectUser,
}: UserListProps) => {
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);

  const handleToggleExpand = (userId: number) => {
    const user = users.find((user) => user.id === userId);

    if (user) {
      setExpandedUserId((prev) => (prev === userId ? null : userId));
      onSelectUser(user);
    }
  };

  if (users.length === 0 && query.trim() !== '' && !loading) {
    return <div>No users found</div>;
  }

  return (
    <div className="space-y-3">
      <ul className="space-y-3 list-none p-0 m-0">
        {users.map((user) => {
          const expanded = expandedUserId === user.id;
          return (
            <li key={user.id} className="bg-gray-100">
              <button
                type="button"
                className="w-full flex items-center justify-between px-4 py-3 focus:outline-none"
                onClick={() => handleToggleExpand(user.id)}
                aria-expanded={expanded}
                aria-controls={`user-accordion-${user.id}`}
              >
                <span className="font-bold text-gray-900 text-left">
                  {user.login}
                </span>
                <span
                  className={`transition-transform duration-200 ${
                    expanded ? 'rotate-180' : ''
                  }`}
                >
                  <HiChevronDown size={20} />
                </span>
              </button>
              {expanded && (
                <div
                  id={`user-accordion-${user.id}`}
                  className="animate-fade-in"
                >
                  <ul className="bg-white text-gray-700 text-sm list-none p-4 pr-0 m-0">
                    <li className="bg-gray-200">test</li>
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
