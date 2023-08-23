import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { ErrorMessage, Loading } from "..";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, signInWithGoogle, error, loading } = useContext(UserContext);

  const handleSignIn = () => {
    signIn(email, password);
  };

  const handleSignInWithGoogle = () => {
    signInWithGoogle();
  };

  return (
    <div className="flex flex-col items-center h-screen mt-10 text-primary">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full max-w-md p-6 lg:max-w-xl rounded-lg shadow-2xl ">
          <h1 className="mb-6 text-3xl font-semibold text-center">
            Sign in to your account.
          </h1>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="email" className="label">
                <span className="text-primary text-lg label-text">Email</span>
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                className="w-full input input-bordered input-primary"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="label">
                <span className="text-primary text-lg label-text">
                  Password
                </span>
              </label>
              <input
                required
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="w-full input input-bordered input-primary"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Link to="/forgot-password" className="text-sm text-accent">
                Forgotten your password?
              </Link>
            </div>
            <div>
              <ErrorMessage />
              <button
                type="button"
                data-testid="signInButton"
                className="shadow-md btn btn-block btn-primary"
                onClick={handleSignIn}
              >
                Sign In.
              </button>
            </div>
            <div>
              <button
                type="button"
                data-testid="signInWithGoogleButton"
                className="btn btn-block bg-white text-[#4285F4] flex items-center justify-center shadow-md"
                onClick={handleSignInWithGoogle}
              >
                <FcGoogle className="mr-2" />
                Continue with Google
              </button>
            </div>
            <p className="py-2 my-2 text-right">
              New to Scran?{" "}
              <Link to="/sign-up" className="text-accent underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

export default SignIn;
