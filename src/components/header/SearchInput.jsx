import { useContext, useEffect } from "react";
import { RecipeContext } from "../../contexts/RecipeContext";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, useHits } from "react-instantsearch";

const searchClient = algoliasearch(
  "5JL4NAA3E7",
  "aec35c3c0d6a43fca6699b1e949f7db3"
);

function HitsComponent() {
  const { setRecipes } = useContext(RecipeContext);
  const { hits } = useHits();

  useEffect(() => {
    setRecipes(hits);
  }, [hits, setRecipes]);

  return null;
}

function SearchInput() {
  return (
    <InstantSearch searchClient={searchClient} indexName="scran-vite">
      <SearchBox
        searchAsYouType={true}
        submitIconComponent={() => (
          <div className="btn btn-primary rounded-l-none">Search</div>
        )}
        classNames={{
          root: "w-full",
          input: "input input-primary rounded-r-none",
          reset: "hidden",
        }}
        placeholder="Search for a recipe..."
      />
      <HitsComponent />
    </InstantSearch>
  );
}

export default SearchInput;
