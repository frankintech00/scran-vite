/**
 * @file This file provides user context for the application and includes functions for user authentication.
 */

// Importing necessary hooks from React
import { createContext, useEffect, useState } from "react";

// Importing navigation hook from React Router
import { useNavigate } from "react-router-dom";

// Importing Firebase configuration
import { db, storage, auth } from "../services/firebase";

// Importing Firebase authentication functions
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
} from "firebase/auth";

// Importing Firebase storage functions
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Importing error handling function
import getErrorMessage from "../helpers/errorHandling";

// Creating UserContext
export const UserContext = createContext();

/**
 * UserProvider component provides user authentication state and related functions to its children components.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to be wrapped by the UserProvider.
 * @returns {ReactNode} The wrapped child components with access to user authentication state and functions.
 */
export const UserProvider = ({ children }) => {
  // Setting up state for user, loading, and error
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Setting up navigation hook
  const navigate = useNavigate();

  /**
   * Asynchronously creates a new user.
   *
   * @async
   * @param {string} email - The email address of the new user.
   * @param {string} password - The password of the new user.
   * @param {string} displayName - The display name of the new user.
   * @param {string} confirmPassword - The confirmed password of the new user.
   * @param {File} image - The profile image of the new user.
   * @throws Will throw an error if the `createUserWithEmailAndPassword` promise is rejected.
   */
  async function createUser(
    email,
    password,
    displayName,
    confirmPassword,
    image
  ) {
    // Check if password matches confirmed password
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (user) {
        if (image) {
          const storageRef = ref(storage, `profile_pictures/${user.uid}`);
          await uploadBytes(storageRef, image);

          const downloadURL = await getDownloadURL(storageRef);
          console.log("Download URL:", downloadURL);

          await updateProfile(user, {
            displayName: displayName,
            photoURL: downloadURL,
          });
        } else {
          const defaultPhotoURL =
            "https://firebasestorage.googleapis.com/v0/b/project-scran.appspot.com/o/profile_pictures%2Fdefault-user.png?alt=media&token=77bba9bd-e471-4efe-b8b5-90e69133fe07";

          await updateProfile(user, {
            displayName: displayName,
            photoURL: defaultPhotoURL,
          });
        }

        setError(null);
        setUser(user);
        setIsLoggedIn(true);

        console.log("User created successfully.");
        console.log(user);

        navigate("/user-home");
      }
    } catch (error) {
      setError(getErrorMessage(error.code));
      setTimeout(() => setError(null), 10000);
      console.error(error.code);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Asynchronously signs in a user using an email and password.
   *
   * @async
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
   * @throws Will throw an error if the `signInWithEmailAndPassword` promise is rejected.
   */
  async function signIn(email, password) {
    // Set loading to true to display loading spinner
    setLoading(true);

    try {
      // Sign in user with email and password
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      if (user) {
        // Set error to null and log user data
        setError(null);

        //console log user object
        console.log("User Signed In Successfully.");
        console.log(user);

        // Set user state to user object
        setUser(user);

        // Set isLoggedIn to true
        setIsLoggedIn(true);

        // Navigate to user home page
        navigate("/user-home");
      }
    } catch (error) {
      // Handle any error from sign in process.
      setError(getErrorMessage(error.code));

      // Remove error after a timeout
      setTimeout(() => setError(null), 10000);

      // Console log error code and error
      console.error(error.code);
      console.error(error);
    } finally {
      // Set loading to false
      setLoading(false);
    }
  }

  /**
   * Asynchronously updates a user's display name and optional image.
   *
   * @async
   * @param {string} displayName - The new display name of the user.
   * @param {File} [image] - The new profile image of the user (optional).
   * @throws Will throw an error if the `updateProfile` or `uploadBytesResumable` promises are rejected.
   */
  async function updateUser(displayName, image) {
    const auth = getAuth();
    const user = auth.currentUser;

    // Check if user is not null
    if (!user) {
      console.error("User not authenticated.");
      return;
    }

    // Set photoURL to user's current photoURL
    let photoURL = user.photoURL;
    console.log("Initial photoURL:", photoURL);

    try {
      // Set loading to true before starting the user update process
      setLoading(true);
      console.log("Starting user update process...");

      // If an image is provided
      if (image) {
        console.log("Image provided. Uploading...");
        // Create a reference to the storage location
        const storageRef = ref(storage, `profile_pictures/${user.uid}`);
        // Upload the image
        await uploadBytes(storageRef, image);
        console.log("Image uploaded successfully.");

        // Get the download URL and update photoURL
        photoURL = await getDownloadURL(storageRef);
        console.log("New photoURL:", photoURL);
      } else {
        console.log("No new image provided. Using existing photoURL.");
      }

      // Update user profile with displayName and updated photoURL
      console.log("Updating user profile...");
      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
      });
      console.log("User profile updated.");

      // Reload user data
      await user.reload();
      setUser(user);
      console.log("User data reloaded.");

      // Navigate to user home page
      navigate("/user-home");
      console.log("Navigating to user home page.");
    } catch (error) {
      // Handle any error from user updating process.
      setError(getErrorMessage(error.code));
      console.error("Error updating user:", error.code, error);
      // Remove error after a timeout
      setTimeout(() => {
        setError(null);
        console.log("Error message cleared.");
      }, 10000);
    } finally {
      // Set loading to false
      setLoading(false);
      console.log("Loading set to false.");
    }
  }

  /**
   * Asynchronously signs in a user using Google authentication.
   *
   * @async
   * @throws Will throw an error if the `signInWithPopup` promise is rejected.
   */
  async function signInWithGoogle() {
    // Instantiate a new GoogleAuthProvider object
    const provider = new GoogleAuthProvider();

    try {
      // Set loading to true before starting the Google sign-in process
      setLoading(true);

      // Sign in using a popup window
      const { user } = await signInWithPopup(auth, provider);

      // Set user state with the signed-in user data
      setUser(user);

      // Set isLoggedIn to true
      setIsLoggedIn(true);

      // Navigate to user home page
      navigate("/user-home");

      // Set error to null and log user data
      setError(null);
      console.log("User Signed In with Google successfully.");
      console.log(user);
    } catch (error) {
      // Handle any error from Google sign-in process
      setError(getErrorMessage(error.code));

      // Remove error after a timeout
      setTimeout(() => setError(null), 10000);

      // Log error code and error
      console.error(error.code);
      console.error(error);
    } finally {
      // Set loading to false
      setLoading(false);
    }
  }

  /**
   * Asynchronously sends a password reset email to a user.
   *
   * @async
   * @param {string} email - The email address of the user.
   * @returns {Promise<boolean>} A promise that resolves to true if the email was sent successfully, and false otherwise.
   * @throws Will throw an error if the `sendPasswordResetEmail` promise is rejected.
   */
  async function sendPasswordReset(email) {
    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, email);
      // Set error to null and log success message
      setError(null);
      console.log("Password reset email sent.");
      // Return true if email was sent successfully
      return true;
    } catch (error) {
      // Handle any error from the password reset email sending process
      setError(getErrorMessage(error.code));
      // Remove error after a timeout
      setTimeout(() => setError(null), 10000);
      // Log error code and error
      console.error(error.code);
      console.error(error);
      // Return false if email was not sent successfully
      return false;
    }
  }

  /**
   * Asynchronously logs out a user.
   *
   * @async
   * @returns {Promise<void>} A promise that resolves when the user is logged out.
   * @throws Will throw an error if the `signOut` promise is rejected.
   */
  const logout = async () => {
    try {
      // Sign out the user
      await signOut(auth);
      // Set the user state to null
      setUser(null);
      // Set isLoggedIn to false
      setIsLoggedIn(false);
      // Navigate to home page
      navigate("/");
      // Set error to null and log success message
      setError(null);

      console.log("User Signed Out Successfully.");
      console.log(user);
    } catch (error) {
      //TODO: where is the error message displayed?
      // Handle any error from the logout process
      setError(getErrorMessage(error.code));
      // Remove error after a timeout
      setTimeout(() => setError(null), 10000);
      // Log error code and error
      console.error(error.code);
      console.error(error);
    }
  };

  /**
   * `useEffect` hook to listen for changes in the authentication state.
   * Sets user data upon state changes and controls the loading state.
   *
   * @function
   * @returns {function} Cleanup function to unsubscribe the listener when the component unmounts.
   */
  useEffect(() => {
    // Subscribe to onAuthStateChanged event
    // The observer receives a function that will be called every time the user login state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Set the user state to the current user object
      setUser(currentUser);
      // Set loading to false once we've received the auth state
      setLoading(false);
    });

    // Return cleanup function to be run when the component unmounts
    return () => {
      // Unsubscribe the listener to prevent memory leaks
      unsubscribe();
    };
  }, []); // Run once on component mount due to empty dependency array

  /**
   * The value prop for the UserContext.Provider.
   * @type {Object}
   */
  const providerValue = {
    user,
    isLoggedIn,
    createUser,
    signIn,
    signInWithGoogle,
    updateUser,
    sendPasswordReset,
    logout,
    error,
    getErrorMessage,
    loading,
  };

  /**
   * Returns a UserContext.Provider with the value prop set to providerValue.
   */
  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};
