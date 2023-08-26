import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { RecipeContext } from "../contexts/RecipeContext";
import { UserContext } from "../contexts/UserContext";
import {
  CreateRecipeTitle,
  CreateCategorySelection,
  CreateImageUpload,
  CreateRecipeInfo,
  CreateRecipeDescription,
  CreateIngredientsList,
  CreateDirectionsList,
  CreateRecipeNotes,
} from "../components";

/**
 * Renders the Create Recipe page.
 *
 * @returns {JSX.Element} The Create Recipe page component.
 */
function CreateRecipePage() {
  const { createRecipe, imageUpload, recipe, setRecipe } =
    useContext(RecipeContext);
  const { isLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Reset the recipe state to its default values
    setRecipe({
      recipeName: "",
      category: [],
      difficulty: "",
      preparationTime: "",
      cookingTime: "",
      servings: "",
      description: "",
      ingredients: [],
      directions: [],
      notes: "",
    });
  }, [setRecipe]);

  /**
   * Handles the creation of a new recipe.
   *
   * @param {Object} recipe - The recipe object.
   * @returns {void}
   */
  const handleCreateRecipe = async (recipe) => {
    const imageUrl = await handleUploadImage();
    const recipeId = await createRecipe({
      ...recipe,
      recipeImageURL: imageUrl,
    });
    navigate(`/recipe/${recipeId}`);
  };

  /**
   * Handles the upload of an image.
   *
   * @returns {Promise<string>} The URL of the uploaded image.
   */
  const handleUploadImage = async () => {
    let imageUrl = null;
    if (image) {
      imageUrl = await imageUpload(image);
    }
    return imageUrl;
  };

  return (
    isLoggedIn && (
      <div className="flex flex-col items-center my-10 text-primary">
        <div className="w-full max-w-screen-lg px-4 py-20 rounded-lg shadow-2xl bg-base-100">
          <h1 className="mb-6 text-3xl font-semibold text-center">
            Create a new recipe.
          </h1>
          <form
            className="w-10/12 space-y-4 form-control"
            onSubmit={(e) => e.preventDefault()}
          >
            <CreateRecipeTitle recipe={recipe} setRecipe={setRecipe} />
            <CreateImageUpload onImageChange={(file) => setImage(file)} />
            <CreateCategorySelection recipe={recipe} setRecipe={setRecipe} />
            <CreateRecipeInfo recipe={recipe} setRecipe={setRecipe} />
            <CreateRecipeDescription recipe={recipe} setRecipe={setRecipe} />
            <CreateIngredientsList recipe={recipe} setRecipe={setRecipe} />
            <CreateDirectionsList recipe={recipe} setRecipe={setRecipe} />
            <CreateRecipeNotes recipe={recipe} setRecipe={setRecipe} />
            <button
              type="button"
              className="flex items-center justify-center w-10/12 mx-auto my-3 shadow-md btn btn-primary"
              onClick={() => handleCreateRecipe(recipe)}
            >
              Create a New Recipe
            </button>
          </form>
        </div>
      </div>
    )
  );
}

export default CreateRecipePage;
