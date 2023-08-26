import { CATEGORIES } from "../../constants/categories";

/**
 * CreateCategorySelection Component
 *
 * Allows the user to select categories for a recipe.
 *
 * @param {Object} props - The component properties.
 * @param {Object} props.recipe - The recipe object.
 * @param {Function} props.setRecipe - Function to update the recipe object.
 * @returns {JSX.Element} The CreateCategorySelection component.
 */
function CreateCategorySelection({ recipe, setRecipe }) {
  /**
   * Handles the change in checkbox selection for categories.
   *
   * @param {Event} e - The change event.
   * @param {string} category - The name of the category.
   * @returns {void}
   */
  const handleCategoryChange = (e, category) => {
    if (e.target.checked) {
      // Add the category to the recipe object if checked
      setRecipe({
        ...recipe,
        category: [...recipe.category, category],
      });
    } else {
      // Remove the category from the recipe object if unchecked
      setRecipe({
        ...recipe,
        category: recipe.category.filter((c) => c !== category),
      });
    }
  };

  return (
    <div className="form-control">
      {/* Label for Categories */}
      <label className="label cursor-pointer">
        <span className="text-base label-text underline">Categories</span>
      </label>
      <div className="flex flex-wrap">
        {/* Render checkboxes for each category */}
        {CATEGORIES.map((category, index) => (
          <div
            key={index}
            className="w-1/2 p-1 md:w-1/3 lg:w-1/4 text-sm md:text-base"
          >
            <input
              className="checkbox checkbox-primary my-1 align-middle"
              type="checkbox"
              name={category}
              id={category}
              value={category}
              onChange={(e) => handleCategoryChange(e, category)}
              checked={recipe.category.includes(category)}
            />
            {/* Label for each checkbox */}
            <label className="align-middle ml-4" htmlFor={category}>
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateCategorySelection;
