/**
 * @file This file provides recipe context for the application and includes functions for recipe management.
 */

// Importing necessary hooks from React
import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";

// Importing Firestore functions from Firebase
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

// Importing Storage functions from Firebase
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// Importing Firebase configuration
import { db, storage } from "../services/firebase";

// Importing UserContext
import { UserContext } from "./UserContext";

// Importing error handling function
import getErrorMessage from "../helpers/errorHandling";

// Creating RecipeContext
export const RecipeContext = createContext();

// Creating RecipeProvider component
export const RecipeProvider = ({ children }) => {
  // Getting user from UserContext
  const { user, fetchUserFavourites } = useContext(UserContext);

  // Setting up state for recipes, lastDoc, errorMessage, loading, and hasMore
  const [recipes, setRecipes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [recipe, setRecipe] = useState({
    recipeName: "",
    category: [],
    difficulty: "",
    preparationTime: "",
    cookingTime: "",
    servings: "",
    description: "",
    ingredients: [],
    directions: [],
    notes: "",
  });
  const [recipeFetchType, setRecipeFetchType] = useState("DEFAULT");
  const [selectedCategory, setSelectedCategory] = useState("");

  /**
   * useEffect hook to handle fetching recipes based on the recipeFetchType.
   * Executes the fetchRecipes function based on the selected recipeFetchType.
   *
   * @function
   * @returns {void}
   */
  useEffect(() => {
    // Log the recipeFetchType when useEffect is triggered
    "useEffect triggered with recipeFetchType:", recipeFetchType;

    // Switch statement to handle different recipeFetchTypes
    switch (recipeFetchType) {
      case "USER":
        // Log the user ID and fetch recipes for the user
        "Fetching recipes for the user:", user.uid;
        fetchRecipes({ type: "USER", uid: user.uid });
        break;
      case "FAVOURITES":
        // Log the user ID and fetch favorite recipes
        "Fetching recipes for the favorites:", user.uid;
        fetchRecipes({ type: "FAVOURITES", uid: user.uid });
        break;
      case "ALL":
        // Fetch all recipes with a maximum of 7 recipes
        "Fetching all recipes";
        fetchRecipes({ type: "ALL", maxRecipes: 7 });
        break;
      case "CATEGORY":
        // Log the selected category and fetch category recipes
        "Fetching category recipes for:", selectedCategory;
        fetchRecipes({ type: "CATEGORY", category: selectedCategory });
        break;
      case "DEFAULT":
        break;
    }
  }, [recipeFetchType]);

  /**
   * Asynchronously fetches a limited number of recipes from the 'recipes' collection, ordered by creation date.
   *
   * @async
   * @param {number} maxRecipes - The maximum number of recipes to fetch. Defaults to 8.
   * @throws Will throw an error if the `getDocs` promise is rejected.
   */
  async function fetchRecipes({
    type = "ALL",
    uid = null,
    category = null,
    maxRecipes = 7,
  }) {
    setLoading(true);
    let q;
    let favRecipeIds = [];

    try {
      switch (type) {
        case "USER":
          q = query(
            collection(db, "recipes"),
            where("userId", "==", uid),
            orderBy("createdAt", "desc"),
            limit(maxRecipes)
          );
          break;

        case "FAVOURITES":
          favRecipeIds = await fetchUserFavourites(uid);
          if (!favRecipeIds.length) {
            setRecipes([]);
            setLoading(false);
            ("No favourite recipes found for the user.");
            return;
          }
          q = query(
            collection(db, "recipes"),
            orderBy("createdAt", "desc"),
            limit(50)
          );
          break;

        case "CATEGORY":
          q = query(
            collection(db, "recipes"),
            where("category", "array-contains", category),
            orderBy("createdAt", "desc"),
            limit(maxRecipes)
          );
          break;

        case "ALL":
        default:
          q = query(
            collection(db, "recipes"),
            orderBy("createdAt", "desc"),
            limit(maxRecipes)
          );
          break;
      }

      const querySnapshot = await getDocs(q);
      let recipesData = [];
      querySnapshot.forEach((doc) => {
        recipesData.push({ id: doc.id, ...doc.data() });
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastDoc(lastVisible);

      if (type === "FAVOURITES") {
        recipesData = recipesData.filter((recipe) =>
          favRecipeIds.includes(recipe.id)
        );
      }

      if (recipesData.length === 0) {
        throw new Error("No recipes match your search. Please try again.");
      }

      setRecipes(recipesData);
      ("Success: Recipes fetched successfully.");
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
      setRecipeFetchType("DEFAULT");
      setHasMore(true);
    }
  }

  /**
   * Asynchronously fetches the next set of recipes from the 'recipes' collection, starting after the last document fetched.
   *
   * @async
   * @throws Will throw an error if the `getDocs` promise is rejected.
   */
  const fetchNextRecipes = useCallback(async () => {
    ("fetchNextRecipes called");
    // Set loading state to true
    setLoading(true);

    try {
      // If there is no last document, return
      if (!lastDoc) {
        ("LastDoc is null or undefined"); // Debugging line
        return;
      }

      // Create a query to get the next 8 recipes from the 'recipes' collection, starting after the last document
      const q = query(collection(db, "recipes"), startAfter(lastDoc), limit(8));

      // Get the query snapshot
      const querySnapshot = await getDocs(q);

      // If the snapshot is empty, set 'hasMore' to false and return
      if (!querySnapshot.size) {
        setHasMore(false);
        return;
      }

      let newRecipes = [];

      // For each document in the snapshot, add the document data to the 'newRecipes' array
      querySnapshot.forEach((doc) => {
        newRecipes.push({ id: doc.id, ...doc.data() });
      });

      // Get the last visible document in the snapshot
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      // Set the last visible document
      setLastDoc(lastVisible);

      // Add the new recipes to the existing recipes
      setRecipes((oldRecipes) => [...oldRecipes, ...newRecipes]);

      // Log the successful fetch
      ("Success: Next set of recipes fetched successfully.");
    } catch (error) {
      // Log the error message
      console.error("Error fetching the next set of recipes:", error);
    } finally {
      // Set loading state to false
      setLoading(false);
      setRecipeFetchType("DEFAULT");
    }
  }, [lastDoc]);

  /**
   * Asynchronously creates a new recipe.
   *
   * @async
   * @param {Object} recipe - The recipe object containing all the necessary details.
   * @throws Will throw an error if the `addDoc` promise is rejected.
   * @returns {string} The ID of the newly created recipe document.
   */
  async function createRecipe(recipe) {
    // Set loading state to true
    setLoading(true);

    // Log the creation process
    `Creating recipe at ${new Date().toISOString()}`, recipe;

    try {
      // If the user did not provide a recipeImageURL, use the default image URL
      const imageURL =
        recipe.recipeImageURL ||
        "https://firebasestorage.googleapis.com/v0/b/project-scran.appspot.com/o/images%2Frecipe-placeholder.jpg?alt=media&token=4c91eec6-460a-48c4-bfe0-4e17546c744e";

      // Add a new document to the 'recipes' collection with the recipe details
      const docRef = await addDoc(collection(db, "recipes"), {
        ...recipe,
        userId: user.uid,
        creatorDisplayName: user.displayName,
        creatorPhotoURL: user.photoURL,
        createdAt: serverTimestamp(),
        recipeImageURL: imageURL,
      });

      // Log the successful addition of the recipe
      "Recipe added successfully with ID: ", docRef.id;

      // Return the ID of the newly created recipe document
      return docRef.id;
    } catch (e) {
      // Log the error message
      console.error(getErrorMessage(e.code));
      // Re-throw the error so it can be caught and handled elsewhere
      throw e;
    } finally {
      // Set loading state to false
      setLoading(false);
    }
  }

  /**
   * Asynchronously retrieves a recipe by its ID.
   *
   * @async
   * @param {string} id - The ID of the recipe to retrieve.
   * @throws Will throw an error if the `getDoc` promise is rejected.
   * @returns {Object} The data of the recipe document if it exists, otherwise logs that the recipe doesn't exist.
   */
  const getRecipe = useCallback(async (id) => {
    // Set loading state to true
    setLoading(true);

    try {
      // Create a reference to the document in the 'recipes' collection with the given ID
      const docRef = doc(db, "recipes", id);

      // Get the document snapshot
      const docSnap = await getDoc(docRef);

      // If the document exists
      if (docSnap.exists()) {
        // Log the recipe data
        "Recipe data:", docSnap.data();

        // Return the recipe data, including the document ID
        return { id: docSnap.id, ...docSnap.data() }; // Include the document ID
      } else {
        // Log that the recipe doesn't exist
        ("The recipe doesn't exist!");
      }
    } catch (e) {
      // Log the error message
      console.error(getErrorMessage(e.code));
    } finally {
      // Set loading state to false
      setLoading(false);
    }
  }, []);

  /**
   * Asynchronously updates a recipe.
   *
   * @async
   * @param {string} id - The ID of the recipe to update.
   * @param {Object} updatedRecipe - The updated recipe object.
   * @param {Object} image - The new image to upload.
   * @throws Will throw an error if the `updateDoc` promise is rejected.
   */
  async function updateRecipe(id, updatedRecipe, image) {
    // Set loading state to true
    setLoading(true);

    try {
      if (image) {
        // If there is a new image, upload the image first
        const imageUrl = await imageUpload(image);

        // Update the 'recipeImageURL' in the recipe object
        updatedRecipe.recipeImageURL = imageUrl;
      }

      // Get a reference to the document to update
      const docRef = doc(db, "recipes", id);

      // Update the document
      await updateDoc(docRef, updatedRecipe);

      // Log the successful update
      ("Recipe updated successfully");
    } catch (e) {
      // Log the error message
      console.error(getErrorMessage(e.code));
    } finally {
      // Set loading state to false
      setLoading(false);
    }
  }

  /**
   * Asynchronously deletes a recipe from the 'recipes' collection.
   *
   * @async
   * @param {string} id - The ID of the recipe to delete.
   * @throws Will throw an error if the `deleteDoc` promise is rejected.
   */
  async function deleteRecipe(id) {
    // Set loading state to true
    setLoading(true);

    try {
      // Get a reference to the document to delete
      const docRef = doc(db, "recipes", id);

      // Delete the document
      await deleteDoc(docRef);

      // Log the successful deletion
      ("Recipe deleted successfully");
    } catch (e) {
      // Log the error message
      console.error(getErrorMessage(e.code));
    } finally {
      // Set loading state to false
      setLoading(false);
    }
  }

  /**
   * Asynchronously adds a comment and rating to a recipe in the 'recipes' collection.
   *
   * @async
   * @param {string} id - The ID of the recipe to add the comment and rating to.
   * @param {string} comment - The comment to add.
   * @param {Object} user - The user who is adding the comment.
   * @param {number} rating - The rating to add.
   * @throws Will throw an error if the `updateDoc` promise is rejected.
   */
  async function addComment(id, comment, user, rating) {
    // Set loading state to true
    setLoading(true);

    try {
      // Get a reference to the comments sub-collection for the specific recipe
      const commentsRef = collection(db, "recipes", id, "comments");

      // Get the current timestamp
      const timestamp = Timestamp.now();

      // Create the new comment object
      const newComment = {
        text: comment,
        user: user.displayName,
        uid: user.uid,
        time: timestamp,
        rating: rating,
      };

      // Add the new comment to the sub-collection
      await addDoc(commentsRef, newComment);

      // Log the successful addition
      ("Comment and rating added successfully");
    } catch (e) {
      // Log the error message
      console.error("Error adding comment:", e);
    } finally {
      // Set loading state to false
      setLoading(false);
    }
  }

  /**
   * Asynchronously retrieves comments for a recipe from the database.
   *
   * @async
   * @param {string} recipeId - The ID of the recipe to retrieve comments for.
   * @returns {Promise<Array>} A promise that resolves to an array of comments.
   * @throws Will throw an error if there is an error retrieving the comments from the database.
   */
  async function getComment(recipeId) {
    const commentsCollectionRef = collection(
      db,
      "recipes",
      recipeId,
      "comments"
    );
    const commentSnapshot = await getDocs(commentsCollectionRef);

    const comments = [];
    commentSnapshot.forEach((doc) => {
      comments.push({ commentId: doc.id, ...doc.data() });
    });

    return comments;
  }

  /**
   * Asynchronously deletes a comment from a recipe in the 'recipes' collection.
   *
   * @async
   * @param {string} id - The ID of the recipe to delete the comment from.
   * @param {Object} comment - The comment to delete.
   * @throws Will throw an error if the `updateDoc` promise is rejected.
   */
  async function deleteComment(recipeId, commentId) {
    const commentDocRef = doc(db, "recipes", recipeId, "comments", commentId);
    await deleteDoc(commentDocRef);
  }

  /**
   * Asynchronously uploads an image to Firebase storage and returns the download URL.
   *
   * @async
   * @param {Object} image - The image to upload.
   * @returns {Promise<string>} The download URL of the uploaded image.
   * @throws Will throw an error if the upload fails.
   */
  async function imageUpload(image) {
    // If there is no image, return null
    if (!image) return null;

    return new Promise((resolve, reject) => {
      // Create a reference to the location in Firebase storage where the image will be stored
      const storageRef = ref(storage, `images/${image.name}`);

      // Start the upload task
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // You can use the snapshot to track the upload progress if needed
        },
        (error) => {
          // Log the error and reject the promise
          error;
          reject(error);
        },
        async () => {
          // Once the upload is complete, get the download URL and resolve the promise
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  }

  // Define the value to be provided to all components in the RecipeContext
  const providerValue = {
    recipe, // The current recipe
    setRecipe, // Function to update the current recipe
    recipes, // The current list of recipes
    setRecipes, // Function to update the list of recipes
    fetchRecipes, // Function to fetch all recipes
    fetchNextRecipes, // Function to fetch the next set of recipes (for pagination)
    hasMore, // Boolean indicating if there are more recipes to fetch
    createRecipe, // Function to create a new recipe
    getRecipe, // Function to get a single recipe
    updateRecipe, // Function to update a recipe
    deleteRecipe, // Function to delete a recipe
    addComment, // Function to add a comment to a recipe
    getComment, // Function to get all comments for a recipe
    deleteComment, // Function to delete a comment from a recipe
    imageUpload, // Function to upload an image
    errorMessage, // The current error message
    setErrorMessage, // Function to update the error message
    loading, // Boolean indicating if the app is currently loading data
    setLoading, // Function to update the loading state
    recipeFetchType, // The current recipe fetch type
    setRecipeFetchType, // Function to update the recipe fetch type
    selectedCategory, // The currently selected category
    setSelectedCategory, // Function to update the currently selected category
    searchResults, // The current search results
    setSearchResults, // Function to update the search results
  };

  /**
   * Renders a Provider component to provide a value to child components using RecipeContext.
   *
   * @param {Object} providerValue - The value to be provided to child components.
   * @returns {JSX.Element} The Provider component with the provided value.
   */
  return (
    <RecipeContext.Provider value={providerValue}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
