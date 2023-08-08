import {
  HamburgerIcon,
  AvatarDropdown,
  SignInDropdown,
  SearchInput,
  NavMenu,
  Logo,
} from "..";
import { useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

function Header() {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <header className="w-full fixed inset-x-0 top-0 z-50 flex flex-wrap justify-around bg-base-100 shadow space-y-1 lg:space-y-0 p-2">
      <div className="w-10/12 order-2 lg:w-2/12 lg:order-1 flex justify-center items-center">
        <Logo />
      </div>
      <div className="dropdown w-2/12 order-1 lg:hidden flex justify-center">
        <button tabIndex={0} className="btn btn-ghost">
          <HamburgerIcon />
        </button>
        <NavMenu isDropdown={true} />
      </div>
      <div className="hidden w-3/12 order-1 lg:flex lg:w-5/12 lg:order-2  justify-center items-center">
        <NavMenu isDropdown={false} />
      </div>
      <div className="w-9/12 order-3 lg:w-3/12 flex justify-center items-center">
        <SearchInput />
      </div>
      <div className="w-3/12 order-4 lg:w-2/12  flex justify-center items-center lg:justify-center">
        {isLoggedIn ? <AvatarDropdown /> : <SignInDropdown />}
      </div>
    </header>
  );
}

export default Header;
