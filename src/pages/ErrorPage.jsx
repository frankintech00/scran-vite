import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex flex-col justify-center items-center ">
      <h1 className="text-8xl font-bold text-warning">404</h1>
      <p className="text-4xl text-gray-700 mb-4">Page not found</p>
      <Link to="/" className="text-blue-500 hover:underline text-2xl">
        Back to home
      </Link>
    </div>
  );
}

export default ErrorPage;
