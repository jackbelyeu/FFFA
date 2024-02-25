import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Admin from "../src/app/admin/page";

test("Admin", () => {
  render(<Admin />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Welcome Admin" })
  ).toBeDefined();
});
