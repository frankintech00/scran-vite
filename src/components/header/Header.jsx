import { Logo } from "..";
import HamburgerIcon from "./HamburgerIcon";

function Header() {
  return (
    <header className="w-full fixed inset-x-0 top-0 z-50 flex flex-wrap justify-around bg-white shadow space-y-1 lg:space-y-0 p-2">
      <div className="w-9/12 order-2 lg:w-2/12 lg:order-1 bg-red-200 flex justify-center items-center">
        <Logo />
      </div>
      <div className="w-3/12 order-1 lg:hidden lg:w-5/12 lg:order-2 bg-blue-200 flex justify-center items-center">
        <HamburgerIcon />
      </div>
      <div className="hidden w-3/12 order-1 lg:block lg:w-5/12 lg:order-2 bg-blue-200 justify-center items-center">
        Menu
      </div>
      <div className="w-9/12 order-3 lg:w-3/12 bg-green-200 flex justify-center items-center">
        <div className="input input-primary input-bordered input-sm w-full lg:input-md"></div>
      </div>
      <div className="w-3/12 order-4 lg:w-2/12 bg-yellow-200 flex justify-center items-center lg:justify-center">
        <div className="btn btn-primary btn-xs lg:btn-sm">Sign In</div>
      </div>
    </header>
  );
}

export default Header;
