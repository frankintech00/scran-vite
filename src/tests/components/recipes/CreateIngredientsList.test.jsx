import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MockRecipeProvider from "../../mockContexts/MockRecipeProvider";

import CreateIngredientsList from "../../../components/recipe/CreateIngredientsList";

describe("CreateIngredientsList component", () => {
  const category = "Breakfast";
  const recipe = {
    title: "Test Recipe",
    description: "Test Description",
    ingredients: ["Test Ingredients"],
    directions: ["Test Directions"],
    category: ["Breakfast"],
    image: "Test Image",
  };
  it("renders the CreateIngredientsList component", () => {
    render(
      <BrowserRouter>
        <MockRecipeProvider>
          <CreateIngredientsList category={category} recipe={recipe} />
        </MockRecipeProvider>
      </BrowserRouter>
    );

    const ingredientsTextbox = screen.getByPlaceholderText(
      "Enter an ingredient..."
    );
    expect(ingredientsTextbox).toBeInTheDocument();

    const ingredientButton = screen.getByRole("button", {
      name: "Add Ingredient",
    });
    expect(ingredientButton).toBeInTheDocument();

    fireEvent.click(ingredientButton);

    const ingredient = screen.getByText("Test Ingredients");
    expect(ingredient).toBeInTheDocument();
  });
});
