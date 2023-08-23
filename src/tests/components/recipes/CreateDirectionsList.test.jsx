import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CreateDirectionsList from "../../../components/recipe/CreateDirectionsList";
import MockRecipeProvider from "../../mockContexts/MockRecipeProvider";

describe("CreateDirectionsList component", () => {
  const category = "Breakfast";
  const recipe = {
    title: "Test Recipe",
    description: "Test Description",
    ingredients: "Test Ingredients",
    directions: ["Test Directions"],
    category: ["Breakfast"],
    image: "Test Image",
  };

  it("renders the CreateDirectionsList component", () => {
    render(
      <BrowserRouter>
        <MockRecipeProvider>
          <CreateDirectionsList category={category} recipe={recipe} />
        </MockRecipeProvider>
      </BrowserRouter>
    );

    const directionTextbox = screen.getByPlaceholderText(
      "Enter a direction..."
    );
    expect(directionTextbox).toBeInTheDocument();

    // Find the button
    const directionButton = screen.getByRole("button", {
      name: "Add Direction",
    });
    expect(directionButton).toBeInTheDocument();

    // Simulate button click
    fireEvent.click(directionButton);

    // Check that the direction was added
    const direction = screen.getByText("Test Directions");
    expect(direction).toBeInTheDocument();
  });
});
