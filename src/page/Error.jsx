import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-lg text-gray-700 mt-2">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;
