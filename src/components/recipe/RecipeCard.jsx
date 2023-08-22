import { useContext } from "react";
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import { RecipeContext } from "../../contexts/RecipeContext";
import { FavouriteRecipes } from "..";

function RecipeCard({ recipe }) {
  const id = recipe.id ? recipe.id : recipe.objectID;

  const { setRecipeFetchType, setSelectedCategory } = useContext(RecipeContext);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setRecipeFetchType("CATEGORY");
  };

  return (
    <div
      className="card bg-base-100 shadow-2xl aspect-[3/4]"
      data-testid={`recipe-${recipe.category}`}
    >
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
        <div className="card-actions flex justify-between">
          <div>
            {" "}
            {recipe.category &&
              recipe.category.map((cat, index) => (
                <div
                  key={index}
                  className="badge badge-outline cursor-pointer badge-lg mx-1"
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </div>
              ))}{" "}
          </div>
          <FavouriteRecipes recipeId={id} />
        </div>
        <div className="card-actions">
          <Link to={`/recipe/${recipe.id}`}>
            <h2 className="card-title flex-wrap text-2xl">
              {recipe.recipeName}
            </h2>
          </Link>
        </div>
        <div className="card-actions ">
          {recipe.averageRating && recipe.averageRating !== 0 && (
            <Rating
              style={{ maxWidth: 100 }}
              value={recipe.averageRating}
              readOnly
            />
          )}{" "}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
