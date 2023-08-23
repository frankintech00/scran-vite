import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import CreateRecipeInfo from "../../../components/recipe/CreateRecipeInfo";

describe("CreateRecipeInfo component", () => {
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
  it("renders the CreateRecipeInfo component", () => {
    render(
      <BrowserRouter>
        <CreateRecipeInfo recipe={recipe} setRecipe={setRecipe} />
      </BrowserRouter>
    );

    const difficultySelect = screen.getByLabelText("Difficulty");
    expect(difficultySelect).toBeInTheDocument();

    fireEvent.change(difficultySelect, { target: { value: "Easy" } });

    expect(setRecipe).toHaveBeenCalledWith({ ...recipe, difficulty: "Easy" });

    const servingsInput = screen.getByLabelText("Servings");
    expect(servingsInput).toBeInTheDocument();

    fireEvent.change(servingsInput, { target: { value: "4" } });

    expect(setRecipe).toHaveBeenCalledWith({ ...recipe, servings: 4 });

    const preparationTimeInput = screen.getByLabelText(
      "Preperation Time (Mins)"
    );
    expect(preparationTimeInput).toBeInTheDocument();

    fireEvent.change(preparationTimeInput, { target: { value: "30" } });

    expect(setRecipe).toHaveBeenCalledWith({ ...recipe, preparationTime: 30 });

    const cookingTimeInput = screen.getByLabelText("Cooking Time (Mins)");
    expect(cookingTimeInput).toBeInTheDocument();

    fireEvent.change(cookingTimeInput, { target: { value: "45" } });

    expect(setRecipe).toHaveBeenCalledWith({ ...recipe, cookingTime: 45 });
  });
});
