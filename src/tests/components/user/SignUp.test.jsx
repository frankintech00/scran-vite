import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUp from "../../../components/user/SignUp";
import MockUserProvider from "../../mockContexts/MockUserProvider";

describe("SignUp component", () => {
  it("renders the SignUp component", () => {
    const errorMessage = null;
    render(
      <BrowserRouter>
        <MockUserProvider error={errorMessage}>
          <SignUp />
        </MockUserProvider>
      </BrowserRouter>
    );

    const profilePictureElement = screen.getByLabelText("Profile Picture");
    const displayNameElement = screen.getByLabelText("Display Name");
    const emailInputElement = screen.getByLabelText("Email");
    const passwordInputElement = screen.getByLabelText("Password");
    const confirmPasswordInputElement =
      screen.getByPlaceholderText("Confirm Password");

    const signInButtonElement = screen.getByRole("button", {
      name: /Create Account/i,
    });
    const signInWIthGoogleButtonElement = screen.getByRole("button", {
      name: /Continue with Google/i,
    });

    const signInElement = screen.getByText("Sign in.");

    const signInAnchor = signInElement.closest("a");
    fireEvent.click(signInAnchor);
    expect(window.location.pathname).toBe("/sign-in");

    expect(emailInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
    expect(signInButtonElement).toBeInTheDocument();
    expect(signInWIthGoogleButtonElement).toBeInTheDocument();
    expect(profilePictureElement).toBeInTheDocument();
    expect(displayNameElement).toBeInTheDocument();
    expect(confirmPasswordInputElement).toBeInTheDocument();
  });
  it("renders the errorMessage", () => {
    const errorMessage = "Test error message";
    render(
      <BrowserRouter>
        <MockUserProvider error={errorMessage}>
          <SignUp />
        </MockUserProvider>
      </BrowserRouter>
    );

    const errorMessageElement = screen.getByText(errorMessage);
    expect(errorMessageElement).toBeInTheDocument();
  });
});
