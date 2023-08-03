/**
 * @file This file provides user context for the application and includes functions for user authentication.
 */

// Firebase and React imports
// Importing necessary hooks from React
import { createContext, useEffect, useState } from "react";

// Importing navigation hook from React Router
import { useNavigate } from "react-router-dom";

// Importing Firebase authentication functions
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

// Importing Firebase storage functions
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Importing Firebase configuration
import { db, storage, auth } from "../services/firebase";

// Importing error handling function
import getErrorMessage from "../helpers/errorHandling";

// Creating UserContext
export const UserContext = createContext();

// Creating UserProvider component
export const UserProvider = ({ children }) => {
  // Setting up state for user, loading, and error
  const [user, setUser] = useState(null);
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
  const createUser = async (
    email,
    password,
    displayName,
    confirmPassword,
    image
  ) => {
    // Check if password matches confirmed password
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Set loading to true
    setLoading(true);

    try {
      // Create user with email and password
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (user) {
        // If an image is provided
        if (image) {
          // Create a reference to the storage location
          const storageRef = ref(storage, `profile_pictures/${user.uid}`);

          // Create a task to upload the image and get the download URL
          const uploadImageToStorage = async (storageRef, image) => {
            return new Promise((resolve, reject) => {
              const uploadTask = uploadBytesResumable(storageRef, image);
              uploadTask.on(
                "state_changed",
                (snapshot) => {},
                (error) => {
                  // handle the error
                  reject(error);
                },
                () => {
                  // Upload completed successfully get the downloadURL
                  getDownloadURL(uploadTask.snapshot.ref).then(
                    (downloadURL) => {
                      resolve(downloadURL);
                    }
                  );
                }
              );
            });
          };

          const downloadURL = await uploadImageToStorage(storageRef, image);

          // Update user profile with displayName and photoURL
          await updateProfile(user, {
            displayName: displayName,
            photoURL: downloadURL,
          });
        } else {
          // Default photoURL if user doesn't provide one
          const defaultPhotoURL =
            "https://firebasestorage.googleapis.com/v0/b/project-scran.appspot.com/o/profile_pictures%2Fdefault-user.png?alt=media&token=77bba9bd-e471-4efe-b8b5-90e69133fe07";

          // Update user profile with displayName and default photoURL
          await updateProfile(user, {
            displayName: displayName,
            photoURL: defaultPhotoURL,
          });
        }

        // Set error to null and log user data
        setError(null);
        console.log("User created successfully.");
        console.log(user);
      }
    } catch (error) {
      // Handle any error from user creation process.
      setError(getErrorMessage(error.code));
      // Remove error after a timeout
      setTimeout(() => setError(null), 10000);
      console.error(error.code);
      console.error(error);
    } finally {
      // Navigate to user home page
      navigate("/user-home");
      // Set loading to false
      setLoading(false);
    }
  };

  /**
   * Asynchronously signs in a user using an email and password.
   *
   * @async
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
   * @throws Will throw an error if the `signInWithEmailAndPassword` promise is rejected.
   */
  const signIn = async (email, password) => {
    try {
      // Sign in user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to user home page
      navigate("/user-home");
      // Set error to null and log user data
      setError(null);
      console.log("User Signed In Successfully.");
      console.log(user);
    } catch (error) {
      // Handle any error from sign in process.
      setError(getErrorMessage(error.code));
      // Remove error after a timeout
      setTimeout(() => setError(null), 10000);
      // Log error code and error
      console.error(error.code);
      console.error(error);
    }
  };

  /**
   * Asynchronously updates a user's display name and optional image.
   *
   * @async
   * @param {string} displayName - The new display name of the user.
   * @param {File} [image] - The new profile image of the user (optional).
   * @throws Will throw an error if the `updateProfile` or `uploadBytesResumable` promises are rejected.
   */
  const updateUser = async (displayName, image) => {
    const auth = getAuth();
    const user = auth.currentUser;

    // Check if user is not null
    if (user) {
      try {
        // If an image is provided
        if (image) {
          // Create a reference to the storage location
          const storageRef = ref(storage, `profile_pictures/${user.uid}`);
          // Create a task to upload the image
          const uploadTask = uploadBytesResumable(storageRef, image);

          // Listen for state changes, errors, and completion of the upload.
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
              // Log any errors that occur during upload
              console.error(error);
            },
            async () => {
              // On successful upload to Storage, get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                  // Update user profile with displayName and new photoURL
                  await updateProfile(user, {
                    displayName: displayName,
                    photoURL: downloadURL,
                  });
                  // Navigate to user home page
                  navigate("/user-home");
                  // Set error to null and log user data
                  setError(null);
                  console.log("User profile updated successfully.");
                  console.log(user);
                }
              );
            }
          );
        } else {
          // Default photoURL if user doesn't provide one
          const defaultPhotoURL =
            "https://firebasestorage.googleapis.com/v0/b/project-scran.appspot.com/o/profile_pictures%2Fdefault-user.png?alt=media&token=77bba9bd-e471-4efe-b8b5-90e69133fe07";

          // Update user profile with displayName and default photoURL
          await updateProfile(user, {
            displayName: displayName,
            photoURL: defaultPhotoURL,
          });
          // Navigate to user home page
          navigate("/user-home");
          // Set error to null and log user data
          setError(null);
          console.log("User profile updated successfully.");
          console.log(user);
        }
      } catch (error) {
        // Handle any error from user updating process.
        setError(getErrorMessage(error.code));
        // Remove error after a timeout
        setTimeout(() => setError(null), 10000);
        // Log error code and error
        console.error(error.code);
        console.error(error);
      }
    }
  };

  /**
   * Asynchronously signs in a user using Google authentication.
   *
   * @async
   * @throws Will throw an error if the `signInWithPopup` promise is rejected.
   */
  const signInWithGoogle = async () => {
    // Instantiate a new GoogleAuthProvider object
    const provider = new GoogleAuthProvider();

    try {
      // Sign in using a popup window
      await signInWithPopup(auth, provider);
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
    }
  };

  /**
   * Asynchronously sends a password reset email to a user.
   *
   * @async
   * @param {string} email - The email address of the user.
   * @returns {Promise<boolean>} A promise that resolves to true if the email was sent successfully, and false otherwise.
   * @throws Will throw an error if the `sendPasswordResetEmail` promise is rejected.
   */
  const sendPasswordReset = async (email) => {
    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, email);
      // Set error to null and log success message
      setError(null);
      console.log("Password reset email sent.");
      return true;
    } catch (error) {
      // Handle any error from the password reset email sending process
      setError(getErrorMessage(error.code));
      // Remove error after a timeout
      setTimeout(() => setError(null), 10000);
      // Log error code and error
      console.error(error.code);
      console.error(error);
      return false;
    }
  };

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
      // Navigate to home page
      navigate("/");
      // Set error to null and log success message
      setError(null);
      console.log("User Signed Out Successfully.");
      console.log(user);
    } catch (error) {
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
    createUser,
    signIn,
    signInWithGoogle,
    updateUser,
    logout,
    error,
    setError,
    getErrorMessage,
    sendPasswordReset,
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
