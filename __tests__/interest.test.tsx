import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Interest from '../src/app/interest/page'; // Adjust the import path as necessary

// Mock global fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Form submitted successfully' }),
  })
) as any;

// Uncomment and adjust if you're using useRouter
// vi.mock('next/navigation', () => ({
//   useRouter: () => ({
//     push: vi.fn(),
//   }),
// }));

describe('Interest Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(<Interest />);
  });

  it('allows user to input text fields', async () => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Name:/i), 'John Doe');
    await user.type(screen.getByLabelText(/Email:/i), 'john@example.com');
    await user.type(screen.getByLabelText(/Phone:/i), '1234567890');

    expect(screen.getByLabelText(/Name:/i)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/Email:/i)).toHaveValue('john@example.com');
    expect(screen.getByLabelText(/Phone:/i)).toHaveValue('1234567890');
  });

  it('allows user to select checkboxes and radio buttons', async () => {
    const user = userEvent.setup();

    await user.click(screen.getByLabelText(/October 8th/i));
    await user.click(screen.getByLabelText(/Chickens/i));
    await user.click(screen.getByLabelText(/Forward/i));
    await user.click(screen.getByLabelText(/Grass/i));

    expect(screen.getByLabelText(/October 8th/i)).toBeChecked();
    expect(screen.getByLabelText(/Chickens/i)).toBeChecked();
    expect(screen.getByLabelText(/Forward/i)).toBeChecked();
    expect(screen.getByLabelText(/Grass/i)).toBeChecked();
  });

  it('validates form fields before allowing submission', async () => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Name:/i), 'Jane Smith');
    // Do not fill in other required fields to test validation

    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('submits the form when all fields are valid', async () => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Name:/i), 'Jane Smith');
    await user.type(screen.getByLabelText(/Email:/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/Phone:/i), '1234567890');
    await user.click(screen.getByLabelText(/October 8th/i));
    await user.click(screen.getByLabelText(/Chickens/i));
    await user.click(screen.getByLabelText(/Forward/i));
    await user.click(screen.getByLabelText(/Grass/i));
    await user.type(screen.getByRole('textbox'), 'I love soccer.');

    // Mock window.location.reload
    // delete window.location;
    // window.location = { reload: vi.fn() } as any;

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(global.fetch).toHaveBeenCalledWith('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '1234567890',
        sunday: ['October 8th'],
        team: 'Chickens',
        position: 'Forward',
        field: 'Grass',
        opinion: 'I love soccer.',
      }),
    });

    // Uncomment if using router
    // expect(useRouter().push).toHaveBeenCalledWith('/thankyou');

    // Check if window.location.reload was called
    expect(window.location.reload).toHaveBeenCalled();
  });
});
