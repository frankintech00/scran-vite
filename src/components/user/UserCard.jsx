import { BiPlus } from "react-icons/bi";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { RecipeContext } from "../../contexts/RecipeContext";
import { Link } from "react-router-dom";

function UserCard() {
  const { user } = useContext(UserContext);
  const { fetchRecipesByUser } = useContext(RecipeContext);

  const handleYourRecipesClick = async () => {
    try {
      await fetchRecipesByUser(user.uid);
    } catch (error) {
      console.error("Failed to fetch user recipes:", error);
    }
  };

  return (
    <div className="card bg-base-100 shadow-2xl aspect-[3/4] text-primary ">
      <div className="card-body items-center justify-between">
        <div className="avatar">
          <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user.photoURL} alt={user.displayName} />
          </div>
        </div>
        <h2 className="text-3xl mb-2 text-center">{user.displayName}</h2>
        <div className="flex justify-between flex-row space-x-4">
          <Link to={`/update-profile/${user.uid}`}>
            <button className="btn btn-primary btn-xs">Edit Profile</button>
          </Link>
          <Link>
            <button
              onClick={handleYourRecipesClick}
              className="btn btn-primary btn-xs"
            >
              Your Recipes
            </button>
          </Link>
        </div>
        <Link to="/create-recipe">
          <div className="flex flex-col items-center mt-2 space-y-2">
            <div className="w-24 h-24 rounded-full border-dashed border-primary p-2 flex items-center justify-center border-2">
              <BiPlus size={"4em"} className="text-primary" />
            </div>
            <h2 className="text-2xl mb-2">Create a Recipe</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default UserCard;
