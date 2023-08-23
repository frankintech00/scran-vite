import React from "react";
import { render, screen } from "@testing-library/react";
import ReadRecipeImage from "../../../components/recipe/ReadRecipeImage";

describe("ReadRecipeImage component", () => {
  it("renders the image correctly", () => {
    const imageUrl = "https://example.com/image.jpg";
    const recipeName = "Delicious Recipe";

    render(<ReadRecipeImage imageUrl={imageUrl} recipeName={recipeName} />);

    const imageElement = screen.getByAltText(recipeName);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", imageUrl);
  });
});
