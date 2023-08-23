import { render, screen } from "@testing-library/react";
import ReadRecipeCategories from "../../../components/recipe/ReadRecipeCategories";

describe("ReadRecipeCategories component", () => {
  it("renders the categories", () => {
    const categories = ["Breakfast", "Lunch", "Dinner"];

    render(<ReadRecipeCategories categories={categories} />);

    const categoriesHeading = screen.getByText("Categories:");
    expect(categoriesHeading).toBeInTheDocument();

    const categoryItems = screen.getAllByRole("listitem");
    expect(categoryItems).toHaveLength(categories.length);

    categories.forEach((category, index) => {
      expect(categoryItems[index]).toHaveTextContent(category);
    });
  });

  it("does not render anything when categories are empty", () => {
    const categories = [];

    render(<ReadRecipeCategories categories={categories} />);

    const categoriesHeading = screen.queryByText("Categories:");
    expect(categoriesHeading).not.toBeInTheDocument();
  });
});
