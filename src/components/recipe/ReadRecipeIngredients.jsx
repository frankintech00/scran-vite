function ReadRecipeIngredients({ ingredients }) {
  return (
    <div className="mb-4">
      <div className="font-bold text-secondary text-xl mb-3">Ingredients:</div>
      <ul className="list-disc list-inside space-y-3">
        {ingredients &&
          ingredients.map((ingredient, index) => (
            <li key={index} className="font-semibold text-xl">
              {ingredient}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ReadRecipeIngredients;
