import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import MyNavbar from "../src/app/Components/Navbar/Navbar";

test("Navigation bar", () => {
  render(<MyNavbar />);
  expect(
    screen.getByRole("link", { name: "Flagrant Fowl Futbol Association" })
  ).toBeDefined();
  expect(screen.getByRole("link", { name: "Home" })).toBeDefined();
  expect(screen.getByRole("link", { name: "Home" })).toBeDefined();
  expect(screen.getByRole("link", { name: "Learn More" })).toBeDefined();
  expect(screen.getByRole("link", { name: "Match Schedule" })).toBeDefined();
  expect(screen.getByRole("link", { name: "Organiser Login" })).toBeDefined();
});
