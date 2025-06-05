import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { UserList } from '.';
import type { GitHubUser } from '@/types/github';

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

describe('UserList', () => {
  it('should render list of users', () => {
    render(
      <UserList
        users={mockUsers}
        onSelectUser={vi.fn()}
        query={mockQuery}
        loading={mockLoading}
      />
    );

    expect(screen.getByText('testuser1')).toBeInTheDocument();
    expect(screen.getByText('testuser2')).toBeInTheDocument();
  });

  it('should call onSelectUser when user is clicked', async () => {
    const mockOnSelectUser = vi.fn();

    render(
      <UserList
        users={mockUsers}
        onSelectUser={mockOnSelectUser}
        query={mockQuery}
        loading={mockLoading}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: 'testuser1' }));

    expect(mockOnSelectUser).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('should render empty state when no users', () => {
    render(
      <UserList
        users={[]}
        onSelectUser={vi.fn()}
        query={mockQuery}
        loading={mockLoading}
      />
    );

    expect(screen.getByText('No users found')).toBeInTheDocument();
  });
});
