import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Schedule from "../src/app/Mosquitoes/page";

test("Schedule", () => {
  render(<Schedule />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Team Mosquitoes" })
  ).toBeDefined();
});

test("Roster Table Content", () => {
  render(<Schedule />);

  // Test case for the roster table headers
  const table = screen.getAllByRole("table", {
    name: "/api/get-mosquitoes",
  });
  expect(table).toBeDefined();

  // Test cases for the roster table column headers
  expect(screen.getByRole("columnheader", { name: "Player ID" })).toBeDefined();
  expect(
    screen.getByRole("columnheader", { name: "Player Name" })
  ).toBeDefined();
  expect(screen.getByRole("columnheader", { name: "Team Name" })).toBeDefined();

  // Test case to verify that the table rows exist
  const rosterRows = screen.getAllByRole("row", { name: "" });
  expect(rosterRows.length).toBeGreaterThan(0);

  // Optionally, test for specific data in cells, assuming you have at least one row
  expect(screen.getByRole("cell", { name: "Lavanya" })).toBeDefined();
  expect(screen.getByRole("cell", { name: "Mosquitoes" })).toBeDefined();
  expect(screen.getByRole("cell", { name: "Abhishek" })).toBeDefined();
  expect(screen.getByRole("cell", { name: "Mosquitoes" })).toBeDefined();
  expect(screen.getByRole("cell", { name: "Peijun" })).toBeDefined();
  expect(screen.getByRole("cell", { name: "Mosquitoes" })).toBeDefined();
});
