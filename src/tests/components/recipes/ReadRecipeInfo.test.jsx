import React from "react";
import { render, screen } from "@testing-library/react";
import ReadRecipeInfo from "../../../components/recipe/ReadRecipeInfo";

describe("ReadRecipeInfo component", () => {
  it("renders the recipe info correctly", () => {
    const preparationTime = 30;
    const cookingTime = 45;
    const servings = 4;
    const difficulty = "Intermediate";

    render(
      <ReadRecipeInfo
        preparationTime={preparationTime}
        cookingTime={cookingTime}
        servings={servings}
        difficulty={difficulty}
      />
    );

    const prepTimeElement = screen.getByText("Prep Time:");
    expect(prepTimeElement).toBeInTheDocument();
    const prepTimeValueElement = screen.getByText(`${preparationTime} Mins.`);
    expect(prepTimeValueElement).toBeInTheDocument();

    const cookTimeElement = screen.getByText("Cook Time:");
    expect(cookTimeElement).toBeInTheDocument();
    const cookTimeValueElement = screen.getByText(`${cookingTime} Mins.`);
    expect(cookTimeValueElement).toBeInTheDocument();

    const servingsElement = screen.getByText("Servings:");
    expect(servingsElement).toBeInTheDocument();
    const servingsValueElement = screen.getByText(servings.toString());
    expect(servingsValueElement).toBeInTheDocument();

    const difficultyElement = screen.getByText("Difficulty:");
    expect(difficultyElement).toBeInTheDocument();
    const difficultyValueElement = screen.getByText(difficulty);
    expect(difficultyValueElement).toBeInTheDocument();
  });
});
