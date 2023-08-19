import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaPlus, FaUtensils, FaHeart } from "react-icons/fa";

import { UserContext } from "../../contexts/UserContext";
import { RecipeContext } from "../../contexts/RecipeContext";

function NavMenu({ isDropdown }) {
  const navMenuClassnames = isDropdown
    ? "menu menu-sm dropdown-content mt-3 z-[1] shadow rounded-box w-52 p-2 bg-base-100 text-primary"
    : "menu menu-horizontal px-1 text-primary menu-lg flex";

  const { isLoggedIn } = useContext(UserContext);
  const { setRecipeFetchType } = useContext(RecipeContext);

  const navigate = useNavigate();

  function handleYourRecipesClick() {
    console.log("Clicked on Your Recipes!");
    setRecipeFetchType("USER");
    navigate("/");
  }

  function handleYourFavouritesClick(event) {
    event.preventDefault();
    setRecipeFetchType("FAVOURITES");
    navigate("/");
  }

  return (
    <nav>
      <div>
        <ul className={`${navMenuClassnames}`}>
          {isLoggedIn && (
            <>
              <li>
                <Link to="/create-recipe">
                  <FaPlus className="mr-0.5" />
                  Create Recipe
                </Link>
              </li>
              <li>
                <a onClick={handleYourRecipesClick}>
                  <FaUtensils className="mr-0.5" />
                  Your Recipes
                </a>
              </li>
              <li>
                <a onClick={handleYourFavouritesClick}>
                  <FaHeart className="mr-0.5" />
                  Your Favourites
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavMenu;
