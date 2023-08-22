import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignInDropdown from "../../../components/header/SignInDropdown";
import MockUserProvider from "../../mockContexts/MockUserProvider";

describe("AvatarDropdown component", () => {
  it("renders the SignInDropdown component with button and Dropdown", () => {
    render(
      <BrowserRouter>
        <MockUserProvider>
          <SignInDropdown />
        </MockUserProvider>
      </BrowserRouter>
    );

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    const registeredUsersElement = screen.getByText("Registered Users");
    const newUserElement = screen.getByText("New User");
    const googleButtonElement = screen.getByText("Continue with Google");

    expect(registeredUsersElement).toBeInTheDocument();
    expect(newUserElement).toBeInTheDocument();
    expect(googleButtonElement).toBeInTheDocument();
  });
});
