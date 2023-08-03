import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Logo() {
  return (
    <Link to="/">
      <img src={logo} alt=" Scarn logo" className="w-44" />
    </Link>
  );
}

export default Logo;
