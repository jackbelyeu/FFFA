import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import MatchForm from '../src/app/Edit-sch/page'; // Adjust the import path as necessary
import { UserEvent, userEvent } from '@testing-library/user-event';



// Mock global fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Success' }),
  })
) as any;

describe('MatchForm Component', () => {
    let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
    vi.resetAllMocks();
    render(<MatchForm />);
  });

  it('switches between Add and Update mode', async () => {
    // Initially in Add Mode
    expect(screen.getByRole('button', { name: /Add Match/i })).toBeInTheDocument();
    expect(screen.queryByLabelText(/Match ID:/i)).not.toBeInTheDocument();

    // Switch to Update Mode
    await user.click(screen.getByRole('button', { name: /Update Match/i }));
    expect(screen.getByRole('button', { name: /Update Match/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Match ID:/i)).toBeInTheDocument();
  });

  it('allows input in Add mode and submits form', async () => {
    // Fill in the form
    await user.type(screen.getByLabelText(/Home Team:/i), 'Team A');
    await user.type(screen.getByLabelText(/Away Team:/i), 'Team B');
    await user.type(screen.getByLabelText(/Match Date:/i), '2024-03-10');
    await user.type(screen.getByLabelText(/Match Time:/i), '15:00');
    await user.type(screen.getByLabelText(/Location:/i), 'Stadium X');
    await user.type(screen.getByLabelText(/Match Day:/i), '1');
    await user.click(screen.getByRole('button', { name: /Add Match/i }));

    // Check if fetch was called correctly
    expect(global.fetch).toHaveBeenCalledWith('/api/add-sch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        matchID: 0,
        teamNameA: 'Team A',
        teamNameB: 'Team B',
        matchDate: '2024-03-10',
        matchTime: '15:00',
        location: 'Stadium X',
        matchDay: 1,
      }),
    });
  });

  it('allows input in Update mode and submits form', async () => {
    // Switch to Update Mode
    await user.click(screen.getByRole('button', { name: /Update Match/i }));

    // Fill in the form
    await user.type(screen.getByLabelText(/Match ID:/i), '123');
    await user.type(screen.getByLabelText(/Home Team:/i), 'Team C');
    await user.type(screen.getByLabelText(/Away Team:/i), 'Team D');
    await user.type(screen.getByLabelText(/Match Date:/i), '2024-03-11');
    await user.type(screen.getByLabelText(/Match Time:/i), '18:00');
    await user.type(screen.getByLabelText(/Location:/i), 'Stadium Y');
    await user.type(screen.getByLabelText(/Match Day:/i), '2');
    await user.click(screen.getByRole('button', { name: /Update Match/i }));

    // Check if fetch was called correctly
    expect(global.fetch).toHaveBeenCalledWith('/api/update-sch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        matchID: 123,
        teamNameA: 'Team C',
        teamNameB: 'Team D',
        matchDate: '2024-03-11',
        matchTime: '18:00',
        location: 'Stadium Y',
        matchDay: 2,
      }),
    });
  });

  afterEach(() => {
    // Clean up DOM
    vi.restoreAllMocks();
  });
});
