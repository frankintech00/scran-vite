import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import CreateRecipeNotes from "../../../components/recipe/CreateRecipeNotes";

describe("CreateRecipeNotes component", () => {
  const setRecipe = vitest.fn();
  const recipe = {
    title: "Test Recipe",
    description: "Test Description",
    ingredients: "Test Ingredients",
    directions: "Test Directions",
    category: ["Breakfast"],
    image: "Test Image",
    difficulty: "",
    servings: 0,
    preparationTime: 0,
    cookingTime: 0,
  };
  it("renders the CreateRecipeNotes component", () => {
    render(
      <BrowserRouter>
        <CreateRecipeNotes recipe={recipe} setRecipe={setRecipe} />
      </BrowserRouter>
    );

    // Find the textarea by its placeholder text
    const textarea = screen.getByPlaceholderText(
      "Enter any additional notes..."
    );
    expect(textarea).toBeInTheDocument();

    // Simulate textarea change
    fireEvent.change(textarea, { target: { value: "Test notes" } });

    // Check that the setRecipe function is called with the updated notes
    expect(setRecipe).toHaveBeenCalledWith({ ...recipe, notes: "Test notes" });
  });
});
