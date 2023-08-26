import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { RecipeContext } from "../../contexts/RecipeContext";
import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/**
 * Renders a card displaying user information and options.
 *
 * @returns {JSX.Element} The UserCard component.
 */
function UserCard() {
  // Using context to get user and recipe settings
  const { user } = useContext(UserContext);
  const { setRecipeFetchType } = useContext(RecipeContext);

  // Using the navigate function from react-router-dom
  const navigate = useNavigate();

  /**
   * Handles the click event on "Your Recipes" button.
   *
   * @returns {void}
   */
  function handleYourRecipesClick() {
    setRecipeFetchType("USER");
    navigate("/");
  }

  /**
   * Handles the click event on "Your Favourites" button.
   *
   * @param {Event} event - The click event.
   * @returns {void}
   */
  function handleYourFavouritesClick(event) {
    event.preventDefault();
    setRecipeFetchType("FAVOURITES");
    navigate("/");
  }

  return (
    <div className="card bg-base-100 shadow-2xl aspect-[3/4] text-primary ">
      {/* Avatar */}
      <div className="card-body items-center justify-between">
        <div className="avatar">
          <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user.photoURL} alt={user.displayName} />
          </div>
        </div>

        {/* Display Name */}
        <h2 className="text-3xl mb-2 text-center">{user.displayName}</h2>

        {/* Recipe and Favourites Buttons */}
        <div className="flex justify-between flex-row space-x-4">
          <Link>
            <button
              onClick={handleYourRecipesClick}
              className="btn btn-primary btn-xs"
            >
              Your Recipes
            </button>
          </Link>
          <Link>
            <button
              onClick={handleYourFavouritesClick}
              className="btn btn-primary btn-xs"
            >
              Your Favourites
            </button>
          </Link>
        </div>

        {/* Create a Recipe Link */}
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
