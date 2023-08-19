import { Rating } from "@smastrom/react-rating";

function ReadRecipeRating({ recipe }) {
  if (!recipe) {
    return null;
  }

  if (!recipe.ratingCount || recipe.ratingCount === 0) {
    return <p className="text-lg my-3 md:w-1/2">Not yet rated</p>;
  }

  return (
    <div>
      <div className="flex">
        <Rating
          style={{ maxWidth: 120 }}
          value={Number(recipe.averageRating)}
          readOnly
        />
      </div>
      <p className="text-lg">
        {recipe.averageRating} from {recipe.ratingCount} review
        {recipe.ratingCount > 1 ? "s" : ""}
      </p>
    </div>
  );
}

export default ReadRecipeRating;
