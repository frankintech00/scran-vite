import React from "react";
import { Route, Routes as Router } from "react-router-dom";
import {
  SignIn,
  SignUp,
  ForgotUpdatePassword,
  UpdateProfile,
} from "../components";
import {
  UserHome,
  ErrorPage,
  CreateRecipePage,
  ReadRecipePage,
  HomePage,
} from "../pages";
import ProtectedRoute from "./protectedRoutes";
import { Loading } from "../components";

/**
 * AppRoutes function component
 *
 * This component sets up the Routes for the app.
 * It uses the react-router-dom's Router (as Routes) and Route components
 * to handle the app's navigation.
 *
 * @returns {JSX.Element} A Router component with the app's Routes.
 */
function AppRoutes() {
  return (
    <Router>
      {/* Default route that renders the HomePage  */}
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotUpdatePassword />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/recipe/:id" element={<ReadRecipePage />} />
      <Route
        path="/user-home"
        element={
          <ProtectedRoute>
            <UserHome />
          </ProtectedRoute>
        }
      />
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
      <Route path="*" element={<ErrorPage />} />
    </Router>
  );
}

// Exporting the AppRoutes component
export default AppRoutes;
