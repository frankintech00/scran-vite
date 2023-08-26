import logo from "../../assets/logo.png";

/**
 * Renders the logo image.
 *
 * @param {string} className - The CSS class name for styling the logo.
 * @returns {JSX.Element} The logo image component.
 */
function Logo({ className }) {
  return <img src={logo} alt="Scarn logo" className={className} />;
}

export default Logo;
