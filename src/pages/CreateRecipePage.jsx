import { useContext, useState } from "react";
import { FiDelete } from "react-icons/fi";
import { useNavigate } from "react-router";
import { RecipeContext } from "../contexts/RecipeContext";
import { UserContext } from "../contexts/UserContext";

function CreateRecipePage() {
  const { createRecipe, imageUpload } = useContext(RecipeContext);
  const { user } = useContext(UserContext);

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
  });

  const [ingredientInput, setIngredientInput] = useState("");
  const [directionInput, setDirectionInput] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [thumbUrl, setThumbUrl] = useState("");

  const difficulties = ["Easy", "Medium", "Hard"]; //TODO: Add more difficulties

  const categories = [
    "Cake",
    "Dessert",
    "Soup",
    "Salad",
    "Snack",
    "Breakfast",
    "Lunch",
    "Dinner",
  ];

  const handleCreateRecipe = async (recipe) => {
    const imageUrl = await handleUploadImage();
    const recipeId = await createRecipe({
      ...recipe,
      recipeImageURL: imageUrl,
    });
    console.log(recipeId);
    navigate(`/recipe/${recipeId}`);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);

      // To preview the image
      const url = URL.createObjectURL(e.target.files[0]);
      setThumbUrl(url);
    }
  };

  const handleUploadImage = async () => {
    let imageUrl = null;
    if (image) {
      imageUrl = await imageUpload(image);
      setImageUrl(imageUrl);
    }
    return imageUrl;
  };

  const handleCategoryChange = (e, category) => {
    if (e.target.checked) {
      setRecipe({
        ...recipe,
        category: [...recipe.category, category],
      });
    } else {
      setRecipe({
        ...recipe,
        category: recipe.category.filter((c) => c !== category),
      });
    }
  };

  const handleIngredientSubmit = (e) => {
    e.preventDefault();
    if (ingredientInput.trim() !== "") {
      setRecipe({
        ...recipe,
        ingredients: [...recipe.ingredients, ingredientInput],
      });
      setIngredientInput("");
    }
  };

  const handleIngredientDelete = (index) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients.splice(index, 1);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleDirectionSubmit = (e) => {
    e.preventDefault();
    if (directionInput.trim() !== "") {
      setRecipe({
        ...recipe,
        directions: [...recipe.directions, directionInput],
      });
      setDirectionInput("");
    }
  };

  const handleDirectionDelete = (index) => {
    const newDirections = [...recipe.directions];
    newDirections.splice(index, 1);
    setRecipe({ ...recipe, directions: newDirections });
  };

  return (
    user && (
      <div className="flex flex-col items-center my-10 text-primary">
        <div className="w-full max-w-screen-lg px-4 py-20 rounded-lg shadow-2xl bg-primary bg-opacity-5">
          <h1 className="mb-6 text-3xl font-semibold text-center">
            Create a new recipe.
          </h1>
          <form
            className="w-10/12 space-y-4 form-control"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="label">
                <span className="text-base label-text">Recipe Name</span>
              </label>
              <input
                className="w-full input input-bordered input-primary"
                type="text"
                placeholder="Enter the name of your recipe..."
                value={recipe.recipeName}
                onChange={(e) =>
                  setRecipe({ ...recipe, recipeName: e.target.value })
                }
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text">Recipe Image</span>
              </label>
              <input
                className="w-full max-w-xs file-input file-input-bordered file-input-primary"
                type="file"
                onChange={handleImageChange}
              />
            </div>
            {thumbUrl && (
              <img src={thumbUrl} alt="Thumbnail Preview" height="20" />
            )}

            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="text-base underline label-text">
                  Categories
                </span>
              </label>
              <div className="flex flex-wrap">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="w-1/2 p-1 text-sm md:w-1/3 lg:w-1/4 md:text-base"
                  >
                    <input
                      className="my-1 align-middle checkbox checkbox-primary"
                      type="checkbox"
                      value={category}
                      onChange={(e) => handleCategoryChange(e, category)}
                    />
                    <label className="ml-4 align-middle">{category}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap justify-between">
              <div className="w-full px-2 sm:w-1/2 lg:w-1/4">
                <label className="label">
                  <span className="text-base label-text">Difficulty</span>
                </label>
                <select
                  className="w-full select select-bordered select-primary"
                  value={recipe.difficulty}
                  onChange={(e) =>
                    setRecipe({ ...recipe, difficulty: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select difficulty...
                  </option>
                  {difficulties.map((difficulty, index) => (
                    <option key={index} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full px-2 sm:w-1/2 lg:w-1/4">
                <label className="label">
                  <span className="text-base label-text">Servings</span>
                </label>
                <input
                  className="w-full input input-bordered input-primary"
                  type="number"
                  placeholder="0"
                  min="0"
                  value={recipe.servings}
                  onChange={(e) =>
                    setRecipe({ ...recipe, servings: Number(e.target.value) })
                  }
                />
              </div>
              <div className="w-full px-2 sm:w-1/2 lg:w-1/4">
                <label className="label">
                  <span className="text-base label-text">
                    Preperation Time (Mins)
                  </span>
                </label>
                <input
                  className="w-full input input-bordered input-primary"
                  type="number"
                  placeholder="0"
                  min="0"
                  value={recipe.preparationTime}
                  onChange={(e) =>
                    setRecipe({
                      ...recipe,
                      preparationTime: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="w-full px-2 sm:w-1/2 lg:w-1/4">
                <label className="label">
                  <span className="text-base label-text">
                    Cooking Time (Mins)
                  </span>
                </label>
                <input
                  className="w-full input input-bordered input-primary"
                  type="number"
                  placeholder="0"
                  min="0"
                  value={recipe.cookingTime}
                  onChange={(e) =>
                    setRecipe({
                      ...recipe,
                      cookingTime: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text">Recipe Description</span>
              </label>
              <textarea
                className="w-full textarea textarea-bordered textarea-primary"
                type="textarea"
                placeholder="Please provide a concise description of the recipe and any unique or notable aspects of the dish."
                value={recipe.description}
                onChange={(e) =>
                  setRecipe({ ...recipe, description: e.target.value })
                }
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Ingredients</span>
              </label>
              <input
                className="w-full input input-bordered input-primary"
                type="text"
                placeholder="Enter an ingredient..."
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
              />
              <button
                type="button"
                className="flex items-center justify-center my-3 shadow-md btn btn-primary btn-sm"
                onClick={handleIngredientSubmit}
              >
                Add Ingredient
              </button>
              <ul className="mt-2 space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg bg-primary bg-opacity-5"
                  >
                    <span>{ingredient}</span>
                    <FiDelete
                      color="red"
                      className="cursor-pointer"
                      onClick={() => handleIngredientDelete(index)}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text">Directions</span>
              </label>
              <input
                className="w-full input input-bordered input-primary"
                type="text"
                placeholder="Enter a direction..."
                value={directionInput}
                onChange={(e) => setDirectionInput(e.target.value)}
              />
              <button
                type="button"
                className="flex items-center justify-center my-3 shadow-md btn btn-primary btn-sm"
                onClick={handleDirectionSubmit}
              >
                Add Direction
              </button>
              <ol className="mt-2 space-y-2">
                {recipe.directions.map((direction, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg bg-primary bg-opacity-5"
                  >
                    <span>{direction}</span>
                    <button
                      className="ml-6"
                      onClick={() => handleDirectionDelete(index)}
                    >
                      <FiDelete color="red" />
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text">Notes</span>
              </label>
              <textarea
                className="w-full textarea textarea-bordered textarea-primary"
                type="textarea"
                placeholder="Enter any additional notes..."
                value={recipe.notes}
                onChange={(e) =>
                  setRecipe({ ...recipe, notes: e.target.value })
                }
              />
            </div>
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
