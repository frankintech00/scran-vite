import React, { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";

function ReadRecipeComments({
  user,
  isLoggedIn,
  rating,
  setRating,
  newComment,
  setNewComment,
  addComment,
  deleteComment,
  id,
  getComment,
}) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      const fetchedComments = await getComment(id);
      setComments(fetchedComments);
    }
    fetchComments();
  }, [id, getComment]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() !== "" || rating) {
      await addComment(id, newComment, user, rating);
      setNewComment("");
      setRating(0);
      const updatedRecipe = await getRecipe(id);
      setRecipe(updatedRecipe);
      const updatedComments = await getComment(id);
      setComments(updatedComments);
    }
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(id, commentId);
    const updatedComments = await getComment(id);
    setComments(updatedComments);
  };

  return (
    <div>
      <div className="comments font-bold text-secondary text-xl mb-3 underline">
        Reviews
      </div>
      <div>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.commentId}
              className="border border-primary rounded p-3 space-y-3 w-full mb-3 md:w-3/5"
            >
              {comment.rating && (
                <Rating
                  style={{ maxWidth: 80 }}
                  value={comment.rating}
                  readOnly
                />
              )}
              {comment.text && <p>{comment.text}</p>}
              {comment.user && (
                <p className="font-semibold text-gray-500">
                  By: {comment.user}
                </p>
              )}
              <p className="text-xs">
                {new Date(comment.time.seconds * 1000)
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
                  onClick={() => handleDeleteComment(comment.commentId)}
                >
                  Delete Review
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="border border-primary rounded p-3 space-y-3 w-full md:w-3/5">
            <p>No Reviews</p>
          </div>
        )}
      </div>

      {isLoggedIn ? (
        <div>
          <div className="text-secondary text-lg mb-3 underline">
            Review this recipe
          </div>
          <form onSubmit={handleAddComment} className="">
            <div className="border border-primary rounded-md p-3 w-full md:w-3/5">
              <div className="flex gap-2 mb-2">
                <p>Rate this Recipe:</p>
                <Rating
                  style={{ maxWidth: 80 }}
                  value={rating}
                  onChange={(newRating) => setRating(newRating)}
                />
              </div>
              <textarea
                className="textarea textarea-ghost w-full p-3"
                type="textarea"
                placeholder="Add your review here..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center shadow-md btn btn-primary btn-sm my-3 w-40"
            >
              Add Review
            </button>
          </form>
        </div>
      ) : (
        <p className="text-lg text-secondary mt-3">
          To add a rating or a review, you need to{" "}
          <Link className="link" to="/sign-in">
            Sign In
          </Link>{" "}
          or{" "}
          <Link className="link" to="/sign-up">
            Sign Up
          </Link>
          .
        </p>
      )}
    </div>
  );
}

export default ReadRecipeComments;
