import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { RecipeContext } from "../contexts/RecipeContext";
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
 * Renders the Update Recipe page.
 *
 * @returns {JSX.Element} The Update Recipe page component.
 */
function UpdateRecipePage() {
  const { getRecipe, updateRecipe, imageUpload } = useContext(RecipeContext);
  const { id } = useParams(); // Assuming the ID is passed as a parameter in the route
  const [recipe, setRecipe] = useState(null);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Fetches the recipe data based on the provided ID.
     *
     * @param {string} recipeId - The ID of the recipe.
     * @returns {void}
     */
    const fetchRecipe = async (recipeId) => {
      const currentRecipe = await getRecipe(recipeId);
      if (currentRecipe) {
        setRecipe(currentRecipe);
      }
    };

    fetchRecipe(id);
  }, [id, getRecipe]);

  /**
   * Handles the update of the recipe.
   *
   * @returns {void}
   */
  const handleUpdateRecipe = async () => {
    try {
      const imageUrl = image ? await imageUpload(image) : recipe.recipeImageURL;
      const updatedRecipe = {
        ...recipe,
        recipeImageURL: imageUrl,
      };
      await updateRecipe(id, updatedRecipe);
      navigate(`/recipe/${id}`);
    } catch (error) {
      console.error("Error updating the recipe:", error);
    }
  };

  return (
    <div className="flex flex-col items-center my-10 text-primary">
      {recipe && (
        <div className="w-full max-w-screen-lg px-4 py-20 rounded-lg shadow-2xl bg-base-100">
          <h1 className="mb-6 text-3xl font-semibold text-center">
            Update Recipe
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
              onClick={handleUpdateRecipe}
            >
              Update Recipe
            </button>
          </form>
        </div>
      )}
      {!recipe && <p>Loading recipe...</p>}
    </div>
  );
}

export default UpdateRecipePage;
