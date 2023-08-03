import React from "react";
import { Route, Routes as Router } from "react-router-dom";
import { LoginPage, Signup, ForgotUpdatePassword, UserHome } from "../pages";
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
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotUpdatePassword />} />
      <Route path="/loading" element={<Loading />} />
      <Route
        path="/user-home"
        element={
          <ProtectedRoute>
            <UserHome />
          </ProtectedRoute>
        }
      />
    </Router>
  );
}

// Exporting the AppRoutes component
export default AppRoutes;
