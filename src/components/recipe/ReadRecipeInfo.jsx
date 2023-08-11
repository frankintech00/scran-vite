function ReadRecipeInfo({
  preparationTime,
  cookingTime,
  servings,
  difficulty,
}) {
  const totalTime = preparationTime + cookingTime;
  const totalHours = totalTime > 60 ? Math.floor(totalTime / 60) : 0;
  const totalMinutes = totalTime % 60;

  return (
    <div>
      <div className="flex flex-wrap mb-2">
        <div className="w-1/2 lg:w-1/4 mb-2">
          <div className="font-bold text-secondary lg:text-xl">Prep Time:</div>
          <div className="font-semibold lg:text-xl">
            {preparationTime} Mins.
          </div>
        </div>
        <div className="w-1/2 lg:w-1/4 mb-2">
          <div className="font-bold text-secondary lg:text-xl">Cook Time:</div>
          <div className="font-semibold lg:text-xl">{cookingTime} Mins.</div>
        </div>
        <div className="w-1/2 lg:w-1/4 mb-2">
          <div className="font-bold text-secondary lg:text-xl">Servings:</div>
          <div className="font-semibold lg:text-xl">{servings}</div>
        </div>
        <div className="w-1/2 lg:w-1/4 mb-2">
          <div className="font-bold text-secondary lg:text-xl">Difficulty:</div>
          <div className="font-semibold lg:text-xl">{difficulty}</div>
        </div>
      </div>
    </div>
  );
}

export default ReadRecipeInfo;
