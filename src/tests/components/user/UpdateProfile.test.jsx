import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UpdateProfile from "../../../components/user/UpdateProfile";
import MockUserProvider from "../../mockContexts/MockUserProvider";
import { user } from "firebase-functions/v1/auth";

describe("UpdateProfile component", () => {
  user = {
    displayName: "Test User",
    photoURL: "https://test.com/test.jpg",
  };
  it("renders the UpdateProfile component", () => {
    const errorMessage = null;
    render(
      <BrowserRouter>
        <MockUserProvider error={errorMessage} user={user}>
          <UpdateProfile />
        </MockUserProvider>
      </BrowserRouter>
    );

    const profilePictureElement = screen.getByLabelText(
      "Choose a new profile picture"
    );
    const displayNameElement = screen.getByLabelText("Display Name");
    const changePasswordElement = screen.getByText("Change your password");

    const updateProfileButtonElement = screen.getByRole("button", {
      name: /Update Profile/i,
    });

    const changePasswordAnchor = changePasswordElement.closest("a");
    fireEvent.click(changePasswordAnchor);
    expect(window.location.pathname).toBe("/forgot-password");

    expect(profilePictureElement).toBeInTheDocument();
    expect(displayNameElement).toBeInTheDocument();
    expect(updateProfileButtonElement).toBeInTheDocument();
  });
});
