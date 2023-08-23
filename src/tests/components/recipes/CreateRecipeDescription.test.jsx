import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import CreateRecipeDescription from "../../../components/recipe/CreateCategorySelection";

describe("CreateRecipeDescription component", () => {
  const category = "Breakfast";
  const recipe = {
    title: "Test Recipe",
    description: "Test Description",
    ingredients: "Test Ingredients",
    directions: "Test Directions",
    category: ["Breakfast"],
    image: "Test Image",
  };
  it("renders the CreateRecipeDescription component", () => {
    render(
      <BrowserRouter>
        <CreateRecipeDescription category={category} recipe={recipe} />
      </BrowserRouter>
    );
  });
});
