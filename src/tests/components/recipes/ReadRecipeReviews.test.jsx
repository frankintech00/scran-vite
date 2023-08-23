import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ReadRecipeReviews from "../../../components/recipe/ReadRecipeReviews";

describe("ReadRecipeReviews component", () => {
  beforeEach(() => {
    vi.mock("@smastrom/react-rating", () => ({
      Rating: () => <div data-testid="mock-rating" />,
    }));
  });
  const recipe = {
    id: "recipeId",
    recipeImageURL: "https://example.com/recipe.jpg",
    recipeName: "Delicious Recipe",
    category: ["Category 1", "Category 2"],
    averageRating: 4.5,
    ratingCount: 10,
    comments: [
      {
        text: "Great recipe!",
        rating: 4,
        user: "User1",
        time: new Date(),
      },
    ],
  };

  const user = {
    displayName: "Test User",
    photoURL: "https://test.com/test.jpg",
  };

  const handleDeleteComment = vitest.fn();

  it("renders the ReadRecipeReviews component", () => {
    render(
      <ReadRecipeReviews
        recipe={recipe}
        user={user}
        handleDeleteComment={handleDeleteComment}
      />
    );

    const ratingElements = screen.getAllByTestId("mock-rating");
    expect(ratingElements).toHaveLength(recipe.comments.length);

    const deleteReviewButtons = screen.getAllByText("Delete Review");
    deleteReviewButtons.forEach((button) => {
      fireEvent.click(button);
    });

    expect(handleDeleteComment).toHaveBeenCalledTimes(recipe.comments.length);

    recipe.comments.forEach((comment) => {
      if (comment.text) {
        const commentTextElement = screen.getByText(comment.text);
        expect(commentTextElement).toBeInTheDocument();
      }

      if (comment.user) {
        const commentUserElement = screen.getByText(`By: ${comment.user}`);
        expect(commentUserElement).toBeInTheDocument();
      }
      if (comment.time instanceof Date) {
        const commentTimeElement = screen.getByText(
          comment.time.toDateString()
        );
        expect(commentTimeElement).toBeInTheDocument();
      }
    });
  });
});
