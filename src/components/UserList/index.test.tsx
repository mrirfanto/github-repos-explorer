import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserList } from '.';
import type { GitHubUser } from '@/types/github';
import { userEvent } from '@testing-library/user-event';
import { useGetRepositories } from '@/hooks/useGetRepositories';

vi.mock('@/hooks/useGetRepositories');

const mockUsers: GitHubUser[] = [
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
];

const mockQuery = 'testuser';
const mockLoading = false;
const mockFetchUserRepositories = vi.fn();

describe('UserList', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useGetRepositories).mockReturnValue({
      repositories: [],
      loading: false,
      fetchUserRepositories: mockFetchUserRepositories,
      error: null,
      selectedUser: null,
    });
  });

  it('should render list of users', () => {
    render(
      <UserList users={mockUsers} query={mockQuery} loading={mockLoading} />
    );

    expect(screen.getByText('testuser1')).toBeInTheDocument();
    expect(screen.getByText('testuser2')).toBeInTheDocument();
  });

  it('should render empty state when no users', () => {
    render(<UserList users={[]} query={mockQuery} loading={mockLoading} />);

    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('should trigger fetchUserRepositories when user is clicked', async () => {
    render(
      <UserList users={mockUsers} query={mockQuery} loading={mockLoading} />
    );

    await userEvent.click(screen.getByRole('button', { name: 'testuser1' }));

    expect(mockFetchUserRepositories).toHaveBeenCalledWith('testuser1');
  });
});
