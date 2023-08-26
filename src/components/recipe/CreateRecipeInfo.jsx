import { DIFFICULTIES } from "../../constants/difficulties";
/**
 * CreateRecipeInfo Component.
 *
 * Renders a form for inputting various additional information about the recipe like
 * difficulty, servings, preparation time, and cooking time.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.recipe - Current recipe object.
 * @param {Function} props.setRecipe - Function to update the recipe object.
 * @returns {JSX.Element} The CreateRecipeInfo component.
 */
function CreateRecipeInfo({ recipe, setRecipe }) {
  return (
    <div className="flex flex-wrap justify-between">
      {/* Dropdown for selecting recipe difficulty */}
      <div className="w-full sm:w-1/2 lg:w-1/4 px-2">
        <label className="label" htmlFor="recipeDifficulty">
          <span className="text-base label-text">Difficulty</span>
        </label>
        <select
          className="select select-bordered w-full select-primary"
          id="recipeDifficulty"
          name="recipeDifficulty"
          value={recipe.difficulty}
          onChange={(e) => setRecipe({ ...recipe, difficulty: e.target.value })}
        >
          <option value="" disabled>
            Select difficulty...
          </option>
          {DIFFICULTIES.map((difficulty, index) => (
            <option key={index} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>
      </div>

      {/* Input for specifying the number of servings */}
      <div className="w-full sm:w-1/2 lg:w-1/4 px-2">
        <label className="label" htmlFor="recipeServings">
          <span className="text-base label-text">Servings</span>
        </label>
        <input
          className="input input-bordered input-primary w-full"
          type="number"
          id="recipeServings"
          name="recipeServings"
          placeholder="0"
          min="0"
          value={recipe.servings}
          onChange={(e) =>
            setRecipe({ ...recipe, servings: Number(e.target.value) })
          }
        />
      </div>

      {/* Input for specifying the preparation time */}
      <div className="w-full sm:w-1/2 lg:w-1/4 px-2">
        <label className="label" htmlFor="recipePreperationTime">
          <span className="text-base label-text">Preperation Time (Mins)</span>
        </label>
        <input
          className="input input-bordered input-primary w-full"
          type="number"
          id="recipePreperationTime"
          name="recipePreperationTime"
          placeholder="0"
          min="0"
          value={recipe.preparationTime}
          onChange={(e) =>
            setRecipe({ ...recipe, preparationTime: Number(e.target.value) })
          }
        />
      </div>

      {/* Input for specifying the cooking time */}
      <div className="w-full sm:w-1/2 lg:w-1/4 px-2">
        <label className="label" htmlFor="recipeCookingTime">
          <span className="text-base label-text">Cooking Time (Mins)</span>
        </label>
        <input
          className="input input-bordered input-primary w-full"
          type="number"
          id="recipeCookingTime"
          name="recipeCookingTime"
          placeholder="0"
          min="0"
          value={recipe.cookingTime}
          onChange={(e) =>
            setRecipe({ ...recipe, cookingTime: Number(e.target.value) })
          }
        />
      </div>
    </div>
  );
}

export default CreateRecipeInfo;
