import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../src/app/page";
import CreateTable  from "../src/app/api/create-table-deskchampions";

test("Page", () => {
  render(<Page />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Hello" })
  ).toBeDefined();
  expect(screen.getByText("Contact Organiser:"));
});

test("CreateTable", () => {
  render(<CreateTable />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Hello" })
  ).toBeDefined();
  expect(screen.getByText("Contact Organiser:"));
});
