import { useState } from "react";

function CreateImageUpload({ onImageChange }) {
  const [image, setImage] = useState(null);
  const [thumbUrl, setThumbUrl] = useState("");

  function handleImageChange(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);

      // To preview the image
      const url = URL.createObjectURL(e.target.files[0]);
      setThumbUrl(url);
    }

    // Call the parent's onImageChange function to update the parent's state
    onImageChange(e.target.files[0]);
  }

  return (
    <div>
      <label className="label" htmlFor="recipeImage">
        <span className="text-base label-text">Recipe Image</span>
      </label>
      <input
        role="file-input"
        className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs"
        type="file"
        id="recipeImage"
        name="recipeImage"
        onChange={handleImageChange}
      />
      {thumbUrl && (
        <img
          src={thumbUrl}
          alt="Thumbnail Preview"
          height="20"
          className="my-4 rounded-xl shadow-xl"
        />
      )}
    </div>
  );
}

export default CreateImageUpload;
