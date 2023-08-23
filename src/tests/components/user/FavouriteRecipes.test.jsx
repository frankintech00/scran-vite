import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FavouriteRecipes from "../../../components/user/FavouriteRecipes";
import MockUserProvider from "../../mockContexts/MockUserProvider";

describe("FavouriteRecipes component", () => {
  const addUserFavouritesMock = vitest.fn();

  const user = {
    userId: "testUserId",
    displayName: "Test User",
    photoURL: "https://test.com/test.jpg",
  };

  it("renders the FavouriteRecipes component", () => {
    render(
      <BrowserRouter>
        <MockUserProvider user={user} addUserFavourites={vitest.fn()}>
          <FavouriteRecipes />
        </MockUserProvider>
      </BrowserRouter>
    );
    const unfavouriteIcon = screen.getByTestId("unfavouriteIcon");
    unfavouriteIcon.onclick = addUserFavouritesMock;
    fireEvent.click(unfavouriteIcon);
    expect(addUserFavouritesMock).toHaveBeenCalledTimes(1);
  });
});
