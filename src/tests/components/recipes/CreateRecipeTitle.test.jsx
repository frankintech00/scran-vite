import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import CreateRecipeTitle from "../../../components/recipe/CreateRecipeTitle";

describe("CreateRecipeTitle component", () => {
  const category = "Breakfast";
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
        <CreateRecipeTitle category={category} recipe={recipe} />
      </BrowserRouter>
    );
  });
});
