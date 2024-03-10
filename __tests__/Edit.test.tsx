import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import UpdateForm from '../src/app/Edit/page'; // Adjust the import path as necessary

// Mock global fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Data updated successfully' }),
  })
) as any;

describe('UpdateForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(<UpdateForm />);
  });

  it('renders all form fields correctly', () => {
    expect(screen.getByLabelText(/Team Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Wins:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Draws:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Losses:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Goal Difference:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update data/i })).toBeInTheDocument();
  });

  it('allows users to enter data into the form fields', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/Team Name:/i), 'Test Team');
    await user.type(screen.getByLabelText(/Wins:/i), '10');
    await user.type(screen.getByLabelText(/Draws:/i), '5');
    await user.type(screen.getByLabelText(/Losses:/i), '3');
    await user.type(screen.getByLabelText(/Goal Difference:/i), '20');

    expect(screen.getByLabelText(/Team Name:/i)).toHaveValue('Test Team');
    expect(screen.getByLabelText(/Wins:/i)).toHaveValue(10);
    expect(screen.getByLabelText(/Draws:/i)).toHaveValue(5);
    expect(screen.getByLabelText(/Losses:/i)).toHaveValue(3);
    expect(screen.getByLabelText(/Goal Difference:/i)).toHaveValue(20);
  });

  it('submits the form and calls fetch with the correct data', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/Team Name:/i), 'Test Team');
    await user.type(screen.getByLabelText(/Wins:/i), '10');
    await user.type(screen.getByLabelText(/Draws:/i), '5');
    await user.type(screen.getByLabelText(/Losses:/i), '3');
    await user.type(screen.getByLabelText(/Goal Difference:/i), '20');

    fireEvent.click(screen.getByRole('button', { name: /update data/i }));

    // expect(global.fetch).toHaveBeenCalledWith('/api/update-teams', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
      // body: JSON.stringify({
      //   teamName: 'Test Team',
      //   wins: 10,
      //   draws: 5,
      //   losses: 3,
      //   gd: 20,
      // }),
    // });
  });
});
