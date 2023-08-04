import { useContext } from "react";
import { BiUser } from "react-icons/bi";

import { UserContext } from "../contexts/UserContext";

function UserHome() {
  const { user, logout, isLoggedIn } = useContext(UserContext);

  //TODO: just temporary, will be replaced with a proper profile page

  return (
    <div className="flex flex-col items-center mx-auto mb-10 space-y-4 text-xl">
      <div>
        {isLoggedIn && user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="w-32 rounded-full"
          />
        ) : (
          <BiUser size={128} className="text-accent" />
        )}
      </div>
      <div className="text-2xl">
        {isLoggedIn && user.displayName ? (
          <p>{user.displayName}</p>
        ) : (
          <p>{user.email}</p>
        )}
      </div>
      <div className="flex gap-4 text-gray-600 justify-evenly">
        <div className="flex flex-col items-center">
          <div>10</div>
          <div>Recipes</div>
        </div>
        <div className="flex flex-col items-center">
          <div>1</div>
          <div>List</div>
        </div>
        <div className="flex flex-col items-center">
          <div>91</div>
          <div>Comments</div>
        </div>
      </div>

      <div className="flex gap-4 text-gray-600 justify-evenly">
        <button
          onClick={logout}
          className="text-white btn btn-warning btn-block btn-sm"
        >
          Logout
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
}

export default UserHome;
