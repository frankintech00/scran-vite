import { render, screen, fireEvent } from "@testing-library/react";
import ReadRecipeComments from "../../../components/recipe/ReadRecipeComments";
import { vi } from "vitest";

describe("ReadRecipeComments component", () => {
  const user = { uid: "testUserId" };
  const isLoggedIn = true;
  const rating = 3;
  const setRating = vi.fn();
  const newComment = "Test comment";
  const setNewComment = vi.fn();
  const addComment = vi.fn();
  const deleteComment = vi.fn();
  const id = "testRecipeId";
  const getComment = vi.fn().mockResolvedValue([]);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  vi.mock("@smastrom/react-rating", () => ({
    Rating: ({ value, onChange }) => (
      <div data-testid="mock-rating" onClick={() => onChange(5)}>
        Mock Rating Component - Value: {value}
      </div>
    ),
  }));

  it("renders the 'Add Review' button when user is logged in", () => {
    render(
      <ReadRecipeComments
        user={user}
        isLoggedIn={isLoggedIn}
        rating={rating}
        setRating={setRating}
        newComment={newComment}
        setNewComment={setNewComment}
        addComment={addComment}
        deleteComment={deleteComment}
        id={id}
        getComment={getComment}
      />
    );

    const mockRating = screen.getByTestId("mock-rating");
    expect(mockRating).toBeInTheDocument();
    fireEvent.click(mockRating);
    expect(setRating).toHaveBeenCalledWith(5);

    const addReviewTextarea = screen.getByPlaceholderText(
      "Add your review here..."
    );
    expect(addReviewTextarea).toBeInTheDocument();
    fireEvent.change(addReviewTextarea, { target: { value: "Test comment" } });

    const addReviewButton = screen.getByRole("button", { name: "Add Review" });
    expect(addReviewButton).toBeInTheDocument();
  });
});
