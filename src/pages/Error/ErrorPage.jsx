import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-error">404</h1>
        <p className="py-4 text-xl text-base-content">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <button className="btn btn-primary mt-4">Go Back Home</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
