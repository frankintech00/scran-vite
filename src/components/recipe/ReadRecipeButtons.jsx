import { useNavigate } from "react-router-dom";

/**
 * ReadRecipeButtons Component.
 *
 * Renders buttons for updating and deleting a recipe, only visible to the recipe owner.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.user - The current user.
 * @param {Object} props.recipe - The recipe data.
 * @param {Function} props.deleteRecipe - Function to delete the recipe.
 * @returns {JSX.Element|null} The ReadRecipeButtons component, or null if the user is not authorized.
 */
function ReadRecipeButtons({ user, recipe, deleteRecipe }) {
  // Use React Router's useNavigate hook for navigation.
  const navigate = useNavigate();
  const id = recipe.id; // Recipe ID

  /**
   * Handles the recipe deletion.
   *
   * Deletes the recipe and navigates to the home page.
   *
   * @returns {void}
   */
  const handleDelete = () => {
    deleteRecipe(id);
    navigate("/"); // Navigate back to the home page after deletion
  };

  // Only render buttons if the current user is the owner of the recipe.
  return (
    user &&
    user.uid === recipe.userId && (
      <div className="flex flex-row space-x-2 justify-around sm:justify-start">
        <button
          className="flex items-center justify-center shadow-md btn btn-primary btn-sm"
          onClick={() => navigate(`/update-recipe/${id}`)} // Navigate to the update recipe page
        >
          Update Recipe
        </button>
        <button
          className="flex items-center justify-center shadow-md btn btn-sm btn-warning"
          onClick={handleDelete} // Handle recipe deletion
        >
          Delete Recipe
        </button>
      </div>
    )
  );
}

export default ReadRecipeButtons;
