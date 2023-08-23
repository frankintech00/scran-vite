import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import CreateCategorySelection from "../../../components/recipe/CreateCategorySelection";

describe("CreateCategorySelection component", () => {
  const category = "Breakfast";
  const recipe = {
    title: "Test Recipe",
    description: "Test Description",
    ingredients: "Test Ingredients",
    directions: "Test Directions",
    category: ["Breakfast"],
    image: "Test Image",
  };
  it("renders the CreateCategorySelection component", () => {
    render(
      <BrowserRouter>
        <CreateCategorySelection category={category} recipe={recipe} />
      </BrowserRouter>
    );
  });
});
