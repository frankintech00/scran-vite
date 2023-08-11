function ReadRecipeDescription({ description }) {
  return (
    <div className="flex">
      <h2 className="text-2xl font-medium flex-wrap text-gray-600">
        {description}
      </h2>
    </div>
  );
}

export default ReadRecipeDescription;
