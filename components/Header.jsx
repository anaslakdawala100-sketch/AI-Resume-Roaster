import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link href="/">
          <h1 className="text-2xl font-bold cursor-pointer">
            AI Resume Roaster
          </h1>
        </Link>

        <nav className="flex gap-6">
          <Link
            href="/"
            className="hover:text-gray-200 transition"
          >
            Home
          </Link>

          <Link
            href="/upload"
            className="hover:text-gray-200 transition"
          >
            Upload
          </Link>
        </nav>

      </div>
    </header>
  );
}