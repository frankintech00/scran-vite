/**
 * Component for updating user profile.
 * @component
 */
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { ErrorMessage, Loading } from "..";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [thumbUrl, setThumbUrl] = useState("");
  const [image, setImage] = useState(null);

  const { createUser, signInWithGoogle, error, loading } =
    useContext(UserContext);
  const [displayName, setDisplayName] = useState("");

  /**
   * Handles the change event of the profile picture input.
   * @param {object} e - The event object.
   */
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setThumbUrl(url);
    }
  };

  /**
   * Handles the creation of a new user account.
   */
  const handleCreateUser = () => {
    createUser(email, password, displayName, confirmPassword, image);
  };

  /**
   * Handles the sign in with Google.
   */
  const handleSignInWithGoogle = () => {
    signInWithGoogle();
  };

  return (
    <div className="flex flex-col items-center h-screen mt-10 text-primary">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full max-w-md p-6 rounded-lg shadow-2xl lg:max-w-xl">
          <h1 className="mb-6 text-3xl font-semibold text-center">
            Create an Account
          </h1>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="label" htmlFor="profilePicture">
                <span className="text-primary text-lg">Profile Picture</span>
              </label>
              <input
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                type="file"
                id="profilePicture"
                name="profilePicture"
                onChange={handleImageChange}
              />
            </div>
            {thumbUrl && (
              <img src={thumbUrl} alt="Thumbnail Preview" height="20" />
            )}
            <div>
              <label className="label" htmlFor="displayName">
                <span className="text-primary text-lg">Display Name</span>
              </label>
              <input
                required
                type="text"
                id="displayName"
                name="displayName"
                placeholder="Display Name"
                className="w-full input input-bordered input-primary"
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div>
              <label className="label" htmlFor="email">
                <span className="text-primary text-lg">Email</span>
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
              <label className="label" htmlFor="password">
                <span className="text-primary text-lg">Password</span>
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
              <input
                required
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full input input-bordered input-primary"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <ErrorMessage />
              <button
                type="button"
                className="flex items-center justify-center shadow-md btn btn-block btn-primary"
                onClick={handleCreateUser}
              >
                Create Account
              </button>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-block bg-white text-[#4285F4] flex items-center justify-center shadow-md"
                onClick={handleSignInWithGoogle}
              >
                <FcGoogle className="mr-2" />
                Continue with Google
              </button>
            </div>
            <p className="py-2 my-2 text-right">
              Already have an account?{" "}
              <Link to="/sign-in" className="underline link-accent">
                Sign in.
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUp;
