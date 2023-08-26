import { useContext, useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserContext } from "../../contexts/UserContext";

/**
 * A component that allows users to add or remove a recipe from their favourites.
 * @param {string} recipeId - The ID of the recipe to be favourited.
 */
const FavouriteRecipes = ({ recipeId }) => {
  const { user, addUserFavourites, removeUserFavourites, isRecipeFavourited } =
    useContext(UserContext);

  const [isFavourited, setIsFavourited] = useState(false);

  /**
   * Checks if the recipe is already favourited and sets the state accordingly.
   */
  useEffect(() => {
    const checkFavouriteStatus = async () => {
      const favourited = await isRecipeFavourited(user.uid, recipeId);
      setIsFavourited(favourited);
    };

    if (user && user.uid) {
      checkFavouriteStatus();
    }
  }, [user, recipeId, isRecipeFavourited]);

  /**
   * Toggles the favourited state and updates the database.
   */
  const handleFavouriteClick = async () => {
    if (isFavourited) {
      await removeUserFavourites(user.uid, recipeId);
      setIsFavourited(false);
    } else {
      await addUserFavourites(user.uid, recipeId);
      setIsFavourited(true);
    }
  };

  return (
    <div onClick={handleFavouriteClick}>
      {isFavourited ? (
        <button data-testid="favouriteIcon">
          <FaHeart className="text-red-500 w-6 h-6 mx-2" />
        </button>
      ) : (
        <button data-testid="unfavouriteIcon">
          <FaRegHeart className="text-red-500 w-6 h-6 mx-2" />
        </button>
      )}
    </div>
  );
};

export default FavouriteRecipes;
