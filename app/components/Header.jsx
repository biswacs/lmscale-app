import React from "react";

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-4 z-50 mx-auto w-full max-w-7xl px-4">
      <div className="relative flex w-full items-center justify-between rounded-2xl border border-white/10 bg-black/50 p-3 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <a href="/" className="text-2xl font-bold text-white font-space">
            LmCloud<span className="text-primary-400">.</span>
          </a>
        </div>
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            <li>
              <a
                href="#features"
                className="text-sm text-white/70 hover:text-white transition"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="text-sm text-white/70 hover:text-white transition"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#docs"
                className="text-sm text-white/70 hover:text-white transition"
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-sm text-white/70 hover:text-white transition"
              >
                About
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <a
            href="/login"
            className="hidden md:inline-flex rounded-full px-4 py-1.5 text-sm font-medium text-white hover:text-primary-400 transition"
          >
            Login
          </a>
          <a
            href="/signup"
            className="inline-flex rounded-full bg-primary-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-primary-600 transition"
          >
            Get Started
          </a>
        </div>
        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-white md:hidden"
        >
          <span className="sr-only">Open menu</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
