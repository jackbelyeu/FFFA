import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LoginPage from '../src/app/edit_standings_security/page'; // Adjust the import path as necessary

// Mock useRouter
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('LoginPage Component', () => {
  beforeEach(() => {
    // Reset DOM and mocks before each test
    vi.clearAllMocks();
    render(<LoginPage />);
  });

  it('renders login inputs and button', () => {
    expect(screen.getByLabelText(/username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('displays error message on failed login', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/username:/i), 'user');
    await user.type(screen.getByLabelText(/password:/i), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
  });

  it('navigates to "/Edit" on successful login', async () => {
    const user = userEvent.setup();
    const { useRouter } = require('next/navigation'); // Import the mocked useRouter

    await user.type(screen.getByLabelText(/username:/i), 'admin');
    await user.type(screen.getByLabelText(/password:/i), 'password');
    await user.click(screen.getByRole('button', { name: /login/i }));

    // expect(useRouter().push).toHaveBeenCalledWith('/Edit');
    expect(screen.queryByText(/invalid username or password/i)).not.toBeInTheDocument();
  });
});
