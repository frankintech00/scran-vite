import { render, screen } from "@testing-library/react";
import ReadRecipeDirections from "../../../components/recipe/ReadRecipeDirections";

describe("ReadRecipeDirections component", () => {
  it("renders the directions", () => {
    const directions = [
      "Step 1: Preheat the oven",
      "Step 2: Mix the ingredients",
      "Step 3: Bake for 30 minutes",
    ];

    render(<ReadRecipeDirections directions={directions} />);

    const directionsHeading = screen.getByText("Directions:");
    expect(directionsHeading).toBeInTheDocument();

    const directionItems = screen.getAllByRole("listitem");
    expect(directionItems).toHaveLength(directions.length);

    directions.forEach((direction, index) => {
      const stepText = `Step ${index + 1} of ${directions.length}:`;
      const stepElement = screen.getByText(stepText);
      expect(stepElement).toBeInTheDocument();

      const directionElement = screen.getByText(direction);
      expect(directionElement).toBeInTheDocument();
    });
  });

  it("does not render the directions when directions are empty", () => {
    const directions = [];

    render(<ReadRecipeDirections directions={directions} />);

    const directionItems = screen.queryAllByRole("listitem");
    expect(directionItems).toHaveLength(0);
  });
});
