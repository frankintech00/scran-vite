import { FaSearch } from "react-icons/fa";

function SearchInput() {
  return (
    <div className="w-full form-control">
      <div className="relative">
        <input
          className="w-full py-2 pl-10 input input-bordered input-primary"
          placeholder="Search for a recipe..."
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FaSearch className="text-primary" />
        </div>
      </div>
    </div>
  );
}

export default SearchInput;
