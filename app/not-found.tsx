"use client";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      {/* Illustration */}
      <div className="mb-8">
        <Image
          src="/assets/404 page.svg"
          alt="404 Not Found"
          width={300}
          height={300}
          className="animate-fadeIn h-20 w-20"
        />
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold text-gray-800 mb-4">
        Oops! Page Not Found
      </h1>

      {/* Description */}
      <p className="text-gray-600 text-lg max-w-md">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
