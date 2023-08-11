function ReadRecipeDirections({ directions }) {
  return (
    <div className="mb-12">
      <div className="font-bold text-secondary text-xl mb-3">Directions:</div>
      <ul className="list-inside space-y-3">
        {directions &&
          directions.map((direction, index) => (
            <li key={index} className="font-semibold text-xl">
              <span className="text-secondary">
                {"Step " + (index + 1) + " of " + directions.length + ": "}
              </span>
              <span>{direction}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ReadRecipeDirections;
