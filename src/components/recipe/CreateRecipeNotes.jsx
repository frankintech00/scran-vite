/**
 * CreateRecipeNotes Component.
 *
 * Renders a textarea for inputting additional recipe notes.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.recipe - Current recipe object.
 * @param {Function} props.setRecipe - Function to update the recipe object.
 * @returns {JSX.Element} The CreateRecipeNotes component.
 */
function CreateRecipeNotes({ recipe, setRecipe }) {
  return (
    <div>
      {/* Label for the recipe notes textarea */}
      <label className="label" htmlFor="recipeNotes">
        <span className="text-base label-text">Notes</span>
      </label>

      {/* Textarea for additional recipe notes */}
      <textarea
        className="w-full textarea textarea-bordered textarea-primary"
        type="textarea"
        id="recipeNotes"
        name="recipeNotes"
        placeholder="Enter any additional notes..."
        value={recipe.notes}
        // Update recipe object with new notes
        onChange={(e) => setRecipe({ ...recipe, notes: e.target.value })}
      />
    </div>
  );
}

export default CreateRecipeNotes;
