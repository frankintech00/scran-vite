import { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import { UserContext } from "../contexts/UserContext";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { FaPrint } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

//TODO: seperate the recipe into smaller components
//TODO: handle average reviews
//TODO: add Links to category badges

function ReadRecipePage() {
  const location = useLocation();
  const { getRecipe, addComment, deleteComment, deleteRecipe } =
    useContext(RecipeContext);
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [ratingCount, setRatingCount] = useState(0);

  useEffect(() => {
    getRecipe(id).then((recipeData) => {
      setRecipe(recipeData);
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

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const title = `Check out this recipe ${recipe.recipeName} for on Scran!`;
  const fullUrl = `${window.location.protocol}//${window.location.host}${location.pathname}`;
  console.log(fullUrl);

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

  const handleDeleteComment = async (comment) => {
    await deleteComment(id, comment);
    const updatedRecipe = await getRecipe(id);
    setRecipe(updatedRecipe);
  };

  return (
    <article
      className="flex flex-col  space-y-6 mx-auto bg-primary bg-opacity-5 rounded-md p-6 text-primary
     max-w-screen-lg w-full"
    >
      <nav className="categories mb-5 flex flex-col ">
        {recipe && recipe.category.length > 0 && (
          <>
            <h3 className="font-semibold uppercase mb-3">Categories:</h3>
            <ul className="flex flex-wrap gap-4">
              {recipe.category.map((category, index) => (
                <li
                  key={index}
                  className="rounded-md px-2 py-1 bg-primary text-primary bg-opacity-30"
                >
                  {category}
                </li>
              ))}
            </ul>
          </>
        )}
      </nav>

      <div className="recipeDetails flex flex-wrap space-y-4 ">
        <div>
          <h3 className="text-5xl font-semibold text-secondary ">
            {recipe.recipeName}
          </h3>
        </div>
        <div className="flex">
          <h2 className="text-2xl font-medium flex-wrap text-gray-600">
            {recipe.description}
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <div className="flex items-center">
            {recipe.creatorPhotoURL ? (
              <img
                src={recipe.creatorPhotoURL}
                alt="User profile"
                className="mr-4 rounded-full w-16 h-16"
              />
            ) : (
              <div className="mr-4 rounded-full w-16 h-16">
                <BiUser size={62} className="text-accent" />
              </div>
            )}

            <div className="flex flex-col">
              <div className="text-lg">
                By{" "}
                <span className="underline font-semibold font-serif text-secondary">
                  {recipe.creatorDisplayName || "Anonymous"}
                </span>
              </div>
              <div>
                Published:{" "}
                {recipe.createdAt
                  .toDate()
                  .toLocaleString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })
                  .replace(/,/g, "")}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex flex-col gap-1 mb-2 mt-4">
              {averageRating && (
                <>
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
                </>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <FacebookShareButton
              url={fullUrl}
              quote={title}
              className="button-class"
            >
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>

            <TwitterShareButton
              url={fullUrl}
              title={title}
              className="button-class"
            >
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>

            <WhatsappShareButton
              url={fullUrl}
              title={title}
              separator=" "
              className="button-class"
            >
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>

            <EmailShareButton
              url={fullUrl}
              subject={title}
              body="Check out this Scran recipe!"
              className="button-class"
            >
              <EmailIcon size={32} round={true} />
            </EmailShareButton>
            <button onClick={() => window.print()} className="button-class">
              <FaPrint size={32} />
            </button>
          </div>
        </div>
      </div>

      <div className="recipe">
        <div className="recipeImage mb-6">
          <img
            src={recipe.recipeImageURL}
            alt={recipe.recipeName}
            className="mb-4 w-full"
          />
        </div>
        <div className="max-w-2xl mb-10">
          <div className="recipeInfo w-full">
            <div className="grid grid-cols-3 gap-1 mb-2">
              <div className="font-bold  text-xl text-secondary">
                Prep Time:
              </div>
              <div className="font-bold  text-xl text-secondary">
                Cook Time:
              </div>
              <div className="font-bold  text-xl text-secondary">
                Total Time:
              </div>

              <div className="font-semibold text-xl">
                {recipe.preparationTime} Mins.
              </div>
              <div className="font-semibold text-xl">
                {recipe.cookingTime} Mins.
              </div>
              <div className="font-semibold text-xl">
                {recipe.preparationTime + recipe.cookingTime > 60
                  ? `${Math.floor(
                      (recipe.preparationTime + recipe.cookingTime) / 60
                    )} Hr ${
                      (recipe.preparationTime + recipe.cookingTime) % 60
                    } Mins`
                  : `${recipe.preparationTime + recipe.cookingTime} Mins`}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1 mb-2 mt-4">
              <div className="font-bold text-secondary text-xl">Servings:</div>
              <div className="font-bold text-secondary text-xl">
                Difficulty:
              </div>
              <div></div>

              <div className="font-semibold text-xl">{recipe.servings}</div>
              <div className="font-semibold text-xl">{recipe.difficulty}</div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="font-bold text-secondary text-xl mb-3">
            Ingredients:
          </div>
          <ul className="list-disc list-inside space-y-3">
            {recipe &&
              recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="font-semibold text-xl">
                  {ingredient}
                </li>
              ))}
          </ul>
        </div>
        <div className="mb-12">
          <div className="font-bold text-secondary text-xl mb-3">
            Directions:
          </div>
          <ul className="list-inside space-y-3">
            {recipe &&
              recipe.directions.map((direction, index) => (
                <li key={index} className="font-semibold text-xl">
                  <span className="text-secondary">
                    {"Step " +
                      (index + 1) +
                      " of " +
                      recipe.directions.length +
                      ": "}
                  </span>
                  <span>{direction}</span>
                </li>
              ))}
          </ul>
        </div>

        <div className="mb-12">
          <div className="font-bold text-secondary text-xl mb-3">Notes:</div>
          <p className="font-semibold text-xl">{recipe.notes}</p>
        </div>

        {user && user.uid === recipe.userId && (
          <div className="flex flex-row space-x-6 justify-around sm:justify-start">
            <button
              className="flex items-center justify-center shadow-md btn btn-primary w-40"
              onClick={() => navigate(`/update-recipe/${id}`)}
            >
              Update Recipe
            </button>
            <button
              className="flex items-center justify-center shadow-md btn btn-warning w-40"
              onClick={() => {
                deleteRecipe(id);
                navigate("/");
              }}
            >
              Delete Recipe
            </button>
          </div>
        )}
      </div>
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

      {user ? (
        <form onSubmit={handleAddComment} className="">
          <div className="border border-primary rounded-md p-3 w-full md:w-3/5">
            <div className="flex gap-2 mb-2">
              <p className=" inline-block">Rate this Recipe:</p>
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
          <Link to="/sign-in">Sign In</Link> or{" "}
          <Link to="/sign-up">Sign Up</Link>.
        </p>
      )}

      <div className="flex gap-4 justify-between">
        <div className="flex align-middle space-x-2">
          <h3 className="text-xl text-primary">Share this recipe - </h3>
          <FacebookShareButton
            url={fullUrl}
            quote={title}
            className="button-class"
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>

          <TwitterShareButton
            url={fullUrl}
            title={title}
            className="button-class"
          >
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>

          <WhatsappShareButton
            url={fullUrl}
            title={title}
            separator=" "
            className="button-class"
          >
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>

          <EmailShareButton
            url={fullUrl}
            subject={title}
            body="Check out this Scran recipe!"
            className="button-class"
          >
            <EmailIcon size={32} round={true} />
          </EmailShareButton>
        </div>
        <div className="flex align-middle space-x-2">
          <h3 className="text-xl text-primary">Print the recipe.</h3>
          <button onClick={() => window.print()} className="button-class">
            <FaPrint size={32} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default ReadRecipePage;
