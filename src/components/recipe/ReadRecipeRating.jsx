import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";

function ReadRecipeRating({ getRecipe, id }) {
  const [averageRating, setAverageRating] = useState(null);
  const [ratingCount, setRatingCount] = useState(0);

  useEffect(() => {
    getRecipe(id).then((recipeData) => {
      if (recipeData && recipeData.ratings && recipeData.ratings.length > 0) {
        const totalRating = recipeData.ratings.reduce(
          (acc, curr) => acc + curr,
          0
        );
        const avgRating = totalRating / recipeData.ratings.length;
        setAverageRating(avgRating.toFixed(2));
        setRatingCount(recipeData.ratings.length);
      }
    });
  }, [id, getRecipe]);

  if (!averageRating) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1 my-4 lg:my-2">
      <div className="flex justify-end">
        <Rating
          style={{ maxWidth: 120 }}
          value={Number(averageRating)}
          readOnly
        />
      </div>
      <p className="text-lg">
        {averageRating} from {ratingCount} review
        {ratingCount > 1 ? "s" : ""}
      </p>
    </div>
  );
}

export default ReadRecipeRating;
