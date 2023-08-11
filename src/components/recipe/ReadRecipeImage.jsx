import React from "react";

function ReadRecipeImage({ imageUrl, recipeName }) {
  return <img src={imageUrl} alt={recipeName} className="mb-4 w-full" />;
}

export default ReadRecipeImage;
