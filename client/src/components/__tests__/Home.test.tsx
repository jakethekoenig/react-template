import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../Home';
import { vi } from 'vitest';

// Mock fetch globally
global.fetch = vi.fn();

describe('Home Component', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    vi.resetAllMocks();
    // Mock successful notes fetch
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, content: 'Test note', timestamp: new Date().toISOString() }],
    });
  });

  it('renders notes heading', () => {
    render(<Home />);
    expect(screen.getByText('Notes')).toBeInTheDocument();
  });

  it('renders note input form', () => {
    render(<Home />);
    expect(screen.getByPlaceholderText('Enter a new note...')).toBeInTheDocument();
    expect(screen.getByText('Add Note')).toBeInTheDocument();
  });

  it('displays fetched notes', async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText('Test note')).toBeInTheDocument();
    });
  });

  it('allows adding new notes', async () => {
    // Mock successful post request
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 2, content: 'New note', timestamp: new Date().toISOString() }),
    });

    render(<Home />);

    const input = screen.getByPlaceholderText('Enter a new note...');
    const submitButton = screen.getByText('Add Note');

    fireEvent.change(input, { target: { value: 'New note' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/notes'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ content: 'New note' }),
        })
      );
    });
  });
});
