import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { Loading } from "..";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [thumbUrl, setThumbUrl] = useState("");
  const [image, setImage] = useState(null);

  const { createUser, signInWithGoogle, error, loading } =
    useContext(UserContext);
  const [displayName, setDisplayName] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setThumbUrl(url);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen mt-10 text-primary">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full max-w-md p-6 rounded-lg shadow-2xl bg-primary bg-opacity-5 lg:max-w-xl">
          <h1 className="mb-6 text-3xl font-semibold text-center">
            Create an Account
          </h1>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="label">
                <span className="text-base label-text">Proifile Picture</span>
              </label>
              <input
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                type="file"
                onChange={handleImageChange}
              />
            </div>
            {thumbUrl && (
              <img src={thumbUrl} alt="Thumbnail Preview" height="20" />
            )}
            <div>
              <label className="label">
                <span className="text-primary text-lg">Display Name</span>
              </label>
              <input
                required
                type="text"
                placeholder="Display Name"
                className="w-full input input-bordered input-primary"
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div>
              <label className="label">
                <span className="text-primary text-lg">Email</span>
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
                <span className="text-primary text-lg">Password</span>
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
              <input
                required
                type="password"
                placeholder="Confirm Password"
                className="w-full input input-bordered input-primary"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              {error && <p className="my-5 text-error">{error}</p>}{" "}
              <button
                type="button"
                className="flex items-center justify-center shadow-md btn btn-block btn-primary"
                onClick={() =>
                  createUser(
                    email,
                    password,
                    displayName,
                    confirmPassword,
                    image
                  )
                }
              >
                Create an Account
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
