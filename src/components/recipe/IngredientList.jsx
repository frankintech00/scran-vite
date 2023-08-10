import { useState } from "react";
import { FiDelete } from "react-icons/fi";

function IngredientsList({ ingredients, setIngredients }) {
  const [ingredientInput, setIngredientInput] = useState("");

  const handleIngredientSubmit = (e) => {
    e.preventDefault();
    if (ingredientInput.trim() !== "") {
      setIngredients([...ingredients, ingredientInput]);
      setIngredientInput("");
    }
  };

  const handleIngredientDelete = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  return (
    <div>
      <label className="label">
        <span className="text-base label-text">Ingredients</span>
      </label>
      <input
        className="input input-bordered input-primary w-full"
        type="text"
        placeholder="Enter an ingredient..."
        value={ingredientInput}
        onChange={(e) => setIngredientInput(e.target.value)}
      />
      <button
        type="button"
        className="flex items-center justify-center shadow-md btn btn-primary my-3 btn-sm"
        onClick={handleIngredientSubmit}
      >
        Add Ingredient
      </button>
      <ul className="mt-2 space-y-2">
        {ingredients.map((ingredient, index) => (
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

export default IngredientsList;
