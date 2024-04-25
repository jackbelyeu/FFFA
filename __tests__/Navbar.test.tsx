import { expect, test, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MyNavbar from "../src/app/Components/Navbar/Navbar";

// Mock fetch before tests
global.fetch = vi.fn(() =>
  Promise.resolve(
    new Response(
      JSON.stringify({
        teams: [
          "Emus",
          "Grasskickers",
          "Hyenas",
          "Mosquitoes",
          "Penguins",
          "Pacey Chickens",
          "Los Flamingos",
        ],
      })
    )
  )
);

test("Navigation bar", async () => {
  render(<MyNavbar />);

  // Ensure main links are present
  expect(
    screen.getByRole("link", { name: "Flagrant Fowl Futbol Association" })
  ).toBeDefined();
  expect(screen.getByRole("link", { name: "Home" })).toBeDefined();
  expect(screen.getByRole("link", { name: "Learn More" })).toBeDefined();
  expect(screen.getByRole("link", { name: "Match Schedule" })).toBeDefined();

  // Check for dropdowns and their contents
  fireEvent.click(screen.getByText("Teams"));
  await waitFor(() => {
    expect(screen.getByText("Emus")).toBeDefined();
    expect(screen.getByText("Grasskickers")).toBeDefined();
    expect(screen.getByText("Hyenas")).toBeDefined();
    expect(screen.getByText("Mosquitoes")).toBeDefined();
    expect(screen.getByText("Penguins")).toBeDefined();
    expect(screen.getByText("Pacey Chickens")).toBeDefined();
    expect(screen.getByText("Los Flamingos")).toBeDefined();
  });

  fireEvent.click(screen.getByText("Login"));
  await waitFor(() => {
    expect(screen.getByText("Organizer Login")).toBeDefined();
    expect(screen.getByText("Player Login")).toBeDefined();
  });
});
