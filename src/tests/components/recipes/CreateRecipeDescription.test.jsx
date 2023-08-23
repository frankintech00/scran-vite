import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import CreateRecipeDescription from "../../../components/recipe/CreateRecipeDescription";

describe("CreateRecipeDescription component", () => {
  const setRecipe = vitest.fn();
  const recipe = {
    title: "Test Recipe",
    description: "Test Description",
    ingredients: ["Test Ingredients"],
    directions: ["Test Directions"],
    category: ["Breakfast"],
    image: "Test Image",
  };
  it("renders the CreateRecipeDescription component", () => {
    render(
      <BrowserRouter>
        <CreateRecipeDescription recipe={recipe} setRecipe={setRecipe} />
      </BrowserRouter>
    );

    // Find the textarea by its placeholder text
    const recipeDescriptionTextarea = screen.getByPlaceholderText(
      "Please provide a concise description of the recipe and any unique or notable aspects of the dish."
    );
    expect(recipeDescriptionTextarea).toBeInTheDocument();

    // Simulate textarea change
    fireEvent.change(recipeDescriptionTextarea, {
      target: { value: "Updated description" },
    });

    expect(setRecipe).toHaveBeenCalledWith({
      ...recipe,
      description: "Updated description",
    });
  });
});
