import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserCard from "../../../components/user/UserCard";
import MockUserProvider from "../../mockContexts/MockUserProvider";
import MockRecipeProvider from "../../mockContexts/MockRecipeProvider";
import { user } from "firebase-functions/v1/auth";

describe("UserCard component", () => {
  user = {
    displayName: "Test User",
    photoURL: "https://test.com/test.jpg",
  };
  it("renders the UserCard component", () => {
    render(
      <BrowserRouter>
        <MockUserProvider user={user}>
          <MockRecipeProvider>
            <UserCard />
          </MockRecipeProvider>
        </MockUserProvider>
      </BrowserRouter>
    );

    const avatarElement = screen.getByAltText(user.displayName);
    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement).toHaveAttribute("src", user.photoURL);

    const yourRecipesButtonElement = screen.getByRole("button", {
      name: /Your Recipes/i,
    });
    expect(yourRecipesButtonElement).toBeInTheDocument();

    const yourFavouritesButtonElement = screen.getByRole("button", {
      name: /Your Favourites/i,
    });
    expect(yourFavouritesButtonElement).toBeInTheDocument();

    const createARecipeElement = screen.getByText("Create a Recipe");
    const createARecipeAnchor = createARecipeElement.closest("a");
    fireEvent.click(createARecipeAnchor);
    expect(window.location.pathname).toBe("/create-recipe");
  });
});
