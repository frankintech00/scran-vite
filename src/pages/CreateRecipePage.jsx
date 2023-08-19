import { useContext, useState } from "react";
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

function CreateRecipePage() {
  const { createRecipe, imageUpload } = useContext(RecipeContext);
  const { isLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
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

  const [image, setImage] = useState(null); // Keep the image state here

  const handleCreateRecipe = async (recipe) => {
    const imageUrl = await handleUploadImage();
    const recipeId = await createRecipe({
      ...recipe,
      recipeImageURL: imageUrl,
    });
    console.log(recipeId);
    navigate(`/recipe/${recipeId}`);
  };

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
            <CreateImageUpload onImageChange={(file) => setImage(file)} />{" "}
            <CreateCategorySelection recipe={recipe} setRecipe={setRecipe} />
            <CreateRecipeInfo recipe={recipe} setRecipe={setRecipe} />
            <CreateRecipeDescription recipe={recipe} setRecipe={setRecipe} />
            <CreateIngredientsList recipe={recipe} setRecipe={setRecipe} />
            <CreateDirectionsList recipe={recipe} setRecipe={setRecipe} />
            <CreateRecipeNotes recipe={recipe} setRecipe={setRecipe} />
            <button
              type="submit"
              className="flex items-center justify-center w-10/12 mx-auto my-3 shadow-md btn btn-primary"
              onSubmit={() => handleCreateRecipe(recipe)}
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
