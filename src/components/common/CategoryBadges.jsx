import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { RecipeContext } from "../../contexts/RecipeContext";

import { CATEGORIES } from "../../constants/categories";

const categories = ["All Recipes", ...CATEGORIES];

function CategoryBadges() {
  const { fetchRecipesByCategory, fetchRecipes } = useContext(RecipeContext);

  const handleCategoryClick = (category) => {
    if (category === "All Recipes") {
      fetchRecipes();
    } else {
      fetchRecipesByCategory(category);
    }
  };

  return (
    <div className="flex-row flex-wrap justify-around text-center uppercase flex mb-6 w-9/12 mx-auto">
      {categories.map((category) => (
        <div
          key={category}
          className=" bg-white badge badge-outline badge-primary m-2 md:badge-lg"
        >
          <NavLink to="/" onClick={() => handleCategoryClick(category)}>
            {category}
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default CategoryBadges;
