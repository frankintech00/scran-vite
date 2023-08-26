/**
 * ReadRecipeCategories Component.
 *
 * This component displays the categories associated with a recipe.
 *
 * @param {Object} props - Component properties.
 * @param {Array<string>} props.categories - Array containing the categories names.
 *
 * @returns {JSX.Element|null} - The ReadRecipeCategories component or null if no categories are provided.
 */
function ReadRecipeCategories({ categories }) {
  // Return null if categories are missing or empty.
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <nav className="categories mb-5 flex flex-col ">
      {/* Title for the categories section */}
      <h3 className="font-semibold uppercase mb-3">Categories:</h3>

      {/* Display list of categories */}
      <ul className="flex flex-wrap gap-4">
        {categories.map((category, index) => (
          <li
            key={index}
            className="rounded-md px-2 py-1 bg-primary text-primary bg-opacity-30"
          >
            {/* Display individual category */}
            {category}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default ReadRecipeCategories;
