import { useContext, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserContext } from "../../contexts/UserContext";

const FavouriteRecipes = ({ recipeId }) => {
  const { user, addToFavourites, removeFromFavourites } =
    useContext(UserContext);

  // Initialize local state for isFavourited
  const [isFavourited, setIsFavourited] = useState(
    user?.favourites?.includes(recipeId)
  );

  const handleFavouriteClick = async () => {
    // Log the current user.favourites array
    console.log("Current favourites:", user.favourites);

    if (isFavourited) {
      await removeFromFavourites(recipeId);
      setIsFavourited(false);
      console.log("removed from favourites");
    } else {
      await addToFavourites(recipeId);
      setIsFavourited(true);
      console.log("added to favourites");
    }
  };

  return (
    <div onClick={handleFavouriteClick}>
      {isFavourited ? (
        <FaHeart className="text-red-500" />
      ) : (
        <FaRegHeart className="text-red-500" />
      )}
    </div>
  );
};

export default FavouriteRecipes;
