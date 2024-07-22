import Link from "next/link";

const MobileNavBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg sm:hidden">
      <div className="flex justify-around py-2">
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-700 flex flex-col items-center"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M13 5v14m-4 0h8"
            />
          </svg>
          <span className="text-xs">Home</span>
        </Link>
        <Link
          href="/admin"
          className="text-gray-500 hover:text-gray-700 flex flex-col items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 14l9 5-9-5-9 5V5a2 2 0 012-2h14a2 2 0 012 2z"
            />
          </svg>
          <span className="text-xs">Admin</span>
        </Link>
        <Link
          href="/blockpick"
          className="text-gray-500 hover:text-gray-700 flex flex-col items-center"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4m0 4v4m0 4v4M19 3v4m0 4v4m0 4v4M12 5v14m4-10h-8m4 4h-8"
            />
          </svg>
          <span className="text-xs">Blockpick</span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNavBar;
