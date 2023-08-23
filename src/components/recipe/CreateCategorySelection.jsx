import { CATEGORIES } from "../../constants/categories";

function CreateCategorySelection({ recipe, setRecipe }) {
  const handleCategoryChange = (e, category) => {
    if (e.target.checked) {
      setRecipe({
        ...recipe,
        category: [...recipe.category, category],
      });
    } else {
      setRecipe({
        ...recipe,
        category: recipe.category.filter((c) => c !== category),
      });
    }
  };

  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="text-base label-text underline">Categories</span>
      </label>
      <div className="flex flex-wrap">
        {CATEGORIES.map((category, index) => (
          <div
            key={index}
            className="w-1/2 p-1 md:w-1/3 lg:w-1/4 text-sm md:text-base"
          >
            <input
              className="checkbox checkbox-primary my-1 align-middle"
              type="checkbox"
              name={category}
              id={category}
              value={category}
              onChange={(e) => handleCategoryChange(e, category)}
              checked={recipe.category.includes(category)}
            />
            <label className="align-middle ml-4" htmlFor={category}>
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateCategorySelection;
