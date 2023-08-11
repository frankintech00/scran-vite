import { Link } from "react-router-dom";

import React from "react";

function ReadRecipeError() {
  return (
    <div className="flex flex-col items-center justify-top bg-primary bg-opacity-5 text-center shadow-xl rounded-lg py-10">
      <h2 className="text-4xl font-semibold mb-4 text-warning">
        The recipe you are looking for doesn't exist!
      </h2>

      <Link to="/" className="text-2xl text-secondary hover:underline">
        Return to the Homepage
      </Link>
    </div>
  );
}

export default ReadRecipeError;
