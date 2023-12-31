import { useContext, useEffect } from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import { UserContext } from "../contexts/UserContext";
import {
  RecipeCard,
  UserCard,
  NoUserCard,
  CategoryBadges,
} from "../components";

/**
 * Renders the Home Page component.
 *
 * @returns {JSX.Element} The Home Page component.
 */
function HomePage() {
  const { recipes, fetchNextRecipes, hasMore, fetchRecipes } =
    useContext(RecipeContext);
  const { isLoggedIn, user } = useContext(UserContext);

  useEffect(() => {
    fetchRecipes(7);
  }, []);

  return (
    <>
      <CategoryBadges />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoggedIn ? <UserCard user={user} /> : <NoUserCard />}
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <div className="text-right">
        {hasMore && (
          <button
            className="btn btn-primary btn-sm my-4"
            onClick={() => fetchNextRecipes()}
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
}

export default HomePage;
