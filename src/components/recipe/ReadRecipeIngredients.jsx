/**
 * ReadRecipeIngredients Component.
 *
 * This component displays the list of ingredients required for a recipe.
 *
 * @param {Object} props - Component properties.
 * @param {Array<string>} props.ingredients - The list of ingredients for the recipe.
 *
 * @returns {JSX.Element} - The ReadRecipeIngredients component.
 */
function ReadRecipeIngredients({ ingredients }) {
  return (
    <div className="mb-4">
      {/* Display the "Ingredients:" section header */}
      <div className="font-bold text-secondary text-xl mb-3">Ingredients:</div>

      {/* Display the list of ingredients */}
      <ul className="list-disc list-inside space-y-3">
        {ingredients &&
          ingredients.map((ingredient, index) => (
            // Each ingredient is rendered as an individual list item
            <li key={index} className="font-semibold text-xl">
              {ingredient}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ReadRecipeIngredients;
