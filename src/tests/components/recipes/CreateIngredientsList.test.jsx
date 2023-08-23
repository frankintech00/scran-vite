import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import CreateIngredientsList from "../../../components/recipe/CreateCategorySelection";

describe("CreateIngredientsList component", () => {
  const category = "Breakfast";
  const recipe = {
    title: "Test Recipe",
    description: "Test Description",
    ingredients: "Test Ingredients",
    directions: "Test Directions",
    category: ["Breakfast"],
    image: "Test Image",
  };
  it("renders the CreateIngredientsList component", () => {
    render(
      <BrowserRouter>
        <CreateIngredientsList category={category} recipe={recipe} />
      </BrowserRouter>
    );
  });
});
