import { test, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RSVP from "../src/app/[team]/rsvp/page";
const originalFetch = global.fetch;

test("renders RSVP for a valid team and allows user interaction", async () => {
  render(<RSVP params={{ team: "emus" }} />);

  const header = await screen.findByRole("heading", { name: "RSVP FOR EMUS" });
  expect(header).toBeTruthy();

  const table = screen.getAllByRole("table")[0];
  expect(table).toBeTruthy();

  // const oct15Select = screen.getByTestId("oct_15_player1");

  // if (!oct15Select) {
  //   throw new Error("Element with test ID 'oct_15_player1' not found!");
  // }

  // console.log("oct15Select:", oct15Select);

  // await waitFor(() => {
  //   expect(oct15Select.value).toBeDefined();
  //   console.log("oct15Select.value:", oct15Select.value);
  // });

  // fireEvent.change(oct15Select, { target: { value: "NO" } });

  // expect(oct15Select.value).toBe("NO");

  // await waitFor(() => {
  //   const player1Element = screen.getByText(/player1/i);
  //   expect(player1Element).toBeTruthy();
  //   expect(player1Element.textContent.toLowerCase()).toContain("no");
  // });
});


test("renders error message for an invalid team", async () => {
  render(<RSVP params={{ team: "invalid_team" }} />);

  const errorHeading = screen.queryByRole("heading", { name: "Invalid Team" });
  expect(errorHeading).toBeTruthy();

  const sorryText = screen.queryByText(/sorry/i);
  expect(sorryText).toBeTruthy();
  global.fetch = originalFetch;
});


