import React from "react";
import { render, screen } from "@testing-library/react";
import ReadRecipeTitle from "../../../components/recipe/ReadRecipeTitle";

describe("ReadRecipeTitle component", () => {
  const recipeName = "Delicious Recipe";

  it("renders the recipe title", () => {
    render(<ReadRecipeTitle name={recipeName} />);

    const recipeTitleElement = screen.getByText(recipeName);
    expect(recipeTitleElement).toBeInTheDocument();
  });
});
