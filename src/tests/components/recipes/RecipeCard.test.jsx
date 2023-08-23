import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RecipeCard from "../../../components/recipe/RecipeCard";
import MockUserProvider from "../../mockContexts/MockUserProvider";
import MockRecipeProvider from "../../mockContexts/MockRecipeProvider";

describe("RecipeCard component", () => {
  beforeEach(() => {
    vi.mock("@smastrom/react-rating", () => ({
      Rating: () => <div data-testid="mock-rating" />,
    }));
  });
  const recipe = {
    id: "recipeId",
    recipeImageURL: "https://example.com/recipe.jpg",
    recipeName: "Delicious Recipe",
    category: ["Category 1"],
    averageRating: 4.5,
    ratingCount: 10,
  };
  const user = {
    displayName: "Test User",
    photoURL: "https://test.com/test.jpg",
  };

  it("renders the RecipeCard component", () => {
    render(
      <BrowserRouter>
        <MockUserProvider user={user}>
          <MockRecipeProvider>
            <RecipeCard recipe={recipe} />
          </MockRecipeProvider>
        </MockUserProvider>
      </BrowserRouter>
    );

    const recipeImageElement = screen.getByAltText(recipe.recipeName);
    expect(recipeImageElement).toBeInTheDocument();
    expect(recipeImageElement).toHaveAttribute("src", recipe.recipeImageURL);

    const recipeImageAnchor = recipeImageElement.closest("a");
    fireEvent.click(recipeImageAnchor);
    expect(window.location.pathname).toBe(`/recipe/${recipe.id}`);

    recipe.category.forEach((cat) => {
      const categoryElement = screen.getByText(cat);
      expect(categoryElement).toBeInTheDocument();
      const categoryBadges = screen.getAllByTestId(`category${cat}`);
      expect(categoryBadges).toHaveLength(1);
    });

    const recipeNameElement = screen.getByText(recipe.recipeName);
    const recipeNameAnchor = recipeNameElement.closest("a");
    fireEvent.click(recipeNameAnchor);
    expect(window.location.pathname).toBe(`/recipe/${recipe.id}`);

    const favouriteRecipesElement = screen.getByTestId("unfavouriteIcon");
    expect(favouriteRecipesElement).toBeInTheDocument();

    const ratingElement = screen.getByTestId("mock-rating");
    expect(ratingElement).toBeInTheDocument();
  });
});
