function CreateRecipeTitle({ recipe, setRecipe }) {
  return (
    <div>
      <label className="label" htmlFor="recipeName">
        <span className="text-base label-text">Recipe Name</span>
      </label>
      <input
        className="w-full input input-bordered input-primary"
        type="text"
        id="recipeName"
        name="recipeName"
        placeholder="Enter the name of your recipe..."
        value={recipe.recipeName}
        onChange={(e) => setRecipe({ ...recipe, recipeName: e.target.value })}
      />
    </div>
  );
}

export default CreateRecipeTitle;
