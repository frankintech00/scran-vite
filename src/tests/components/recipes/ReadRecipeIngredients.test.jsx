import React from "react";
import { render, screen } from "@testing-library/react";
import ReadRecipeIngredients from "../../../components/recipe/ReadRecipeIngredients";

describe("ReadRecipeIngredients component", () => {
  it("renders the ingredients correctly", () => {
    const ingredients = ["Ingredient 1", "Ingredient 2", "Ingredient 3"];

    render(<ReadRecipeIngredients ingredients={ingredients} />);

    const ingredientsTitle = screen.getByText("Ingredients:");
    expect(ingredientsTitle).toBeInTheDocument();

    const ingredientItems = screen.getAllByRole("listitem");
    expect(ingredientItems).toHaveLength(ingredients.length);

    ingredients.forEach((ingredient, index) => {
      const ingredientElement = screen.getByText(ingredient);
      expect(ingredientElement).toBeInTheDocument();
    });
  });
});
