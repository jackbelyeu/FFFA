import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../src/app/page";

test("Page", () => {
  render(<Page />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Flagrant Fowl Futbol Association" })
  ).toBeDefined();
  expect(
    screen.getByRole("heading", { level: 2, name: "Current Standings" })
  ).toBeDefined();
  expect(
    screen.getByRole("table")
  ).toBeDefined();
});