import { Rating } from "@smastrom/react-rating";

function ReadRecipeRating({ recipe }) {
  if (!recipe) {
    return null;
  }

  if (!recipe.ratingCount || recipe.ratingCount === 0) {
    return <p className="text-lg my-3">Not yet rated</p>;
  }

  return (
    <div className="flex flex-col gap-1 my-4 lg:my-2">
      <div className="flex justify-end">
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
