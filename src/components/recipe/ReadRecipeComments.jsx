import React from "react";
import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";

function ReadRecipeComments({
  user,
  rating,
  setRating,
  newComment,
  setNewComment,
  addComment,
  id,
  getRecipe,
  setRecipe,
}) {
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() !== "" || rating) {
      await addComment(id, newComment, user, rating);
      setNewComment("");
      setRating(0);
      const updatedRecipe = await getRecipe(id);
      setRecipe(updatedRecipe);
    }
  };

  return user ? (
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
  ) : (
    <p className="text-lg text-primary">
      To add a rating or a review, you need to{" "}
      <Link to="/sign-in">Sign In</Link> or <Link to="/sign-up">Sign Up</Link>.
    </p>
  );
}

export default ReadRecipeComments;
