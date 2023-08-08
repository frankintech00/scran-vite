import { useContext, useRef, useEffect, useState } from "react";

import { UserContext } from "../../contexts/UserContext";

function NavMenu({ isDropdown }) {
  const [isOpen, setIsOpen] = useState(false);
  const navMenuClassnames = isDropdown
    ? "menu menu-sm dropdown-content mt-3 z-[1] shadow rounded-box w-52 p-2 bg-base-100 text-primary"
    : "menu menu-horizontal px-1 text-primary menu-lg flex";

  const { isLoggedIn } = useContext(UserContext);

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

  return (
    <nav ref={navMenuRef}>
      <div>
        <ul className={`${navMenuClassnames}`}>
          {isLoggedIn && (
            <li>
              <a>Your Recipes</a>
            </li>
          )}
          <li tabIndex={0}>
            <details>
              <summary>Courses</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Recipes</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavMenu;
