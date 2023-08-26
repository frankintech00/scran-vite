/**
 * ReadRecipeImage Component.
 *
 * This component displays the image of the recipe.
 * It accepts the image URL and the recipe name as props,
 * then renders the image with the recipe name as its alternative text.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.imageUrl - The URL of the recipe image.
 * @param {string} props.recipeName - The name of the recipe.
 *
 * @returns {JSX.Element} - The ReadRecipeImage component.
 */
function ReadRecipeImage({ imageUrl, recipeName }) {
  // Display the image with the recipe name as its alt text.
  return <img src={imageUrl} alt={recipeName} className="mb-4 w-full" />;
}

export default ReadRecipeImage;
