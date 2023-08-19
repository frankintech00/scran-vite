import { BiUser } from "react-icons/bi";

function ReadRecipeCreatorInfo({ photoURL, displayName, createdAt }) {
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
        <div className="text-lg">
          By{" "}
          <span className="underline font-semibold font-serif text-secondary">
            {displayName || "Anonymous"}
          </span>
        </div>
        <div>Published: {publishedDate}</div>
      </div>
    </div>
  );
}

export default ReadRecipeCreatorInfo;
