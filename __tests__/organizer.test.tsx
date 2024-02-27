import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Organizer from "../src/app/organizer/page";

test("Organizer", () => {
  render(<Organizer />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Only for Organizer" })
  ).toBeDefined();
  // Corrected to match the label associated with the textbox
  expect(screen.getByRole("textbox", { name: "Security Key:" })).toBeDefined();

  expect(screen.getByRole("button", { name: "Submit" })).toBeDefined();
});
