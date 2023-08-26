import { useState } from "react";
import { FiDelete } from "react-icons/fi";

/**
 * CreateIngredientsList Component
 *
 * This component allows the user to create a list of ingredients
 * for a recipe and provides options to add or delete ingredients.
 *
 * @param {Object} props - The component properties.
 * @param {Object} props.recipe - The current recipe object.
 * @param {Function} props.setRecipe - Function to update the recipe.
 * @returns {JSX.Element} The CreateIngredientsList component.
 */
function CreateIngredientsList({ recipe, setRecipe }) {
  // State to hold the current ingredient input
  const [ingredientInput, setIngredientInput] = useState("");

  /**
   * Handles the submission of an ingredient to the list.
   *
   * @param {Event} e - The submit event.
   * @returns {void}
   */
  const handleIngredientSubmit = (e) => {
    e.preventDefault();
    if (ingredientInput.trim() !== "") {
      setRecipe({
        ...recipe,
        ingredients: [...recipe.ingredients, ingredientInput],
      });
      setIngredientInput("");
    }
  };

  /**
   * Deletes an ingredient from the list by index.
   *
   * @param {number} index - The index of the ingredient to delete.
   * @returns {void}
   */
  const handleIngredientDelete = (index) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients.splice(index, 1);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  return (
    <div>
      {/* Ingredient Label and Input */}
      <label className="label" htmlFor="ingredientsList">
        <span className="text-base label-text">Ingredients</span>
      </label>
      <input
        className="input input-bordered input-primary w-full"
        type="text"
        name="ingredientsList"
        id="ingredientsList"
        placeholder="Enter an ingredient..."
        value={ingredientInput}
        onChange={(e) => setIngredientInput(e.target.value)}
      />

      {/* Add Ingredient Button */}
      <button
        type="button"
        data-testid="addIngredientButton"
        className="flex items-center justify-center shadow-md btn btn-primary my-3 btn-sm"
        onClick={handleIngredientSubmit}
      >
        Add Ingredient
      </button>

      {/* Ingredient List */}
      <ul className="mt-2 space-y-2">
        {recipe.ingredients &&
          recipe.ingredients.map((ingredient, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 rounded-lg bg-primary bg-opacity-5"
            >
              <span>{ingredient}</span>
              <FiDelete
                color="red"
                className="cursor-pointer"
                onClick={() => handleIngredientDelete(index)}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default CreateIngredientsList;
