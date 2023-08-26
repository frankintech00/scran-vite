/**
 * ReadRecipeDirections Component.
 *
 * This component displays the list of directions for preparing a recipe.
 * It enumerates each step and formats the output for better readability.
 *
 * @param {Object} props - Component properties.
 * @param {string[]} props.directions - Array of directions for the recipe.
 * @returns {JSX.Element} The ReadRecipeDirections component.
 */
function ReadRecipeDirections({ directions }) {
  return (
    <div className="mb-12">
      {/* Header for the Directions section */}
      <div className="font-bold text-secondary text-xl mb-3">Directions:</div>

      {/* Unordered list to display each direction */}
      <ul className="list-inside space-y-3">
        {/* Conditionally render list items based on available directions */}
        {directions &&
          directions.map((direction, index) => (
            <li key={index} className="font-semibold text-xl">
              {/* Annotated step number and total steps */}
              <span className="text-secondary">
                {"Step " + (index + 1) + " of " + directions.length + ": "}
              </span>

              {/* The actual direction text */}
              <span>{direction}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ReadRecipeDirections;
