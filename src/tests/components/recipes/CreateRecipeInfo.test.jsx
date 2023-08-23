import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import CreateRecipeInfo from "../../../components/recipe/CreateCategorySelection";

describe("CreateRecipeInfo component", () => {
  const category = "Breakfast";
  const recipe = {
    title: "Test Recipe",
    description: "Test Description",
    ingredients: "Test Ingredients",
    directions: "Test Directions",
    category: ["Breakfast"],
    image: "Test Image",
  };
  it("renders the CreateRecipeInfo component", () => {
    render(
      <BrowserRouter>
        <CreateRecipeInfo category={category} recipe={recipe} />
      </BrowserRouter>
    );
  });
});
