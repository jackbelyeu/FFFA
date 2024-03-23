import { test, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RSVP from "../src/app/[team]/rsvp/page";
const originalFetch = global.fetch;

test("renders RSVP for a valid team and allows user interaction", async () => {
  render(<RSVP params={{ team: "emus" }} />);

  const header = await screen.findByRole("heading", { name: "RSVP FOR EMUS" });
  expect(header).toBeTruthy();

  const table = screen.getAllByRole("table")[0];
  expect(table).toBeTruthy();
});

test("renders error message for an invalid team", async () => {
  render(<RSVP params={{ team: "invalid_team" }} />);

  const errorHeading = screen.queryByRole("heading", { name: "Invalid Team" });
  expect(errorHeading).toBeTruthy();

  const sorryText = screen.queryByText(/sorry/i);
  expect(sorryText).toBeTruthy();
  global.fetch = originalFetch;
});
