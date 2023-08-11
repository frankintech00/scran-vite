import { useNavigate } from "react-router-dom";

function ReadRecipeButtons({ user, recipe, deleteRecipe }) {
  const navigate = useNavigate();
  const id = recipe.id;
  console.log("Recipe object:", recipe);
  console.log("Recipe ID:", id);

  console.log("deleteRecipe function:", deleteRecipe);

  const handleDelete = () => {
    deleteRecipe(id);
    navigate("/");
  };

  return (
    user &&
    user.uid === recipe.userId && (
      <div className="flex flex-row space-x-2 justify-around sm:justify-start">
        <button
          className="flex items-center justify-center shadow-md btn btn-primary btn-sm"
          onClick={() => navigate(`/update-recipe/${id}`)}
        >
          Update Recipe
        </button>
        <button
          className="flex items-center justify-center shadow-md btn btn-sm btn-warning"
          onClick={handleDelete}
        >
          Delete Recipe
        </button>
      </div>
    )
  );
}

export default ReadRecipeButtons;
