"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      setIsVisible(
        currentScrollY <= lastScrollY ||
          currentScrollY < 50 ||
          currentScrollY + window.innerHeight >=
            document.documentElement.scrollHeight
      );

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div
          className={`w-full transition-all duration-300 ${
            scrolled || isMenuOpen
              ? "bg-white/80 backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          <div className="mx-auto max-w-full">
            <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex items-center">
                <a
                  href="/"
                  className="group flex items-center gap-2 text-xl sm:text-2xl font-bold text-neutral-800"
                >
                  <img
                    src="/icon.png"
                    alt="LmScale Logo"
                    className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
                  />
                  <div className="font-light">LmScale</div>
                </a>
              </div>

              <div className="hidden lg:flex items-center space-x-6">
                <nav>
                  <ul className="flex items-center space-x-6">
                    <li>
                      <a
                        href="#"
                        className="text-sm font-medium text-neutral-600 hover:text-neutral-800 transition-colors duration-200"
                      >
                        Product
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm font-medium text-neutral-600 hover:text-neutral-800 transition-colors duration-200"
                      >
                        Docs
                      </a>
                    </li>
                  </ul>
                </nav>

                <a
                  href="/login"
                  className="group relative inline-flex items-center justify-center overflow-hidden p-0.5 transition-all duration-300 hover:bg-neutral-800 border border-neutral-200"
                >
                  <span className="inline-flex h-full w-full items-center justify-center px-4 py-1 text-sm font-medium text-neutral-800 transition-all duration-300">
                    Login
                  </span>
                </a>
                <a
                  href="/signup"
                  className="group relative inline-flex items-center justify-center overflow-hidden bg-neutral-800 p-0.5 transition-all duration-300 hover:bg-neutral-800"
                >
                  <span className="inline-flex h-full w-full items-center justify-center px-4 py-1 text-sm font-medium text-white transition-all duration-300">
                    Sign up
                  </span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 text-neutral-600 transition-colors duration-200 hover:bg-neutral-100 lg:hidden"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-white/90 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full pt-20 overflow-y-auto">
          <div className="px-4 py-6">
            <nav className="flex flex-col space-y-1">
              <a
                href="#"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 text-sm font-medium text-neutral-600 transition-colors duration-200 hover:bg-neutral-50 hover:text-neutral-800"
              >
                Product
              </a>
              <a
                href="#"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 text-sm font-medium text-neutral-600 transition-colors duration-200 hover:bg-neutral-50 hover:text-neutral-800"
              >
                Docs
              </a>
              <a
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-4 py-3 text-sm font-medium text-neutral-600 transition-colors duration-200 hover:bg-neutral-50 hover:text-neutral-800"
              >
                Login
              </a>
              <a
                href="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-4 py-3 text-sm font-medium text-neutral-800 transition-colors duration-200 hover:bg-neutral-50"
              >
                Sign up
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
