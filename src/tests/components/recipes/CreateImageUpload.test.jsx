import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import CreateImageUpload from "../../../components/recipe/CreateCategorySelection";

describe("CreateImageUpload component", () => {
  const category = "Breakfast";
  const recipe = {
    title: "Test Recipe",
    description: "Test Description",
    ingredients: "Test Ingredients",
    directions: "Test Directions",
    category: ["Breakfast"],
    image: "Test Image",
  };
  it("renders the CreateImageUpload component", () => {
    render(
      <BrowserRouter>
        <CreateImageUpload category={category} recipe={recipe} />
      </BrowserRouter>
    );
  });
});
