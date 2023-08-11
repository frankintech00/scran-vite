import { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import { UserContext } from "../contexts/UserContext";
import {
  ReadRecipeCategories,
  ReadRecipeTitle,
  ReadRecipeDescription,
  RecipeCreatorInfo,
  ReadRecipeRating,
  SocialShareButtons,
  ReadRecipeImage,
  ReadRecipeInfo,
  ReadRecipeIngredients,
  ReadRecipeDirections,
  ReadRecipeNotes,
  ReadRecipeButtons,
  ReadRecipeReviews,
  ReadRecipeComments,
  Loading,
} from "../components";
import { useParams, useLocation } from "react-router-dom";

function ReadRecipePage() {
  const { getRecipe, addComment, deleteComment, deleteRecipe } =
    useContext(RecipeContext);
  const { user } = useContext(UserContext);

  const { id } = useParams();
  const location = useLocation();

  const [recipe, setRecipe] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    getRecipe(id).then((recipeData) => {
      setRecipe(recipeData);
    });
  }, [id, getRecipe]);

  if (!recipe) {
    return <div>Yer Maw</div>;
  }

  const handleDeleteComment = async (comment) => {
    await deleteComment(id, comment);
    const updatedRecipe = await getRecipe(id);
    setRecipe(updatedRecipe);
  };

  return (
    <article className="flex flex-col space-y-6 mx-auto bg-primary bg-opacity-5 rounded-lg p-6 text-primary max-w-screen-lg shadow-xl">
      <ReadRecipeCategories categories={recipe ? recipe.category : []} />

      <div className="flex flex-wrap flex-col space-y-4 ">
        <ReadRecipeTitle name={recipe ? recipe.recipeName : ""} />
        <ReadRecipeDescription description={recipe ? recipe.description : ""} />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <RecipeCreatorInfo
            photoURL={recipe ? recipe.creatorPhotoURL : ""}
            displayName={recipe ? recipe.creatorDisplayName : ""}
            createdAt={recipe ? recipe.createdAt : new Date()}
          />

          <ReadRecipeRating
            ratings={recipe ? recipe.ratings : []}
            getRecipe={getRecipe}
            id={id}
          />

          <SocialShareButtons
            recipeName={recipe.recipeName}
            location={location}
          />
        </div>
      </div>

      <div className="mb-6">
        <ReadRecipeImage
          imageUrl={recipe.recipeImageURL}
          recipeName={recipe.recipeName}
        />
      </div>
      <div className="max-w-3xl mb-10">
        <ReadRecipeInfo
          preparationTime={recipe.preparationTime}
          cookingTime={recipe.cookingTime}
          servings={recipe.servings}
          difficulty={recipe.difficulty}
        />
      </div>
      <ReadRecipeIngredients ingredients={recipe.ingredients} />

      <ReadRecipeDirections directions={recipe.directions} />

      <ReadRecipeNotes notes={recipe.notes} />

      <ReadRecipeButtons
        user={user}
        recipe={recipe}
        deleteRecipe={deleteRecipe}
      />

      <ReadRecipeReviews
        recipe={recipe}
        user={user}
        handleDeleteComment={handleDeleteComment}
      />

      <ReadRecipeComments
        user={user}
        rating={rating}
        setRating={setRating}
        newComment={newComment}
        setNewComment={setNewComment}
        addComment={addComment}
        deleteComment={deleteComment}
        id={id}
        getRecipe={getRecipe}
        setRecipe={setRecipe}
      />

      <div className="justify-between">
        <div className="flex align-middle space-x-2">
          <h3 className="text-xl text-primary">Share this recipe - </h3>
          <SocialShareButtons
            recipeName={recipe.recipeName}
            location={location}
          />
        </div>
      </div>
    </article>
  );
}

export default ReadRecipePage;
