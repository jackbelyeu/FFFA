import { expect, test} from "vitest";
import { render, screen } from "@testing-library/react";
import OrganiserMatchSchedule from "../src/app/organiserlogin/page";


test("Organiser", () => {
  render(<OrganiserMatchSchedule />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Organiser Dashboard" })
  ).toBeDefined();
  expect(screen.getByPlaceholderText("Enter Alert")).toBeDefined();
  expect(screen.getByPlaceholderText("Enter Location")).toBeDefined();
  expect(screen.getByRole("button", { name: "Add Alert" })).toBeDefined();
  expect(screen.getByRole("button", { name: "Add Location" })).toBeDefined();
  expect(screen.getByRole("button", { name: "Delete Location" })).toBeDefined();
  expect(screen.getByRole("button", { name: "Sign Out" })).toBeDefined();
  expect(screen.getByRole("heading", { level: 1, name: "Match Schedule" })).toBeDefined();
  expect(screen.getByRole("heading", { level: 2, name: "No Matches Today" })).toBeDefined();
  expect(screen.getByRole("heading", { level: 2, name: "No matches scheduled" })).toBeDefined();
  expect(screen.getByRole("button", { name: "Add Match" })).toBeDefined();
});

