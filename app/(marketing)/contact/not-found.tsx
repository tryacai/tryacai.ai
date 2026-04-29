import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-2xl md:text-3xl font-semibold text-zinc-100 mb-4">
        Page not found
      </h1>
      <p className="text-zinc-400 mb-6 max-w-md">
        The page you’re looking for doesn’t exist. You can return home to continue.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-lg text-white bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 shadow-lg hover:shadow-xl transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
