import { useContext, useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserContext } from "../../contexts/UserContext";

const FavouriteRecipes = ({ recipeId }) => {
  const { user, addUserFavourites, removeUserFavourites, isRecipeFavourited } =
    useContext(UserContext);

  const [isFavourited, setIsFavourited] = useState(false);

  useEffect(() => {
    // Check if the recipe is already favourited
    const checkFavouriteStatus = async () => {
      const favourited = await isRecipeFavourited(user.uid, recipeId);
      setIsFavourited(favourited);
    };

    if (user && user.uid) {
      checkFavouriteStatus();
    }
  }, [user, recipeId, isRecipeFavourited]);

  const handleFavouriteClick = async () => {
    // Toggle the favourited state and update in the database
    if (isFavourited) {
      await removeUserFavourites(user.uid, recipeId);
      setIsFavourited(false);
      console.log("removed from favourites");
    } else {
      await addUserFavourites(user.uid, recipeId);
      setIsFavourited(true);
      console.log("added to favourites");
    }
  };

  return (
    // <div className="md:w-1/2 flex justify-end">
    //   <p className="text-lg"> Save this Recipe</p>
    <div onClick={handleFavouriteClick}>
      {isFavourited ? (
        <FaHeart className="text-red-500 w-6 h-6 mx-2" />
      ) : (
        <FaRegHeart className="text-red-500 w-6 h-6 mx-2" />
      )}
    </div>
    // </div>
  );
};

export default FavouriteRecipes;
