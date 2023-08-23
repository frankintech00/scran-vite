import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import CreateRecipeNotes from "../../../components/recipe/CreateCategorySelection";

describe("CreateRecipeNotes component", () => {
  const category = "Breakfast";
  const recipe = {
    title: "Test Recipe",
    description: "Test Description",
    ingredients: "Test Ingredients",
    directions: "Test Directions",
    category: ["Breakfast"],
    image: "Test Image",
  };
  it("renders the CreateRecipeNotes component", () => {
    render(
      <BrowserRouter>
        <CreateRecipeNotes category={category} recipe={recipe} />
      </BrowserRouter>
    );
  });
});
