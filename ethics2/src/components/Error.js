import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="w-[95%] mx-auto h-[82%] mt-[30px] bg-white flex justify-center items-center">
      <div className="text-center">
        <p className="text-3xl font-semibold text-[#0C73B8]">404</p>
        <p className="mt-4 text-3xl font-bold tracking-tight text-[#0C73B8] sm:text-5xl">
          Page not found
        </p>
        <p className="mt-6 text-xl leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-[#0C73B8] px-4 py-2 text-sm font-semibold text-white border border-[#0C73B8] hover:bg-transparent hover:text-[#0C73B8] transition duration-500"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error;
