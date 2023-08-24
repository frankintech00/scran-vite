import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AvatarDropdown from "../../../components/header/AvatarDropdown";
import MockUserProvider from "../../mockContexts/MockUserProvider";
import MockRecipeProvider from "../../mockContexts/MockRecipeProvider";

describe("AvatarDropdown component", () => {
  it("renders the AvatarDropdown component with the user image and clicks the button", () => {
    const user = {
      displayName: "Test User",
      email: "test@email.com",
      photoURL: "https://testurl.com",
    };
    const isLoggedIn = true;

    render(
      <BrowserRouter>
        <MockUserProvider isLoggedIn={isLoggedIn} user={user}>
          <MockRecipeProvider>
            <AvatarDropdown />
          </MockRecipeProvider>
        </MockUserProvider>
      </BrowserRouter>
    );

    const imgElement = screen.getByRole("img");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", "https://testurl.com");
    expect(imgElement).toHaveAttribute("alt", "Test User");

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    const hiUserHeading = screen.getByText(/Hi - Test User/i);
    expect(hiUserHeading).toBeInTheDocument();

    const yourRecipesLink = screen.getByText(/Your Recipes/i);
    const yourRecipesAnchor = yourRecipesLink.closest("a");
    fireEvent.click(yourRecipesAnchor);
    expect(window.location.pathname).toBe("/");

    fireEvent.click(buttonElement);

    const createRecipeLink = screen.getByText(/Create a Recipe/i);
    const createRecipeAnchor = createRecipeLink.closest("a");
    fireEvent.click(createRecipeAnchor);
    expect(window.location.pathname).toBe("/create-recipe");

    fireEvent.click(buttonElement);

    const editProfileLink = screen.getByText(/Edit Profile/i);
    const editProfileAnchor = editProfileLink.closest("a");
    fireEvent.click(editProfileAnchor);
    expect(window.location.pathname).toBe(`/update-profile/${user.uid}`);

    fireEvent.click(buttonElement);

    const logoutButton = screen.getByRole("button", { name: /Logout/i });
    fireEvent.click(logoutButton);
  });
});
