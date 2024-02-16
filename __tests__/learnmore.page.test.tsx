import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import LearnMore from "../src/app/learnmore/page";

test("LearnMore", () => {
  render(<LearnMore />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Hello, Learn More Page!" })
  ).toBeDefined();
  expect(
    screen.getByRole("img")
  ).toBeDefined();
  expect(
    screen.getByRole("link",{name:"Express Interest"})
  ).toBeDefined();
});



