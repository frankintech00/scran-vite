import { BiUser } from "react-icons/bi";

/**
 * ReadRecipeCreatorInfo Component.
 *
 * This component displays the creator's information along with the date of creation.
 *
 * @param {Object} props - Component properties.
 * @param {string|null} props.photoURL - The URL of the creator's profile photo.
 * @param {string|null} props.displayName - The display name of the creator.
 * @param {Object} props.createdAt - A Firebase timestamp object representing the date of creation.
 * @returns {JSX.Element} The ReadRecipeCreatorInfo component.
 */
function ReadRecipeCreatorInfo({ photoURL, displayName, createdAt }) {
  // Convert the Firebase timestamp to a readable string format
  const publishedDate = createdAt
    .toDate()
    .toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .replace(/,/g, "");

  return (
    <div className="flex items-center md:w-1/2">
      {/* Display profile photo or a default icon */}
      {photoURL ? (
        <img
          src={photoURL}
          alt="User profile"
          className="mr-4 rounded-full w-16 h-16"
        />
      ) : (
        <div className="mr-4 rounded-full w-16 h-16">
          <BiUser size={62} className="text-accent" />
        </div>
      )}

      <div className="flex flex-col">
        {/* Display the creator's name */}
        <div className="text-lg">
          By{" "}
          <span className="underline font-semibold font-serif text-secondary">
            {displayName || "Anonymous"}
          </span>
        </div>
        {/* Display the date of creation */}
        <div>Published: {publishedDate}</div>
      </div>
    </div>
  );
}

export default ReadRecipeCreatorInfo;
