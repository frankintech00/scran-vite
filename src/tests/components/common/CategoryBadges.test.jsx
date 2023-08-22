import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CategoryBadges from "../../../components/common/CategoryBadges";
import MockRecipeProvider from "../../mockContexts/MockRecipeProvider";

describe("CategoryBadges component", () => {
  it("renders the category badges", () => {
    render(
      <Router>
        <MockRecipeProvider>
          <CategoryBadges />
        </MockRecipeProvider>
      </Router>
    );

    const allRecipesBadge = screen.getByText("All Recipes");
    expect(allRecipesBadge).toBeInTheDocument();

    const categoryBadges = screen.getAllByRole("link");
    expect(categoryBadges).toHaveLength(9);
  });
});
