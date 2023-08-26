import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { RecipeContext } from "../../contexts/RecipeContext";

import { CATEGORIES } from "../../constants/categories";

/**
 * Array of categories including "All Recipes" and predefined categories.
 *
 * @type {string[]}
 */
const categories = ["All Recipes", ...CATEGORIES];

/**
 * Renders category badges for filtering recipes.
 *
 * @returns {JSX.Element} The CategoryBadges component.
 */
function CategoryBadges() {
  const { setRecipeFetchType, setSelectedCategory } = useContext(RecipeContext);

  /**
   * Handles the click event on a category badge.
   *
   * @param {string} category - The category that was clicked.
   * @returns {void}
   */
  const handleCategoryClick = (category) => {
    if (category === "All Recipes") {
      setRecipeFetchType("ALL");
    } else {
      setSelectedCategory(category);
      setRecipeFetchType("CATEGORY");
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
