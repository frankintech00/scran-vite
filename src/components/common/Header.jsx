import { Logo } from "../../components";

function Header() {
  return (
    <header className=" w-full fixed inset-x-0 top-0 z-50  flex flex-wrap justify-around  bg-white shadow">
      <div className="w-9/12 order-2 md:w-2/12 md:order-1 p-4 bg-red-200">
        Logo
      </div>
      <div className="w-3/12 order-1 md:hidden md:w-5/12 md:order-2 p-4 bg-blue-200">
        Dropdown Menu
      </div>
      <div className=" hidden w-3/12 order-1 md:block md:w-5/12 md:order-2 p-4 bg-blue-200">
        Menu
      </div>
      <div className="w-9/12 order-3 md:w-3/12 p-4 bg-green-200">Search</div>
      <div className="w-3/12 order-4 md:w-2/12 p-4 bg-yellow-200">Button</div>
    </header>
  );
}

export default Header;
