/**
 * ReadRecipeTitle Component.
 *
 * This component displays the title of the recipe.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.name - The name of the recipe to be displayed.
 *
 * @returns {JSX.Element} - The ReadRecipeTitle component.
 */
function ReadRecipeTitle({ name }) {
  return (
    <div>
      {/* Displaying the recipe name as a title */}
      <h3 className="text-5xl font-semibold text-secondary ">{name}</h3>
    </div>
  );
}

export default ReadRecipeTitle;
