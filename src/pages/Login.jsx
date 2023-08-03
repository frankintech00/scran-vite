import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, signInWithGoogle, error } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center h-screen mt-10 text-primary">
      <div className="w-full max-w-md p-6 lg:max-w-xl rounded-lg shadow-2xl bg-primary bg-opacity-5">
        <h1 className="mb-6 text-3xl font-semibold text-center">
          Sign in to your account.
        </h1>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="label">
              <span className="text-primary text-lg label-text">Email</span>
            </label>
            <input
              required
              type="email"
              placeholder="Email Address"
              className="w-full input input-bordered input-primary"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-primary text-lg label-text">Password</span>
            </label>
            <input
              required
              type="password"
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
            {error && <p className="my-5 text-error">{error}</p>}{" "}
            <button
              type="button"
              className="shadow-md btn btn-block btn-primary"
              onClick={() => signIn(email, password)}
            >
              Sign In.
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-block bg-white text-[#4285F4] flex items-center justify-center shadow-md"
              onClick={() => signInWithGoogle()}
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
    </div>
  );
}

export default LoginPage;
