function ReadRecipeCategories({ categories }) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <nav className="categories mb-5 flex flex-col ">
      <h3 className="font-semibold uppercase mb-3">Categories:</h3>
      <ul className="flex flex-wrap gap-4">
        {categories.map((category, index) => (
          <li
            key={index}
            className="rounded-md px-2 py-1 bg-primary text-primary bg-opacity-30"
          >
            {category}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default ReadRecipeCategories;
