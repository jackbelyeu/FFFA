import { expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Admin from "../src/app/admin/page";

test("Submitting the form triggers API call", async () => {
  // Mock fetch function
  const mockFetch = async () => ({ ok: true });

  // Replace global fetch with the mock implementation
  global.fetch = mockFetch as any;

  render(<Admin />);

  // Fill the form
  fireEvent.change(screen.getByLabelText(/Year/i), {
    target: { value: "2023" },
  });
  fireEvent.change(screen.getByLabelText(/Team/i), {
    target: { value: "Team A" },
  });
  fireEvent.change(screen.getByLabelText(/W/i), { target: { value: "5" } });

  // Use more specific selectors for D, L, and GD inputs
  fireEvent.change(screen.getByLabelText("D:"), { target: { value: "3" } });
  fireEvent.change(screen.getByLabelText("L:"), { target: { value: "2" } });
  fireEvent.change(screen.getByLabelText("GD:"), { target: { value: "10" } });

  // Submit the form
  fireEvent.click(screen.getByText(/Submit/i));

  // Wait for API call
  await expect(global.fetch).toHaveBeenCalledWith("/api/edit-table", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      year: "2023",
      team: "Team A",
      w: "5",
      d: "3",
      l: "2",
      gd: "10",
    }),
  });

  // Check if API called successfully
  expect(screen.getByText(/API called successfully/i)).toBeDefined();
});
