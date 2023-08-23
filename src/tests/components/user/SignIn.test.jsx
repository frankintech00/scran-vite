import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignIn from "../../../components/user/SignIn";
import MockUserProvider from "../../mockContexts/MockUserProvider";

describe("SignIn component", () => {
  it("renders the SignIn component", () => {
    const errorMessage = null;
    render(
      <BrowserRouter>
        <MockUserProvider error={errorMessage}>
          <SignIn />
        </MockUserProvider>
      </BrowserRouter>
    );

    const emailInputElement = screen.getByLabelText("Email");
    const passwordInputElement = screen.getByLabelText("Password");
    const signInButtonElement = screen.getByRole("button", {
      name: /Sign In./i,
    });
    const signInWIthGoogleButtonElement = screen.getByRole("button", {
      name: /Continue with Google/i,
    });
    const forgotPasswordElement = screen.getByText("Forgotten your password?");
    const createAccountElement = screen.getByText("Create an Account");

    const forgotPasswordAnchor = forgotPasswordElement.closest("a");
    fireEvent.click(forgotPasswordAnchor);
    expect(window.location.pathname).toBe("/forgot-password");

    const createAccountAnchor = createAccountElement.closest("a");
    fireEvent.click(createAccountAnchor);
    expect(window.location.pathname).toBe("/sign-up");

    expect(emailInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
    expect(signInButtonElement).toBeInTheDocument();
    expect(signInWIthGoogleButtonElement).toBeInTheDocument();
    expect(forgotPasswordElement).toBeInTheDocument();
  });
  it("renders the errorMessage", () => {
    const errorMessage = "Test error message";
    render(
      <BrowserRouter>
        <MockUserProvider error={errorMessage}>
          <SignIn />
        </MockUserProvider>
      </BrowserRouter>
    );

    const errorMessageElement = screen.getByText(errorMessage);
    expect(errorMessageElement).toBeInTheDocument();
  });
});
