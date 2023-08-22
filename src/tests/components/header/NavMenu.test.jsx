import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavMenu from "../../../components/header/NavMenu";
import MockRecipeProvider from "../../mockContexts/MockRecipeProvider";
import MockUserProvider from "../../mockContexts/MockUserProvider";

describe("NavMenu component", () => {
  it("renders the NavMenu component with 3 Links", () => {
    const handleYourRecipesClickMock = vitest.fn();
    const handleYourFavouritesClickMock = vitest.fn();
    const isLoggedIn = true;
    render(
      <BrowserRouter>
        <MockUserProvider isLoggedIn={isLoggedIn}>
          <MockRecipeProvider>
            <NavMenu />
          </MockRecipeProvider>
        </MockUserProvider>
      </BrowserRouter>
    );

    const createRecipeLink = screen.getByText("Create Recipe");
    const yourFavouritesLink = screen.getByText("Your Favourites");
    const yourRecipesLink = screen.getByText("Your Recipes");

    expect(createRecipeLink).toBeInTheDocument();
    expect(yourRecipesLink).toBeInTheDocument();
    expect(yourFavouritesLink).toBeInTheDocument();

    const createRecipeAnchor = createRecipeLink.closest("a");
    expect(createRecipeAnchor).toHaveAttribute("href", "/create-recipe");

    const yourRecipesAnchor = yourRecipesLink.closest("a");
    yourRecipesAnchor.onclick = handleYourRecipesClickMock;
    fireEvent.click(yourRecipesAnchor);
    expect(handleYourRecipesClickMock).toHaveBeenCalledTimes(1);

    const yourFavouritesAnchor = yourFavouritesLink.closest("a");
    yourFavouritesAnchor.onclick = handleYourFavouritesClickMock;
    fireEvent.click(yourFavouritesAnchor);
    expect(handleYourFavouritesClickMock).toHaveBeenCalledTimes(1);
  });
});
