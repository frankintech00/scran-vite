import { useContext, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaUtensils, FaHeart } from "react-icons/fa";

import { UserContext } from "../../contexts/UserContext";
import { RecipeContext } from "../../contexts/RecipeContext";

function NavMenu({ isDropdown }) {
  const [isOpen, setIsOpen] = useState(false);
  const navMenuClassnames = isDropdown
    ? "menu menu-sm dropdown-content mt-3 z-[1] shadow rounded-box w-52 p-2 bg-base-100 text-primary"
    : "menu menu-horizontal px-1 text-primary menu-lg flex";

  const { user, isLoggedIn } = useContext(UserContext);
  const { fetchRecipesByUser } = useContext(RecipeContext);

  const navMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navMenuRef.current && !navMenuRef.current.contains(event.target)) {
        const detailsElements = navMenuRef.current.querySelectorAll("details");
        detailsElements.forEach((details) => {
          details.removeAttribute("open");
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleYourRecipesClick = async () => {
    try {
      await fetchRecipesByUser(user.uid);
    } catch (error) {
      console.error("Failed to fetch user recipes:", error);
    }
  };

  return (
    <nav ref={navMenuRef}>
      <div>
        <ul className={`${navMenuClassnames}`}>
          {isLoggedIn && (
            <>
              <li>
                <Link onClick={handleYourRecipesClick}>
                  <FaPlus className="mr-0.5" />
                  Create Recipe
                </Link>
              </li>
              <li>
                <Link onClick={handleYourRecipesClick}>
                  <FaUtensils className="mr-0.5" />
                  Your Recipes
                </Link>
              </li>
              <li>
                <Link onClick={handleYourRecipesClick}>
                  <FaHeart className="mr-0.5" />
                  Your Favourites
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavMenu;
