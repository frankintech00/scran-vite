import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ForgotUpdatePassword from "../../../components/user/ForgotUpdatePassword";
import MockUserProvider from "../../mockContexts/MockUserProvider";

describe("ForgotUpdatePassword component", () => {
  it("renders the ForgotUpdatePassword component", () => {
    render(
      <BrowserRouter>
        <MockUserProvider>
          <ForgotUpdatePassword />
        </MockUserProvider>
      </BrowserRouter>
    );

    const emailInputElement = screen.getByLabelText("Email");

    const resetPasswordButtonElement = screen.getByRole("button", {
      name: /Reset Password/i,
    });

    expect(emailInputElement).toBeInTheDocument();
    expect(resetPasswordButtonElement).toBeInTheDocument();
  });
});
