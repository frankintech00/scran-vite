// Importing necessary libraries, components and context providers
import React from "react";
import { UserProvider } from "./contexts/UserContext";
import AppRoutes from "./routes/routes";
import { BrowserRouter } from "react-router-dom";

// Defining the App component
function App() {
  return (
    // Using BrowserRouter to enable routing in the app
    <BrowserRouter>
      {/* Using UserProvider to provide user context to all components within */}
      <UserProvider>
        {/* Applying global styles for the app */}
        <div className="pt-36 md:pt-28 mx-5 mb-40 max-w-screen-xl xl:mx-auto">
          {/* Rendering the Routes for the app*/}
          <AppRoutes />
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

// Exporting the App component to be used in other parts of the application
export default App;
