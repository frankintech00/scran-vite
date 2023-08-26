import { Link } from "react-router-dom";
import Cat from "../assets/cat.jpg";

/**
 * Renders the Error Page component.
 *
 * @returns {JSX.Element} The Error Page component.
 */
const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-primary bg-opacity-5 text-center shadow-xl rounded-lg py-10">
      <h1 className="text-6xl font-bold text-warning">404</h1>
      <h2 className="text-4xl font-semibold mb-4">Och Aye! Page No' Found!</h2>
      <p className="text-xl mb-8">
        Ye've wandered aff the path, laddie. There's nae page here!
      </p>
      <img src={Cat} alt="Scary Cat" className="w-1/2 mb-8" />
      <Link to="/" className="text-2xl text-secondary hover:underline">
        Return tae the Hame Page
      </Link>
    </div>
  );
};

export default ErrorPage;
