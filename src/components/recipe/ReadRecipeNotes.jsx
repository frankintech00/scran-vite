/**
 * ReadRecipeNotes Component.
 *
 * This component displays the additional notes provided for a recipe.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.notes - The notes related to the recipe.
 *
 * @returns {JSX.Element} - The ReadRecipeNotes component.
 */
function ReadRecipeNotes({ notes }) {
  return (
    <div className="mb-12">
      {/* Display the "Notes:" section header */}
      <div className="font-bold text-secondary text-xl mb-3">Notes:</div>

      {/* Display the actual notes */}
      <p className="font-semibold text-xl">{notes}</p>
    </div>
  );
}

export default ReadRecipeNotes;
