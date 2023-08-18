import { useContext, useState } from "react";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

function AvatarDropdown() {
  const { user, isLoggedIn, logout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className=" btn btn-ghost btn-circle btn-md avatar"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-10 rounded-full">
          {isLoggedIn && user.photoURL ? (
            <img src={user.photoURL} alt={user.displayName} />
          ) : (
            <BiUser size={52} className="text-accent" />
          )}
        </div>
      </label>
      {isOpen && (
        <div>
          <ul
            tabIndex={0}
            className="my-3 z-[1] p-6 shadow-xl dropdown-content rounded-box w-72 bg-base-100 menu menu-vertical"
          >
            {isLoggedIn && (
              <p className="p-2 text-xl">
                Hi - {user.displayName || user.email}
              </p>
            )}
            <div className="my-2 divider"></div>
            <li>
              <Link
                to="/user-home"
                className="justify-between text-xl"
                onClick={handleLinkClick}
              >
                Your Recipes
              </Link>
              <Link
                to="/create-recipe"
                className="justify-between text-xl"
                onClick={handleLinkClick}
              >
                Create a Recipe
              </Link>
              <div className="my-2 divider"></div>
              <Link
                to={`/update-profile/${user.uid}`}
                className="justify-between text-xl"
                onClick={handleLinkClick}
              >
                Edit Profile
              </Link>
            </li>
            <div className="my-2 divider"></div>
            <li className="mb-2">
              <button
                onClick={logout}
                className="text-white btn btn-warning btn-block btn-sm"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default AvatarDropdown;
