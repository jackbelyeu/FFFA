import { expect, test } from "vitest";
import Interest from "../src/app/interest/page";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

test("renders without crashing", () => {
  render(<Interest />);
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "Express Your Interest for Season 2024!",
    })
  ).toBeDefined();
  expect(
    screen.getByText(
      "The role of this form is to collect info on how many people would like to play in a randomized league, such that we can generate new totally random teams. Please fill out this form ONLY if you are planning to participate in the majority of this 4-week trial (assuming you are in town and available at time of the game). Expected to run mid-October through mid-November."
    )
  ).toBeDefined();
  expect(
    screen.getByRole("button", {
      name: "Please fill all the fields to submit the form.",
    })
  ).toBeDefined();
  expect(screen.getByRole("textbox", { name: "Name: *" })).toBeDefined();
  expect(screen.getByRole("textbox", { name: "Email: *" })).toBeDefined();
  expect(screen.getByRole("textbox", { name: "Phone: *" })).toBeDefined();
  expect(
    screen.getByRole("textbox", { name: "A space for your opinion" })
  ).toBeDefined();
  expect(screen.getByRole("checkbox", { name: "October 8th" })).toBeDefined();
  expect(screen.getByRole("checkbox", { name: "October 15th" })).toBeDefined();
  expect(screen.getByRole("checkbox", { name: "October 22nd" })).toBeDefined();
  expect(screen.getByRole("checkbox", { name: "October 29th" })).toBeDefined();
  expect(screen.getByRole("checkbox", { name: "November 5th" })).toBeDefined();
  expect(screen.getByRole("checkbox", { name: "November 12th" })).toBeDefined();
  expect(screen.getByRole("checkbox", { name: "November 19th" })).toBeDefined();
  expect(screen.getByRole("checkbox", { name: "November 26th" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Chickens" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Hyenas" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Mosquitoes" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Emus" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Mockingbirds" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Grasskickers" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Forward" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Midfielder" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Defender" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Goalkeeper" })).toBeDefined();
  expect(
    screen.getByRole("radio", { name: "Too Many to Specify" })
  ).toBeDefined();
  expect(screen.getByRole("radio", { name: "Grass" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Turf" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "No Preference" })).toBeDefined();
  const textBoxes = screen.getAllByRole("textbox");
  expect(textBoxes.length).toBe(4);
  const checkboxes = screen.getAllByRole("checkbox");
  expect(checkboxes.length).toBe(8);
  const radios = screen.getAllByRole("radio");
  expect(radios.length).toBe(14);
});

test("checkbox and radio inputs have correct attributes", () => {
  // Checkbox inputs
  expect(screen.getByRole("checkbox", { name: "October 8th" })).toBeDefined();
  expect(screen.getByRole("checkbox", { name: "October 15th" })).toBeDefined();
  expect(screen.getByRole("checkbox", { name: "October 22nd" })).toBeDefined();
  expect(screen.getByRole("checkbox", { name: "October 29th" })).toBeDefined();
  expect(screen.getByRole("checkbox", { name: "November 5th" })).toBeDefined();
  expect(screen.getByRole("checkbox", { name: "November 12th" })).toBeDefined();
  expect(screen.getByRole("checkbox", { name: "November 19th" })).toBeDefined();
  expect(screen.getByRole("checkbox", { name: "November 26th" })).toBeDefined();

  // Radio inputs
  expect(screen.getByRole("radio", { name: "Chickens" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Hyenas" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Mosquitoes" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Emus" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Mockingbirds" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Grasskickers" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Forward" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Midfielder" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Defender" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Goalkeeper" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Too Many to Specify" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Grass" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "Turf" })).toBeDefined();
  expect(screen.getByRole("radio", { name: "No Preference" })).toBeDefined();
});

test("component renders all elements properly", () => {
  expect(screen.getByRole("heading", { level: 1 })).toBeDefined();
  expect(screen.getByText(/Express Your Interest for Season 2024!/i)).toBeDefined();
});

// test("Form Submission Test: User fills out all fields correctly and submits the form", async () => {
//   // Render the component
//   render(<Interest />);

//   // Simulate user input for all required fields
//   fireEvent.change(screen.getByRole("textbox", { name: "name" }), { target: { value: "John Doe" } });
//   fireEvent.change(screen.getByRole("textbox", { name: "email" }), { target: { value: "john@example.com" } });
//   fireEvent.change(screen.getByRole("textbox", { name: "phone" }), { target: { value: "1234567890" } });
//   fireEvent.click(screen.getByLabelText("October 8th"));
//   fireEvent.click(screen.getByLabelText("Chickens"));
//   fireEvent.click(screen.getByLabelText("Forward"));
//   fireEvent.click(screen.getByLabelText("Grass"));
//   fireEvent.change(screen.getByRole("textbox", { name: "opinion" }), { target: { value: "This is my opinion." } });

//   // Simulate form submission
//   fireEvent.click(screen.getByRole("button", { name: "Submit" }));

//   // Wait for form submission to complete
//   await waitFor(() => {
//     // Verify that the handleSubmit function is called (you might need to mock fetch requests)
//     expect(window.alert).toHaveBeenCalledWith("Form submitted successfully");
//     // Optionally, verify that the page reloads or the router navigates to the appropriate route upon successful submission
//     // For example, you can check if a specific element is rendered after successful submission
//     const thankYouMessage = screen.queryByText("Thank you for submitting the form!");
//     expect(thankYouMessage).toBeTruthy();
//   });
// });
