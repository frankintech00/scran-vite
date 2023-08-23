import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NoUserCard from "../../../components/user/NoUserCard";

describe("NoUserCard component", () => {
  it("renders the NoUserCard component", () => {
    render(
      <BrowserRouter>
        <NoUserCard />
      </BrowserRouter>
    );

    const signInButtonElement = screen.getByRole("button", {
      name: /Sign In/i,
    });
    expect(signInButtonElement).toBeInTheDocument();
    fireEvent.click(signInButtonElement);
    expect(window.location.pathname).toBe("/sign-in");

    const signUpButtonElement = screen.getByRole("button", {
      name: /Sign Up/i,
    });
    expect(signUpButtonElement).toBeInTheDocument();
    fireEvent.click(signUpButtonElement);
    expect(window.location.pathname).toBe("/sign-up");
  });
});
