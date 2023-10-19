import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(UserContext);
 if (loading) {
    return null;
  }
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}


export default ProtectedRoute;
