// Importing necessary libraries, components and context providers
import React from "react";
import { UserProvider } from "./contexts/UserContext";
import AppRoutes from "./routes/routes";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components";
import RecipeProvider from "./contexts/RecipeContext";

// Defining the App component
function App() {
  return (
    // Using BrowserRouter to enable routing in the app
    <BrowserRouter>
      {/* Using UserProvider to provide user context to all components within */}
      <UserProvider>
        <RecipeProvider>
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
