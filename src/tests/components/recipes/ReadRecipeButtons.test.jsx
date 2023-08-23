import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import ReadRecipeButtons from "../../../components/recipe/ReadRecipeButtons";

describe("ReadRecipeButtons component", () => {
  const user = { uid: "testUserId" };
  const recipe = {
    id: "testRecipeId",
    userId: "testUserId",
  };
  const deleteRecipe = vitest.fn();

  it("renders the ReadRecipeButtons component", () => {
    render(
      <BrowserRouter>
        <ReadRecipeButtons
          user={user}
          recipe={recipe}
          deleteRecipe={deleteRecipe}
        />
      </BrowserRouter>
    );

    const updateButton = screen.getByRole("button", { name: "Update Recipe" });
    expect(updateButton).toBeInTheDocument();

    fireEvent.click(updateButton);

    const deleteButton = screen.getByRole("button", { name: "Delete Recipe" });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    expect(deleteRecipe).toHaveBeenCalledWith(recipe.id);
  });
});
