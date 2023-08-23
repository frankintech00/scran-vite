import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ReadRecipeRating from "../../../components/recipe/ReadRecipeRating";

describe("ReadRecipeRating component", () => {
  beforeEach(() => {
    vi.mock("@smastrom/react-rating", () => ({
      Rating: () => <div data-testid="mock-rating" />,
    }));
  });

  it("renders the rating correctly", () => {
    const recipe = {
      averageRating: 4.5,
      ratingCount: 10,
    };

    render(<ReadRecipeRating recipe={recipe} />);

    const ratingElement = screen.getByTestId("mock-rating");
    expect(ratingElement).toBeInTheDocument();

    const reviewElement = screen.getByText("4.5 from 10 reviews");
    expect(reviewElement).toBeInTheDocument();
  });

  it("renders 'Not yet rated' when there are no ratings", () => {
    const recipe = {
      averageRating: 0,
      ratingCount: 0,
    };

    render(<ReadRecipeRating recipe={recipe} />);

    const notRatedElement = screen.getByText("Not yet rated");
    expect(notRatedElement).toBeInTheDocument();
  });
});
