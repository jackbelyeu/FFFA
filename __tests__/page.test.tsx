import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../src/app/page";
<<<<<<< HEAD
import CreateTable  from "../src/app/api/create-table-deskchampions";
=======
>>>>>>> 11e5f7ef8578550e8b572af146ae9ae39d203280

test("Page", () => {
  render(<Page />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Hello" })
  ).toBeDefined();
<<<<<<< HEAD
  expect(screen.getByText("Contact Organiser:"));
});

test("CreateTable", () => {
  render(<CreateTable />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Hello" })
  ).toBeDefined();
  expect(screen.getByText("Contact Organiser:"));
=======
  // expect(
  //   screen.getByRole("heading", { level: 2, name: "Organisers" })
  // ).toBeDefined();
  expect(screen.getByRole("link", { name: "Dashboard" })).toBeDefined();
  expect(screen.getByRole("link", { name: "Learn More" })).toBeDefined();
>>>>>>> 11e5f7ef8578550e8b572af146ae9ae39d203280
});
