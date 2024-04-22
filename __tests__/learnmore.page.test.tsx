import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import LearnMore from "../src/app/learnmore/page";

test("LearnMore", () => {
  render(<LearnMore />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Hello, Learn More Page!" })
  ).toBeDefined();
  expect(
    screen.getByText("Find out more about the 2024 season.")
  ).toBeDefined();
  expect(
    screen.getByRole("img", { name: "People playing Soccer in a field" })
  ).toBeDefined();
  expect(
    screen.getByRole("button", { name: "Contact Organizer" })
  ).toBeDefined();
});
