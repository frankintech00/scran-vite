import { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import { UserContext } from "../contexts/UserContext";
import {
  ReadRecipeCategories,
  ReadRecipeTitle,
  ReadRecipeDescription,
  ReadRecipeCreatorInfo,
  ReadRecipeRating,
  SocialShareButtons,
  ReadRecipeImage,
  ReadRecipeInfo,
  ReadRecipeIngredients,
  ReadRecipeDirections,
  ReadRecipeNotes,
  ReadRecipeButtons,
  ReadRecipeComments,
  ReadRecipeError,
  FavouriteRecipes,
} from "../components";
import { useParams, useLocation } from "react-router-dom";

function ReadRecipePage() {
  const { getRecipe, deleteRecipe, addComment, getComment, deleteComment } =
    useContext(RecipeContext);
  const { user, isLoggedIn } = useContext(UserContext);

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
    return <ReadRecipeError />;
  }

  const handleDeleteComment = async (comment) => {
    await deleteComment(id, comment);
    const updatedRecipe = await getRecipe(id);
    setRecipe(updatedRecipe);
  };

  return (
    <article className="flex flex-col space-y-6 mx-auto rounded-lg p-6 text-primary max-w-screen-lg shadow-2xl">
      <ReadRecipeCategories categories={recipe ? recipe.category : []} />

      <div className="flex flex-wrap flex-col space-y-4 ">
        <ReadRecipeTitle name={recipe ? recipe.recipeName : ""} />
        <ReadRecipeDescription description={recipe ? recipe.description : ""} />
        <div className="flex flex-col md:flex-row flex-wrap justify-between items-center space-y-4">
          <ReadRecipeCreatorInfo
            photoURL={recipe ? recipe.creatorPhotoURL : ""}
            displayName={recipe ? recipe.creatorDisplayName : ""}
            createdAt={recipe ? recipe.createdAt : new Date()}
          />
          <div className="md:w-1/2 flex justify-end">
            <p className="text-lg"> Save this Recipe</p>
            <FavouriteRecipes recipeId={id} />
          </div>
          <ReadRecipeRating recipe={recipe} />
          <div className="flex flex-col gap-1 my-4 w-1/2 items-end">
            <SocialShareButtons
              recipeName={recipe.recipeName}
              location={location}
            />
          </div>
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

      <ReadRecipeComments
        user={user}
        isLoggedIn={isLoggedIn}
        rating={rating}
        setRating={setRating}
        newComment={newComment}
        setNewComment={setNewComment}
        getComment={getComment}
        addComment={addComment}
        deleteComment={deleteComment}
        id={id}
      />

      <div className="flex">
        <h3 className="text-xl text-primary mr-2">Share this recipe - </h3>
        <SocialShareButtons
          recipeName={recipe.recipeName}
          location={location}
        />
      </div>
    </article>
  );
}

export default ReadRecipePage;
