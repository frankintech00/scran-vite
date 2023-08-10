function RecipeDescription({ recipe, setRecipe }) {
  return (
    <div>
      <label className="label">
        <span className="text-base label-text">Recipe Description</span>
      </label>
      <textarea
        className="w-full textarea textarea-bordered textarea-primary"
        type="textarea"
        placeholder="Please provide a concise description of the recipe and any unique or notable aspects of the dish."
        value={recipe.description}
        onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
      />
    </div>
  );
}

export default RecipeDescription;
