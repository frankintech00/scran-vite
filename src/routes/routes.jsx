/**
 * @file Defines the routes for the application, using both public and protected routes.
 */

/**
 * Imports React and necessary components from react-router-dom and custom components.
 */
import React from "react";
import { Route, Routes as Router } from "react-router-dom";
import {
  SignIn,
  SignUp,
  ForgotUpdatePassword,
  UpdateProfile,
} from "../components";
import {
  ErrorPage,
  CreateRecipePage,
  ReadRecipePage,
  HomePage,
  UpdateRecipePage,
  SearchResultsPage,
} from "../pages";
import ProtectedRoute from "./protectedRoutes";
import { Loading } from "../components";

/**
 * The AppRoutes function defines the routes for the application.
 * It uses the Routes component from react-router-dom to define both public and protected routes.
 *
 * @returns {JSX.Element} The Router component populated with the defined routes for the application.
 */
function AppRoutes() {
  return (
    <Router>
      {/* Default route that renders the HomePage */}
      <Route path="/" element={<HomePage />} />
      {/* Route for search results */}
      <Route path="/search-results" element={<SearchResultsPage />} />
      {/* Route for signing in */}
      <Route path="/sign-in" element={<SignIn />} />
      {/* Route for signing up */}
      <Route path="/sign-up" element={<SignUp />} />
      {/* Route for password recovery */}
      <Route path="/forgot-password" element={<ForgotUpdatePassword />} />
      {/* Loading route */}
      <Route path="/loading" element={<Loading />} />
      {/* Route for reading a specific recipe */}
      <Route path="/recipe/:id" element={<ReadRecipePage />} />
      {/* Protected Route for updating user profile */}
      <Route
        path="/update-profile/:id"
        element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        }
      />
      {/* Protected Route for creating a new recipe */}
      <Route
        path="/create-recipe"
        element={
          <ProtectedRoute>
            <CreateRecipePage />
          </ProtectedRoute>
        }
      />
      {/* Protected Route for updating a specific recipe */}
      <Route
        path="/update-recipe/:id"
        element={
          <ProtectedRoute>
            <UpdateRecipePage />
          </ProtectedRoute>
        }
      />
      {/* Fallback route for undefined paths */}
      <Route path="*" element={<ErrorPage />} />
    </Router>
  );
}

// Exporting the AppRoutes component for use in other parts of the application
export default AppRoutes;
