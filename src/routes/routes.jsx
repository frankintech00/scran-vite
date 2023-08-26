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
 * Renders the routes for the application using React Router.
 *
 * @returns {JSX.Element} The Router component with the defined routes.
 */
function AppRoutes() {
  return (
    <Router>
      {/* Default route that renders the HomePage */}
      <Route path="/" element={<HomePage />} />
      <Route path="/search-results" element={<SearchResultsPage />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotUpdatePassword />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/recipe/:id" element={<ReadRecipePage />} />

      <Route
        path="/update-profile/:id"
        element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-recipe"
        element={
          <ProtectedRoute>
            <CreateRecipePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/update-recipe/:id"
        element={
          <ProtectedRoute>
            <UpdateRecipePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Router>
  );
}

// Exporting the AppRoutes component
export default AppRoutes;
