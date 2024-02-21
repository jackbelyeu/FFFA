import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../src/app/page";
import "@testing-library/jest-dom";
import Player from "../src/app/player/page";

describe("playerInterest Page", () => {
  it("render the heading", () => {
    render(<Player />);
    const heading = screen.getByRole("heading", {
      level: 1,
      name: /express your interest to join the 2024 season/i,
    });
    expect(heading).toBeDefined();
  });

  it("render the description", () => {
    render(<Player />);
    const description1 = screen.getByText(
      /Are you ready to take you passion for the game to the next level?\?/i
    );
    const description2 = screen.getByText(
      "Join us for an exciting 2024 Season !"
    );
    expect(description1).toBeDefined();
    expect(description2).toBeDefined();
  });

  it("render the image with alternate text", () => {
    render(<Player />);
    const image = screen.getByAltText(/flagrant fowl futball association/i);
    expect(image).toBeDefined();
  });

  it("renders the sign-up and contact links correctly", () => {
    render(<Player />);

    const learnMoreLink = screen.getByRole("link", { name: /Learn More/i });
    expect(learnMoreLink).toHaveAttribute("href", "/learnmore");

    const signUpLink = screen.getByRole("link", { name: /Sign Up/i });
    expect(signUpLink).toHaveAttribute(
      "href",
      "https://forms.gle/HER3bPsbQvnZDc6F8"
    );

    const contactOrganizerLink = screen.getByRole("link", {
      name: /Contact Organizer/i,
    });
    expect(contactOrganizerLink).toHaveAttribute(
      "href",
      "mailto:maltucker@gmail.com"
    );
  });
});
