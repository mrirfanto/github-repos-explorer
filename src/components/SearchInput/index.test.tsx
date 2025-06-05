import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from '.';

describe('SearchInput', () => {
  it('should render input with placeholder', () => {
    render(<SearchInput onSearch={vi.fn()} loading={false} />);

    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  it('should call onSearch when Enter is pressed', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();

    render(<SearchInput onSearch={mockOnSearch} loading={false} />);

    const input = screen.getByPlaceholderText('Enter username');
    await user.type(input, 'testuser');
    await user.keyboard('{Enter}');

    expect(mockOnSearch).toHaveBeenCalledWith('testuser');
  });

  it('should call onSearch when search button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();

    render(<SearchInput onSearch={mockOnSearch} loading={false} />);

    const input = screen.getByPlaceholderText('Enter username');
    await user.type(input, 'testuser');

    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('testuser');
  });

  it('should disable input and button when loading', () => {
    render(<SearchInput onSearch={vi.fn()} loading={true} />);

    expect(screen.getByPlaceholderText('Enter username')).toBeDisabled();
    expect(screen.getByRole('button', { name: /search/i })).toBeDisabled();
  });

  it('should show loading state in button', () => {
    render(<SearchInput onSearch={vi.fn()} loading={true} />);

    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
