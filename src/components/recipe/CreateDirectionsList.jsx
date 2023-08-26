import { useState } from "react";
import { FiDelete } from "react-icons/fi";

/**
 * CreateDirectionsList Component
 *
 * Allows the user to create a list of directions for a recipe.
 * Users can add directions and delete them from the list.
 *
 * @param {Object} props - The component properties.
 * @param {Object} props.recipe - The recipe object.
 * @param {Function} props.setRecipe - Function to update the recipe object.
 * @returns {JSX.Element} The CreateDirectionsList component.
 */
function CreateDirectionsList({ recipe, setRecipe }) {
  // State to manage the input for a new direction
  const [directionInput, setDirectionInput] = useState("");

  /**
   * Handles the submission of a new direction.
   *
   * @param {Event} e - The submit event.
   * @returns {void}
   */
  const handleDirectionSubmit = (e) => {
    e.preventDefault();
    if (directionInput.trim() !== "") {
      // Update the recipe object with the new direction
      setRecipe({
        ...recipe,
        directions: [...recipe.directions, directionInput],
      });
      setDirectionInput("");
    }
  };

  /**
   * Handles the deletion of a direction.
   *
   * @param {number} index - The index of the direction to be deleted.
   * @returns {void}
   */
  const handleDirectionDelete = (index) => {
    const newDirections = [...recipe.directions];
    newDirections.splice(index, 1);
    // Update the recipe object after deleting the direction
    setRecipe({ ...recipe, directions: newDirections });
  };

  return (
    <div>
      {/* Label and Text Input for Directions */}
      <label className="label" htmlFor="directionsList">
        <span className="text-base label-text">Directions</span>
      </label>
      <input
        className="input input-bordered input-primary w-full"
        type="text"
        id="directionsList"
        name="directionsList"
        placeholder="Enter a direction..."
        value={directionInput}
        onChange={(e) => setDirectionInput(e.target.value)}
      />

      {/* Button to Add a New Direction */}
      <button
        type="button"
        className="flex items-center justify-center shadow-md btn btn-primary my-3 btn-sm"
        onClick={handleDirectionSubmit}
      >
        Add Direction
      </button>

      {/* List of Directions */}
      <ol className="mt-2 space-y-2">
        {recipe.directions &&
          recipe.directions.map((direction, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 rounded-lg bg-primary bg-opacity-5"
            >
              <span>{direction}</span>
              {/* Button to Delete a Direction */}
              <button
                type="button"
                data-testid="deleteDirectionButton"
                className="ml-6"
                onClick={() => handleDirectionDelete(index)}
              >
                <FiDelete color="red" />
              </button>
            </li>
          ))}
      </ol>
    </div>
  );
}

export default CreateDirectionsList;
