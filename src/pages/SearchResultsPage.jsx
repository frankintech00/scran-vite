import { useContext } from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import { RecipeCard } from "../components";

/**
 * Renders the Search Results page.
 *
 * @returns {JSX.Element} The Search Results page component.
 */
function SearchResultsPage() {
  const { searchResults } = useContext(RecipeContext);

  return (
    <>
      <h3 className="text-3xl mx-auto my-6 text-center text-primary">
        Search Results.
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {searchResults.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
}

export default SearchResultsPage;
