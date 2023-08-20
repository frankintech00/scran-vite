import { useContext, useEffect } from "react";
import { RecipeContext } from "../../contexts/RecipeContext";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, useHits } from "react-instantsearch";
import { useNavigate } from "react-router-dom";

const searchClient = algoliasearch(
  "5JL4NAA3E7",
  "aec35c3c0d6a43fca6699b1e949f7db3"
);

function HitsComponent() {
  const { setSearchResults } = useContext(RecipeContext);
  const { hits } = useHits();

  useEffect(() => {
    setSearchResults(hits);
  }, [hits, setSearchResults]);

  return null;
}

function SearchInput() {
  const navigate = useNavigate();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate("/search-results");
  };

  return (
    <InstantSearch searchClient={searchClient} indexName="scran-vite">
      <SearchBox
        searchAsYouType={true}
        routing={true}
        submitIconComponent={() => (
          <div className="btn btn-primary rounded-l-none btn-sm">Search</div>
        )}
        classNames={{
          root: "w-full",
          input: "input input-primary rounded-r-none input-sm",
          reset: "hidden",
        }}
        placeholder="Search for a recipe..."
        onSubmit={handleSearchSubmit} // Handle form submission
      />
      <HitsComponent />
    </InstantSearch>
  );
}

export default SearchInput;
