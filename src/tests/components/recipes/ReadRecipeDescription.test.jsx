import { render, screen } from "@testing-library/react";

import ReadRecipeDescription from "../../../components/recipe/ReadRecipeDescription";

describe("ReadRecipeDescription component", () => {
  it("renders the recipe description", () => {
    const description = "This is a delicious recipe.";
    render(<ReadRecipeDescription description={description} />);
    const descriptionElement = screen.getByText(description);
    expect(descriptionElement).toBeInTheDocument();
  });
});
