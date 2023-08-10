import { useState } from "react";
import { FiDelete } from "react-icons/fi";

function DirectionsList({ directions, setDirections }) {
  const [directionInput, setDirectionInput] = useState("");

  const handleDirectionSubmit = (e) => {
    e.preventDefault();
    if (directionInput.trim() !== "") {
      setDirections([...directions, directionInput]);
      setDirectionInput("");
    }
  };

  const handleDirectionDelete = (index) => {
    const newDirections = [...directions];
    newDirections.splice(index, 1);
    setDirections(newDirections);
  };

  return (
    <div>
      <label className="label">
        <span className="text-base label-text">Directions</span>
      </label>
      <input
        className="input input-bordered input-primary w-full"
        type="text"
        placeholder="Enter a direction..."
        value={directionInput}
        onChange={(e) => setDirectionInput(e.target.value)}
      />
      <button
        type="button"
        className="flex items-center justify-center shadow-md btn btn-primary my-3 btn-sm"
        onClick={handleDirectionSubmit}
      >
        Add Direction
      </button>
      <ol className="mt-2 space-y-2">
        {directions.map((direction, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-2 rounded-lg bg-primary bg-opacity-5"
          >
            <span>{direction}</span>
            <button
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

export default DirectionsList;
