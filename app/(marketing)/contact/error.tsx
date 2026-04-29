"use client";

import Link from "next/link";

export default function Error({ reset }: { reset?: () => void }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-2xl md:text-3xl font-semibold text-zinc-100 mb-4">
        Something went wrong
      </h1>
      <p className="text-zinc-400 mb-6 max-w-md">
        We hit a snag loading this page. You can try again or head back home.
      </p>
      <div className="flex gap-3">
        {reset && (
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 transition"
          >
            Try Again
          </button>
        )}
        <Link
          href="/"
          className="px-6 py-3 rounded-lg text-white bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 shadow-lg hover:shadow-xl transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
