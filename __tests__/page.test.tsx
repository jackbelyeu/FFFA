import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../src/app/page";

test("Page", () => {
  render(<Page />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Hello" })
  ).toBeDefined();
  expect(screen.getByRole("link", { name: "Dashboard" })).toBeDefined();
  expect(screen.getByRole("link", { name: "Learn More" })).toBeDefined();
});
