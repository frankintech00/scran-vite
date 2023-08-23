import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function ErrorMessage() {
  const { error } = useContext(UserContext);
  return <>{error && <p className="my-5 text-error">{error}</p>} </>;
}

export default ErrorMessage;
