/**
 * @file This is the main App component file. It sets up the application's routing and context providers.
 */

// Importing necessary libraries, components and context providers
import React from "react";
import { UserProvider } from "./contexts/UserContext";
import AppRoutes from "./routes/routes";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components";
import RecipeProvider from "./contexts/RecipeContext";

/**
 * The App component serves as the root component of the application.
 * It wraps all the child components within BrowserRouter, UserProvider, and RecipeProvider
 * to provide routing and context functionality across the application.
 *
 * @returns {JSX.Element} Returns the main application JSX markup, including the Header and AppRoutes components.
 */
function App() {
  return (
    // Using BrowserRouter to enable routing in the app
    <BrowserRouter>
      {/* Using UserProvider to provide user context to all components within */}
      <UserProvider>
        {/* Using RecipeProvider to provide recipe context to all components within */}
        <RecipeProvider>
          {/* Rendering the Header component */}
          <Header />
          {/* Applying global styles for the app */}
          <div className="pt-36 lg:pt-24 mx-5 mb-40 max-w-screen-xl xl:mx-auto">
            {/* Rendering the Routes for the app*/}
            <AppRoutes />
          </div>
        </RecipeProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

// Exporting the App component to be used in other parts of the application
export default App;
