import React from "react";
import { Link } from "react-router-dom"; 

const ErrorPage: React.FC = () => {
  return (
    <div className="flex justify-center items-start pt-60 h-screen bg-gray-100">
      <div className="error-container text-center bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">Oops, something went wrong!</h1>
        <p className="text-lg mb-4">
          We encountered an error while processing your request.
        </p>
        <p className="text-lg mb-4">
          Please try again later or contact support if the problem persists.
        </p>
        <Link
          to="/"
          className="btn btn-primary inline-block px-6 py-3 rounded bg-blue-500 text-white border border-blue-500 hover:bg-blue-600 hover:border-blue-600"
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
