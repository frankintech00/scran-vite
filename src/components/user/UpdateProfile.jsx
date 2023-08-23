import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const UpdateProfile = () => {
  const { user, updateUser, error } = useContext(UserContext);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [image, setImage] = useState(null);
  const [thumbUrl, setThumbUrl] = useState(user.photoURL);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);

      // To preview the image
      const url = URL.createObjectURL(e.target.files[0]);
      setThumbUrl(url);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen mt-10 text-primary">
      <div className="w-full max-w-md p-6 rounded-lg shadow-2xl  lg:max-w-xl">
        <h1 className="mb-6 text-3xl font-semibold text-center">
          Edit Profile
        </h1>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col items-center space-y-6">
            <div className="avatar">
              <div className="avatar rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={thumbUrl} alt="Profile" height="20" />
              </div>
            </div>
            <label className="label" htmlFor="profilePicture">
              <span className="text-primary text-lg">
                Choose a new profile picture
              </span>
            </label>
            <input
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={handleImageChange}
            />
          </div>
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
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div>
            <p className="text-red-700 mb-4 text-lg">{user.email}</p>
            <h3 className="text-primary">
              You can't change the e-mail address you signed up with.
            </h3>
          </div>
          <div>
            <h3 className="text-primary mb-2">
              If you want to change your password, click the link below.
            </h3>
            <Link to="/forgot-password" className="underline link-accent">
              Change your password
            </Link>
          </div>
          <div>
            {error && <p className="my-5 text-error">{error}</p>}{" "}
            <button
              type="button"
              className="flex items-center justify-center shadow-md btn btn-block btn-primary"
              onClick={() => updateUser(displayName, image)}
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
