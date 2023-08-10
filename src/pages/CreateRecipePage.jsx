import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { RecipeContext } from "../contexts/RecipeContext";
import { UserContext } from "../contexts/UserContext";
import {
  RecipeTitle,
  CategorySelection,
  ImageUpload,
  RecipeInfo,
  RecipeDescription,
  IngredientsList,
  DirectionsList,
  RecipeNotes,
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
    comments: [],
    ratings: [],
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
        <div className="w-full max-w-screen-lg px-4 py-20 rounded-lg shadow-2xl bg-primary bg-opacity-5">
          <h1 className="mb-6 text-3xl font-semibold text-center">
            Create a new recipe.
          </h1>
          <form
            className="w-10/12 space-y-4 form-control"
            onSubmit={(e) => e.preventDefault()}
          >
            <RecipeTitle recipe={recipe} setRecipe={setRecipe} />
            <ImageUpload onImageChange={(file) => setImage(file)} />{" "}
            <CategorySelection recipe={recipe} setRecipe={setRecipe} />
            <RecipeInfo recipe={recipe} setRecipe={setRecipe} />
            <RecipeDescription recipe={recipe} setRecipe={setRecipe} />
            <IngredientsList recipe={recipe} setRecipe={setRecipe} />
            <DirectionsList recipe={recipe} setRecipe={setRecipe} />
            <RecipeNotes recipe={recipe} setRecipe={setRecipe} />
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
