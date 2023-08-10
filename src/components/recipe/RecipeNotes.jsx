function RecipeNotes({ recipe, setRecipe }) {
  return (
    <div>
      <label className="label">
        <span className="text-base label-text">Notes</span>
      </label>
      <textarea
        className="w-full textarea textarea-bordered textarea-primary"
        type="textarea"
        placeholder="Enter any additional notes..."
        value={recipe.notes}
        onChange={(e) => setRecipe({ ...recipe, notes: e.target.value })}
      />
    </div>
  );
}

export default RecipeNotes;
