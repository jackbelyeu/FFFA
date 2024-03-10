import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Login from '../src/app/edit_sch_security/page'; // Adjust the import path as necessary

// Mock useRouterw
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Login Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('renders the login form', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('alerts with incorrect password and clears input', async () => {
    render(<Login />);
    const input = screen.getByPlaceholderText('Enter password');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    const user = userEvent.setup();

    window.alert = vi.fn(); // Mock window.alert

    await user.type(input, 'WrongPassword');
    fireEvent.click(loginButton);

    expect(window.alert).toHaveBeenCalledWith('Incorrect password!');
    expect(input).toHaveValue(''); // Input should be cleared after incorrect password
  });

//   it('navigates to "/Edit-sch" with correct password', async () => {
//     const { useRouter } = require('next/navigation'); // Grab the mocked useRouter
//     render(<Login />);
//     const input = screen.getByPlaceholderText('Enter password');
//     const loginButton = screen.getByRole('button', { name: 'Login' });
//     const user = userEvent.setup();

//     await user.type(input, 'Hello');
//     fireEvent.click(loginButton);

//     expect(useRouter().push).toHaveBeenCalledWith('/Edit-sch');
//   });
});
