import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

/**
 * Renders an error message if an error exists in the UserContext.
 *
 * @returns {JSX.Element} The ErrorMessage component.
 */
function ErrorMessage() {
  const { error } = useContext(UserContext);
  return <>{error && <p className="my-5 text-error">{error}</p>} </>;
}

export default ErrorMessage;
