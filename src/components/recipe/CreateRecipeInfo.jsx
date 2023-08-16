import { DIFFICULTIES } from "../../constants/difficulties";

function CreateRecipeInfo({ recipe, setRecipe }) {
  return (
    <div className="flex flex-wrap justify-between">
      <div className="w-full sm:w-1/2 lg:w-1/4 px-2">
        <label className="label">
          <span className="text-base label-text">Difficulty</span>
        </label>
        <select
          className="select select-bordered w-full select-primary"
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
      <div className="w-full sm:w-1/2 lg:w-1/4 px-2">
        <label className="label">
          <span className="text-base label-text">Servings</span>
        </label>
        <input
          className="input input-bordered input-primary w-full"
          type="number"
          placeholder="0"
          min="0"
          value={recipe.servings}
          onChange={(e) =>
            setRecipe({ ...recipe, servings: Number(e.target.value) })
          }
        />
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/4 px-2">
        <label className="label">
          <span className="text-base label-text">Preperation Time (Mins)</span>
        </label>
        <input
          className="input input-bordered input-primary w-full"
          type="number"
          placeholder="0"
          min="0"
          value={recipe.preparationTime}
          onChange={(e) =>
            setRecipe({
              ...recipe,
              preparationTime: Number(e.target.value),
            })
          }
        />
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/4 px-2">
        <label className="label">
          <span className="text-base label-text">Cooking Time (Mins)</span>
        </label>
        <input
          className="input input-bordered input-primary w-full"
          type="number"
          placeholder="0"
          min="0"
          value={recipe.cookingTime}
          onChange={(e) =>
            setRecipe({
              ...recipe,
              cookingTime: Number(e.target.value),
            })
          }
        />
      </div>
    </div>
  );
}

export default CreateRecipeInfo;