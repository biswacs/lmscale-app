import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
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
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header>
      <div
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
                <Link
                  href="/"
                  className="group flex items-center gap-2 text-xl sm:text-2xl text-neutral-800"
                >
                  <img
                    src="/icon.png"
                    alt="LmScale Logo"
                    className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
                  />
                  <div className="font-light">LmScale</div>
                </Link>
              </div>

              <div className="hidden lg:flex items-center space-x-6">
                <nav>
                  <ul className="flex items-center space-x-6">
                    {[{ href: "/docs", text: "Docs" }].map((item) => (
                      <li key={item.text}>
                        <Link
                          href={item.href}
                          className="text-sm text-neutral-600 hover:text-neutral-800 transition-colors duration-200"
                        >
                          {item.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <Link
                  href="/login"
                  className="group relative inline-flex items-center justify-center overflow-hidden bg-neutral-800 p-0.5 transition-all duration-300 hover:bg-neutral-950"
                >
                  <span className="inline-flex h-full w-full items-center justify-center px-4 py-1.5 md:px-6 text-sm md:text-base text-white transition-all duration-300">
                    Login
                  </span>
                </Link>
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
      </div>

      <div
        className={`fixed inset-0 z-40 bg-white/90 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full pt-20 overflow-y-auto">
          <div className="px-4 py-6">
            <nav className="flex flex-col space-y-1">
              {[
                { href: "/docs", text: "Docs" },
                { href: "/login", text: "Login" },
              ].map((item) => (
                <Link
                  key={item.text}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group relative flex items-center justify-between px-4 py-3 text-sm text-neutral-600 transition-all duration-300 hover:text-neutral-800"
                >
                  <span className="relative">
                    {item.text}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px w-0 bg-neutral-800 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
