import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

function SignInDropdown() {
  const { signInWithGoogle } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="dropdown dropdown-end" data-testid="signInDropdown">
      <button
        tabIndex={0}
        className="btn btn-primary btn-block md:btn-sm btn-xs"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-xs md:text-base">Sign In</p>
      </button>
      {isOpen && (
        <div className="my-3 z-[1] p-6 shadow-xl dropdown-content rounded-box w-72 bg-base-100">
          <div className="flex flex-col justify-center space-y-3">
            <h1 className="text-xl font-bold text-primary">Registered Users</h1>
            <p className="text-md">Have an account? Sign in now.</p>
            <Link to="/sign-in" onClick={handleLinkClick}>
              <p className="text-lg text-accent link">Sign In</p>
            </Link>
          </div>
          <div className="my-2 divider"></div>
          <div className="flex flex-col justify-center space-y-3">
            <h1 className="text-xl font-bold text-primary">New User</h1>
            <p className="text-md">
              New to Scran? Create an account to get started today.
            </p>
            <Link to="/sign-up" onClick={handleLinkClick}>
              <p className="text-lg text-accent link">Create an Account</p>
            </Link>
          </div>
          <div className="my-2 divider"></div>
          <button
            className="btn btn-block bg-white text-[#4285F4] flex items-center justify-center shadow-md"
            onClick={signInWithGoogle}
          >
            <FcGoogle className="mr-2" />
            Continue with Google
          </button>
        </div>
      )}
    </div>
  );
}

export default SignInDropdown;
