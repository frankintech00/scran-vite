/**
 * CreateRecipeTitle Component.
 *
 * Renders an input field to input the recipe title.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.recipe - Current recipe object.
 * @param {Function} props.setRecipe - Function to update the recipe object.
 * @returns {JSX.Element} The CreateRecipeTitle component.
 */
function CreateRecipeTitle({ recipe, setRecipe }) {
  return (
    <div>
      {/* Label for the recipe name input */}
      <label className="label" htmlFor="recipeName">
        <span className="text-base label-text">Recipe Name</span>
      </label>

      {/* Input for the recipe name */}
      <input
        className="w-full input input-bordered input-primary"
        type="text"
        id="recipeName"
        name="recipeName"
        placeholder="Enter the name of your recipe..."
        value={recipe.recipeName}
        // Update recipe object with new recipe name
        onChange={(e) => setRecipe({ ...recipe, recipeName: e.target.value })}
      />
    </div>
  );
}

export default CreateRecipeTitle;
