import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CategoryBadges from "../../../components/common/CategoryBadges";
import MockRecipeProvider from "../../mockContexts/MockRecipeProvider";

describe("CategoryBadges component", () => {
  it("renders the category badges and handles category click", () => {
    render(
      <Router>
        <MockRecipeProvider>
          <CategoryBadges />
        </MockRecipeProvider>
      </Router>
    );

    const allRecipesBadge = screen.getByText("All Recipes");
    expect(allRecipesBadge).toBeInTheDocument();

    const breakfastBadgeLink = screen.getByText("Breakfast").closest("a");
    expect(breakfastBadgeLink).toBeInTheDocument();

    fireEvent.click(breakfastBadgeLink);
  });
});
