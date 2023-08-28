/**
 * @file Implements a ProtectedRoute component that wraps other components to enforce user authentication.
 */

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

/**
 * ProtectedRoute component
 *
 * This is a component that renders it's children if the user object is present.
 * If there is no User it navigates to the default Route ('/').
 * It uses UserContext.jsx to perform the check.
 * If there is  loading state, it returns a loading image.
 *
 * @param {Object} props - the props object.
 * @param {ReactNode} props.children - the children to be rendered if user authentication is confirmed.
 *
 * @returns {JSX.Element|null} A React Element (the children) if the user
 * is authenticated, and default component if unauthenticated.
 */
function ProtectedRoute({ children }) {
  const { user, loading } = useContext(UserContext);

  // handle loading state
  if (loading) {
    return null;
  }

  // handle case where user is not authenticated
  if (!user) {
    return <Navigate to="/" />;
  }

  // default return of children when user is authenticated
  return children;
}

// Exporting the ProtectedRoute component
export default ProtectedRoute;
