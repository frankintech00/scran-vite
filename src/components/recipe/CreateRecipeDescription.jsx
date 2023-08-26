/**
 * CreateRecipeDescription Component.
 *
 * Renders a textarea for inputting a description for the recipe.
 * Provides context and additional details that give a better understanding of the dish.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.recipe - The current recipe object.
 * @param {Function} props.setRecipe - Function to update the recipe object.
 * @returns {JSX.Element} The CreateRecipeDescription component.
 */
function CreateRecipeDescription({ recipe, setRecipe }) {
  return (
    <div>
      {/* Label for the description textarea */}
      <label className="label" htmlFor="recipeDescription">
        <span className="text-base label-text">Recipe Description</span>
      </label>

      {/* Textarea for entering the recipe description */}
      <textarea
        className="w-full textarea textarea-bordered textarea-primary"
        type="textarea"
        name="recipeDescription"
        id="recipeDescription"
        placeholder="Please provide a concise description of the recipe and any unique or notable aspects of the dish."
        value={recipe.description}
        onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
      />
    </div>
  );
}

export default CreateRecipeDescription;
