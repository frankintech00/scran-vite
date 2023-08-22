import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SearchInput from "../../../components/header/SearchInput";
import { RecipeContext } from "../../../contexts/RecipeContext";
import MockRecipeProvider from "../../mockContexts/MockRecipeProvider";

describe("SearchInput Component", () => {
  it("renders the input and searches for the value", () => {
    const setSearchResultsMock = vitest.fn();

    render(
      <Router>
        <MockRecipeProvider>
          <RecipeContext.Provider
            value={{ setSearchResults: setSearchResultsMock }}
          >
            <SearchInput />
          </RecipeContext.Provider>
        </MockRecipeProvider>
      </Router>
    );

    const searchInput = screen.getByPlaceholderText("Search for a recipe...");
    expect(searchInput).toBeInTheDocument();

    const searchButton = screen.getByText("Search");
    expect(searchButton).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "chicken" } });
    fireEvent.click(searchButton);

    expect(setSearchResultsMock).toHaveBeenCalled();

    // expect to navigate to /search-results
    // need to mock useNavigate and check that it was called with /search-results
  });
});
