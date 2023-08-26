import { Rating } from "@smastrom/react-rating";

/**
 * ReadRecipeRating Component.
 *
 * This component displays the average rating of a given recipe.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.recipe - The recipe object.
 * @param {number} props.recipe.ratingCount - The number of ratings received for the recipe.
 * @param {number} props.recipe.averageRating - The average rating for the recipe.
 *
 * @returns {JSX.Element|null} - The ReadRecipeRating component or null if no recipe is provided.
 */
function ReadRecipeRating({ recipe }) {
  // Return null if the recipe object is not provided.
  if (!recipe) {
    return null;
  }

  // Return a not yet rated message if there are no ratings.
  if (!recipe.ratingCount || recipe.ratingCount === 0) {
    return <p className="text-lg my-3 md:w-1/2">Not yet rated</p>;
  }

  return (
    <div>
      <div className="flex">
        {/* Display rating stars based on the average rating.
         * readOnly prop ensures user can't change the rating here.
         */}
        <Rating
          style={{ maxWidth: 120 }}
          value={Number(recipe.averageRating)}
          readOnly
        />
      </div>
      {/* Display the average rating and the number of reviews */}
      <p className="text-lg">
        {recipe.averageRating} from {recipe.ratingCount} review
        {recipe.ratingCount > 1 ? "s" : ""}
      </p>
    </div>
  );
}

export default ReadRecipeRating;
