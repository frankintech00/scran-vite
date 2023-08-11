import { Rating } from "@smastrom/react-rating";

function ReadRecipeReviews({ recipe, user, handleDeleteComment }) {
  return (
    <div>
      <div className="comments font-bold text-secondary text-xl mb-3 underline">
        Reviews
      </div>

      {recipe && recipe.comments && recipe.comments.length > 0 ? (
        recipe.comments.map(
          (comment, index) =>
            (comment.text || comment.rating) && (
              <div
                className="border border-primary rounded p-3 space-y-3 w-full md:w-3/5"
                key={index}
              >
                {comment.rating && (
                  <Rating
                    style={{ maxWidth: 80 }}
                    value={comment.rating}
                    readOnly
                  />
                )}
                {comment.text && <p className="">{comment.text}</p>}
                {comment.user && (
                  <p className="font-semibold text-gray-500">
                    By: {comment.user}
                  </p>
                )}
                <p className="text-xs">
                  {comment.time
                    .toDate()
                    .toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })
                    .replace(/,/g, "")}
                </p>
                {user && user.uid === comment.uid && (
                  <button
                    className="btn btn-xs btn-warning mt-3"
                    onClick={() => handleDeleteComment(comment)}
                  >
                    Delete Review
                  </button>
                )}
              </div>
            )
        )
      ) : (
        <p>No Reviews</p>
      )}
    </div>
  );
}

export default ReadRecipeReviews;
