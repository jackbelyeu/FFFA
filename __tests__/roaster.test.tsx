import { expect, test } from "vitest";
import Mosquitoes from "../src/app/mosquitoes/page";
import { render, screen, waitFor } from "@testing-library/react";

test("mosquitoes", async () => {
  render(<Mosquitoes />);

  expect(
    screen.getByRole("heading", { level: 1, name: "Team Mosquitoes" })
  ).toBeDefined();

  expect(
    screen.getByText("State your availability for the next Match")
  ).toBeDefined();
  expect(screen.getByText("Player Name")).toBeDefined();
  expect(screen.getByText("Status")).toBeDefined();
  expect(screen.getByText("Date")).toBeDefined();
  const playerNames = [
    "Aaron Juedemann",
    "Kent Lin",
    "Mark Tucker",
    "Trevor MacDougall",
    "Gretchen Haughey",
    "Savannah Jefferis-Henriques",
    "Rafael Feliciano",
    "Christian Ralph",
  ];
  playerNames.forEach((name) => {
    expect(screen.getByText(name)).toBeDefined();
  });
  await waitFor(() => {
    expect(screen.getByText("Yes")).toBeDefined();
    expect(screen.getByText("2/24/2024")).toBeDefined();
  });
});
