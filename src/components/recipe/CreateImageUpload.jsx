import { useState } from "react";

/**
 * CreateImageUpload Component
 *
 * This component provides an input for uploading an image
 * for a recipe. It also shows a thumbnail preview of the selected image.
 *
 * @param {Object} props - The component properties.
 * @param {Function} props.onImageChange - Function to call when an image is selected.
 * @returns {JSX.Element} The CreateImageUpload component.
 */
function CreateImageUpload({ onImageChange }) {
  // State to hold the selected image file
  const [image, setImage] = useState(null);
  // State to hold the thumbnail URL
  const [thumbUrl, setThumbUrl] = useState("");

  /**
   * Handles changes to the image input field.
   *
   * @param {Event} e - The change event for the input field.
   * @returns {void}
   */
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
      {/* Label and File Input for Recipe Image */}
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

      {/* Thumbnail Preview */}
      {thumbUrl && (
        <img
          src={thumbUrl}
          alt="Thumbnail Preview"
          height="200" // Updated height for a better preview
          className="my-4 rounded-xl shadow-xl"
        />
      )}
    </div>
  );
}

export default CreateImageUpload;
