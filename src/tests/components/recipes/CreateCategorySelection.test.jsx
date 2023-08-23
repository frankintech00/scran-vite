import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CATEGORIES } from "../../../constants/categories";

import CreateCategorySelection from "../../../components/recipe/CreateCategorySelection";

describe("CreateCategorySelection component", () => {
  const recipe = {
    title: "Test Recipe",
    description: "Test Description",
    ingredients: "Test Ingredients",
    directions: "Test Directions",
    category: ["Breakfast"],
    image: "Test Image",
  };
  const setRecipe = vitest.fn(); // Mock the setRecipe function

  it("renders the CreateCategorySelection component", () => {
    render(
      <BrowserRouter>
        <CreateCategorySelection recipe={recipe} setRecipe={setRecipe} />
      </BrowserRouter>
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(CATEGORIES.length);

    const firstCheckbox = screen.getByLabelText(CATEGORIES[0]);
    expect(firstCheckbox).toHaveAttribute("id", CATEGORIES[0]);
    fireEvent.click(firstCheckbox);
    expect(setRecipe).toHaveBeenCalledTimes(1);
  });
});
