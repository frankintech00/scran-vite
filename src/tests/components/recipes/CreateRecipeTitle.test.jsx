import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import CreateRecipeTitle from "../../../components/recipe/CreateRecipeTitle";

describe("CreateRecipeTitle component", () => {
  const setRecipe = vitest.fn();
  const recipe = {
    title: "Test Recipe",
    description: "Test Description",
    ingredients: "Test Ingredients",
    directions: "Test Directions",
    category: ["Breakfast"],
    image: "Test Image",
  };
  it("renders the CreateRecipeTitle component", () => {
    render(
      <BrowserRouter>
        <CreateRecipeTitle recipe={recipe} setRecipe={setRecipe} />
      </BrowserRouter>
    );

    const input = screen.getByLabelText("Recipe Name");
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "New Recipe Name" } });

    expect(setRecipe).toHaveBeenCalledWith({
      ...recipe,
      recipeName: "New Recipe Name",
    });
  });
});
