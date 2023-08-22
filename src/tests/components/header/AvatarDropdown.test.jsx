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

    const hiParagraph = screen.getByText(/Hi - Test User/i);
    expect(hiParagraph).toBeInTheDocument();

    const yourRecipesLink = screen.getByText(/Your Recipes/i);
    expect(yourRecipesLink).toBeInTheDocument();
    expect(yourRecipesLink.href).toContain("/");

    const logoutButton = screen.getByRole("button", { name: "Logout" });
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toHaveClass(
      "text-white btn btn-warning btn-block btn-sm"
    );
  });
});
