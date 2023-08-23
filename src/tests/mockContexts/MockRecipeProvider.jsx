import { RecipeContext } from "../../contexts/RecipeContext";

const MockRecipeProvider = ({ children, value }) => {
  const setRecipes = vitest.fn();
  const setSearchResults = vitest.fn();
  const setLastDoc = vitest.fn();
  const setErrorMessage = vitest.fn();
  const setLoading = vitest.fn();
  const setHasMore = vitest.fn();
  const setRecipe = vitest.fn();
  const setRecipeFetchType = vitest.fn();
  const setSelectedCategory = vitest.fn();
  const fetchRecipes = vitest.fn();
  const fetchNextRecipes = vitest.fn();
  const createRecipe = vitest.fn();
  const getRecipe = vitest.fn();
  const updateRecipe = vitest.fn();
  const deleteRecipe = vitest.fn();
  const addComment = vitest.fn();
  const getComment = vitest.fn();
  const deleteComment = vitest.fn();
  const imageUpload = vitest.fn();
  const recipe = {
    title: "Test Recipe",
    description: "Test Description",
    ingredients: "Test Ingredients",
    directions: "Test Directions",
    category: ["Breakfast"],
    image: "Test Image",
  };

  return (
    <RecipeContext.Provider
      value={{
        setRecipeFetchType,
        setSelectedCategory,
        setSearchResults,
        setRecipes,
        setLastDoc,
        setErrorMessage,
        setLoading,
        setHasMore,
        setRecipe,
        fetchRecipes,
        fetchNextRecipes,
        createRecipe,
        getRecipe,
        updateRecipe,
        deleteRecipe,
        addComment,
        getComment,
        deleteComment,
        imageUpload,
        recipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default MockRecipeProvider;
