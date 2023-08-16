import { useContext } from "react";
import { Link } from "react-router-dom";
import { FiClock } from "react-icons/fi";
import { Rating } from "@smastrom/react-rating";
import { RecipeContext } from "../../contexts/RecipeContext";

function RecipeCard({ recipe }) {
  const totalTime = recipe.preparationTime + recipe.cookingTime;
  const hours = Math.floor(totalTime / 60);
  const minutes = totalTime % 60;

  const id = recipe.id ? recipe.id : recipe.objectID;

  const { fetchRecipesByCategory } = useContext(RecipeContext);

  const handleCategoryClick = async (category) => {
    try {
      await fetchRecipesByCategory(category);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl aspect-[3/4]">
      <figure className="relative aspect-square h-3/5">
        <Link to={`/recipe/${id}`} className="m-2">
          <img
            src={recipe.recipeImageURL}
            alt={recipe.recipeName}
            className="absolute inset-0 object-cover w-full h-full "
          />
        </Link>
      </figure>
      <div className="card-body p-2 justify-around">
        <div className="card-actions justify-start">
          {recipe.category &&
            recipe.category.map((cat, index) => (
              <div
                key={index}
                className="badge badge-outline cursor-pointer"
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </div>
            ))}
        </div>

        <Link to={`/recipe/${recipe.id}`} className="m-2">
          <h2 className="card-title text-2xl flex-wrap md:text-xl">
            {recipe.recipeName}
          </h2>
        </Link>

        <div className="card-actions justify-between">
          <div className="flex items-center space-x-1 text-lg md:text-base text-gray-500">
            <FiClock />
            <span>
              {totalTime >= 60 ? `${hours} Hrs ` : ""}
              {minutes} Mins
            </span>
          </div>
          <Rating style={{ maxWidth: 120 }} value={3} readOnly />
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
