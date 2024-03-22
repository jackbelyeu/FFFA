window.alert = jest.fn();
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { test, expect } from "vitest";

import Points from "../src/app/Gamepoint/page";

describe("Points Component", () => {
  test("Display alert when submit is clicked without selecting radio buttons", async () => {
    const { getByText, getByLabelText } = render(<Points />);
    const submitButton = getByText("Submit");

    fireEvent.click(submitButton);

    // Check if alert with the correct message is displayed
    expect(window.alert).toHaveBeenCalledWith("invalid Selection Please check");
  });

  test("Does not display alert when valid options are selected and submit is clicked", async () => {
    const { getByText, getByLabelText } = render(<Points />);
    const team1WinRadioButton = getByLabelText("Win");
    const team2LoseRadioButton = getByLabelText("Lose");

    fireEvent.change(team1WinRadioButton, { target: { value: "win" } });
    fireEvent.change(team2LoseRadioButton, { target: { value: "lose" } });

    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);

    // Check if alert is not displayed when valid options are selected and submit is clicked
    expect(window.alert).not.toHaveBeenCalled();
  });
});