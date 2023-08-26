import React from "react";
import { Rating } from "@smastrom/react-rating";

/**
 * ReadRecipeReviews Component.
 *
 * This component displays the list of reviews for a particular recipe.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.recipe - The recipe object containing comments and other details.
 * @param {Object} props.user - The user object containing identification details.
 * @param {Function} props.handleDeleteComment - The function to delete a particular comment.
 *
 * @returns {JSX.Element} The ReadRecipeReviews component.
 */
function ReadRecipeReviews({ recipe, user, handleDeleteComment }) {
  return (
    <div>
      {/* Title for the review section */}
      <div className="comments font-bold text-secondary text-xl mb-3 underline">
        Reviews
      </div>

      {/* Check if comments are available */}
      {recipe && recipe.comments && recipe.comments.length > 0 ? (
        recipe.comments.map(
          (comment, index) =>
            (comment.text || comment.rating) && (
              <div
                className="border border-primary rounded p-3 space-y-3 w-full md:w-3/5"
                key={index}
              >
                {/* Display the rating if available */}
                {comment.rating && (
                  <Rating
                    style={{ maxWidth: 80 }}
                    value={comment.rating}
                    readOnly
                  />
                )}
                {/* Display the comment text if available */}
                {comment.text && <p className="">{comment.text}</p>}
                {/* Display the username */}
                {comment.user && (
                  <p className="font-semibold text-gray-500">
                    By: {comment.user}
                  </p>
                )}
                {/* Display the date if it's a valid Date object */}
                {comment.time instanceof Date && (
                  <p className="text-xs">{comment.time.toDateString()}</p>
                )}
                {/* Show delete button if user is the one who commented */}
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
