
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


export default AppRoutes;
