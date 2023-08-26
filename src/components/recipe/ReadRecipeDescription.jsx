/**
 * ReadRecipeDescription Component.
 *
 * This component displays the description of the recipe.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.description - Description text for the recipe.
 * @returns {JSX.Element} The ReadRecipeDescription component.
 */
function ReadRecipeDescription({ description }) {
  return (
    <div className="flex">
      {/* Header text displaying the description */}
      <h2 className="text-2xl font-medium flex-wrap text-gray-600">
        {description}
      </h2>
    </div>
  );
}

export default ReadRecipeDescription;
