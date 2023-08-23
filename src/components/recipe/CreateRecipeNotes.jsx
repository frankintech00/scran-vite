function CreateRecipeNotes({ recipe, setRecipe }) {
  return (
    <div>
      <label className="label" htmlFor="recipeNotes">
        <span className="text-base label-text">Notes</span>
      </label>
      <textarea
        className="w-full textarea textarea-bordered textarea-primary"
        type="textarea"
        id="recipeNotes"
        name="recipeNotes"
        placeholder="Enter any additional notes..."
        value={recipe.notes}
        onChange={(e) => setRecipe({ ...recipe, notes: e.target.value })}
      />
    </div>
  );
}

export default CreateRecipeNotes;
