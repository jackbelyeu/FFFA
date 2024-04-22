import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddPlayerForm from "../src/app/organiserlogin/AddPlayerForm"; // Adjust the import path as needed

describe("AddPlayerForm", () => {
  beforeEach(() => {
    render(<AddPlayerForm team="mockingbirds" />);
  });

  test("inputs are editable and submit button is clickable", () => {
    const playerNameInput = screen.getByPlaceholderText(
      "Player Name"
    ) as HTMLInputElement;
    const commitmentInput = screen.getByPlaceholderText(
      "Commitment"
    ) as HTMLInputElement;
    const positionInput = screen.getByPlaceholderText(
      "Position"
    ) as HTMLInputElement;
    const previousClubInput = screen.getByPlaceholderText(
      "Previous Club"
    ) as HTMLInputElement;
    const submitButton = screen.getByRole("button", {
      name: "Submit Player Details",
    });

    // Check input fields are editable
    fireEvent.change(playerNameInput, { target: { value: "John Doe" } });
    fireEvent.change(commitmentInput, { target: { value: "Full-Time" } });
    fireEvent.change(positionInput, { target: { value: "Forward" } });
    fireEvent.change(previousClubInput, { target: { value: "Old Club" } });

    expect(playerNameInput.value).toBe("John Doe");
    expect(commitmentInput.value).toBe("Full-Time");
    expect(positionInput.value).toBe("Forward");
    expect(previousClubInput.value).toBe("Old Club");

    // Simulate form submission by clicking the submit button
    fireEvent.click(submitButton);

    // Optionally, ensure the form "attempted" to submit (you could track calls if needed)
  });

  test("form displays all required fields", () => {
    expect(
      screen.getByPlaceholderText("Player Name") as HTMLInputElement
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Commitment") as HTMLInputElement
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Position") as HTMLInputElement
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Previous Club") as HTMLInputElement
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Submit Player Details" })
    ).toBeInTheDocument();
  });
});
