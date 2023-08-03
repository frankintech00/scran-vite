/**
 * Returns a user freindly error message based on the returned error code.
 *
 * @param {string} errorCode - The error code returned by Firebase.
 *
 * @returns {string} The error message corresponding to the error code.
 */

const getErrorMessage = (errorCode) => {
  console.log("Error code:", errorCode);
  switch (errorCode) {
    case "permission-denied":
      return "You don't have permission to access the requested resource.";
    case "unauthenticated":
      return "You're not authenticated. Please log in and try again.";
    case "not-found":
      return "The requested recipe could not be found.";
    case "aborted":
      return "The operation was aborted, please try again later.";
    case "already-exists":
      return "The recipe already exists. You cannot create a new one with the same ID.";
    case "internal":
      return "An internal error has occurred.";
    case "unavailable":
      return "The service is currently unavailable. Please try again later.";
    case "data-loss":
      return "Unrecoverable data loss or corruption occurred.";
    case "auth/missing-email":
      return "Please enter a valid email to continue.";
    case "auth/missing-password":
      return "Please enter your password to continue.";
    case "auth/email-already-in-use":
      return "The email address is already in use by another account.";
    case "auth/user-not-found":
      return "There is no user corresponding to the given email.";
    case "auth/invalid-email":
      return "The email address is not valid.";
    case "auth/wrong-password":
      return "The password is invalid for the given email.";
    case "auth/user-disabled":
      return "The user corresponding to the given email has been disabled.";
    case "auth/too-many-requests":
      return "Too many unsuccessful login attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error occurred, please try again.";
    case "auth/weak-password":
      return "Password is too weak, it must be at least 6 characters.";
    case "storage/object-not-found":
      return "Not found in the databse - please try again or contact support.";
    case "storage/bucket-not-found":
      return "Not found in the databse - please try again or contact support.";
    case "storage/project-not-found":
      return "Not found in the databse - please try again or contact support.";
    default:
      return "An unknown error occurred. Please try again or contact support.";
  }
};

export default getErrorMessage;
