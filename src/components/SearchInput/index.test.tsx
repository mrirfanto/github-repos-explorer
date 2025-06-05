import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { SearchInput } from '.';

describe('SearchInput', () => {
  const mockOnSearch = vi.fn();
  const mockOnSetQuery = vi.fn();
  const mockQuery = '';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render input with correct attributes', () => {
    render(
      <SearchInput
        onSearch={mockOnSearch}
        loading={false}
        query={mockQuery}
        onSetQuery={mockOnSetQuery}
      />
    );

    const input = screen.getByPlaceholderText('Enter username');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-label', 'Search GitHub users');
    expect(input).not.toBeDisabled();
  });

  it('should show "Showing users" text when query exists', () => {
    render(
      <SearchInput
        onSearch={mockOnSearch}
        loading={false}
        query="testuser"
        onSetQuery={mockOnSetQuery}
      />
    );

    expect(
      screen.getByText('Showing users for "testuser"')
    ).toBeInTheDocument();
  });

  it('should not show "Showing users" text when query is empty', () => {
    render(
      <SearchInput
        onSearch={mockOnSearch}
        loading={false}
        query=""
        onSetQuery={mockOnSetQuery}
      />
    );

    expect(screen.queryByText(/Showing users/)).not.toBeInTheDocument();
  });

  it('should trigger search when Enter key is pressed', async () => {
    render(
      <SearchInput
        onSearch={mockOnSearch}
        loading={false}
        query="testuser"
        onSetQuery={mockOnSetQuery}
      />
    );

    const input = screen.getByPlaceholderText('Enter username');
    await userEvent.type(input, 'testuser');
    await userEvent.keyboard('{Enter}');

    expect(mockOnSearch).toHaveBeenCalledWith('testuser');
  });

  it('should not trigger search when Enter key is pressed during loading', async () => {
    render(
      <SearchInput
        onSearch={mockOnSearch}
        loading={true}
        query="testuser"
        onSetQuery={mockOnSetQuery}
      />
    );

    await userEvent.keyboard('{Enter}');

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('should trigger search when search button is clicked', async () => {
    render(
      <SearchInput
        onSearch={mockOnSearch}
        loading={false}
        query="testuser"
        onSetQuery={mockOnSetQuery}
      />
    );

    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('testuser');
  });

  it('should disable input and button during loading', () => {
    render(
      <SearchInput
        onSearch={mockOnSearch}
        loading={true}
        query={mockQuery}
        onSetQuery={mockOnSetQuery}
      />
    );

    expect(screen.getByPlaceholderText('Enter username')).toBeDisabled();
    expect(screen.getByRole('button', { name: /search/i })).toBeDisabled();
  });

  it('should show loading spinner in button during loading', () => {
    render(
      <SearchInput
        onSearch={mockOnSearch}
        loading={true}
        query={mockQuery}
        onSetQuery={mockOnSetQuery}
      />
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
