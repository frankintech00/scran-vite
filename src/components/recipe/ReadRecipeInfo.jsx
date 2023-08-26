/**
 * ReadRecipeInfo Component.
 *
 * This component displays various meta-information about the recipe,
 * such as preparation time, cooking time, servings, and difficulty level.
 *
 * @param {Object} props - Component properties.
 * @param {number} props.preparationTime - The time required for preparation in minutes.
 * @param {number} props.cookingTime - The time required for cooking in minutes.
 * @param {number} props.servings - The number of servings the recipe yields.
 * @param {string} props.difficulty - The level of difficulty for the recipe.
 *
 * @returns {JSX.Element} - The ReadRecipeInfo component.
 */
function ReadRecipeInfo({
  preparationTime,
  cookingTime,
  servings,
  difficulty,
}) {
  return (
    <div>
      {/* Display the meta-information in a flexible grid layout */}
      <div className="flex flex-wrap mb-2">
        {/* Display the preparation time */}
        <div className="w-1/2 lg:w-1/4 mb-2">
          <div className="font-bold text-secondary lg:text-xl">Prep Time:</div>
          <div className="font-semibold lg:text-xl">
            {preparationTime} Mins.
          </div>
        </div>
        {/* Display the cooking time */}
        <div className="w-1/2 lg:w-1/4 mb-2">
          <div className="font-bold text-secondary lg:text-xl">Cook Time:</div>
          <div className="font-semibold lg:text-xl">{cookingTime} Mins.</div>
        </div>
        {/* Display the servings */}
        <div className="w-1/2 lg:w-1/4 mb-2">
          <div className="font-bold text-secondary lg:text-xl">Servings:</div>
          <div className="font-semibold lg:text-xl">{servings}</div>
        </div>
        {/* Display the difficulty */}
        <div className="w-1/2 lg:w-1/4 mb-2">
          <div className="font-bold text-secondary lg:text-xl">Difficulty:</div>
          <div className="font-semibold lg:text-xl">{difficulty}</div>
        </div>
      </div>
    </div>
  );
}

export default ReadRecipeInfo;
