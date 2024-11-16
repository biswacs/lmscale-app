"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="group relative text-sm text-white/70 hover:text-white transition-colors duration-200"
  >
    {children}
    <span className="absolute inset-x-0 -bottom-1 h-px scale-x-0 bg-gradient-to-r from-sky-400/40 to-sky-400 transition-transform duration-200 group-hover:scale-x-100" />
  </a>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { label: "Product", href: "/product" },
    { label: "Docs", href: "#" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div
          className={`relative mt-4 flex w-full items-center justify-between rounded-2xl border ${
            scrolled
              ? "border-white/10 bg-black/70 backdrop-blur-xl"
              : "border-white/5 bg-black/50 backdrop-blur-md"
          } p-3 transition-all duration-300`}
        >
          <div className="flex items-center gap-8 mx-2">
            <a
              href="/"
              className="group flex items-center text-2xl font-bold text-white font-space"
            >
              <span className="relative">
                Lm
                <span className="bg-sky-400 bg-clip-text text-transparent">
                  Scale.
                </span>
              </span>
            </a>

            <nav className="hidden md:block">
              <ul className="flex items-center gap-8">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <NavLink href={item.href}>{item.label}</NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="hidden items-center gap-4 md:flex mx-2">
            <a
              href="/login"
              className="group relative inline-flex items-center gap-1 rounded-full px-2 text-sm font-medium text-white transform transition-all duration-200 hover:scale-110"
            >
              <span>Login</span>
              <span className="absolute inset-x-0 -bottom-1 h-px scale-x-0 bg-gradient-to-r from-sky-400/40 to-sky-400 transition-transform duration-200 group-hover:scale-x-100" />
            </a>
            <a
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-1.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-sky-500"
            >
              Sign up
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center rounded-full p-2 text-white transition-colors duration-200 hover:bg-white/10 md:hidden"
          >
            <span className="sr-only">Toggle menu</span>
            {isMenuOpen ? (
              <X className="h-6 w-6 animate-in fade-in zoom-in" />
            ) : (
              <Menu className="h-6 w-6 animate-in fade-in zoom-in" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 top-[73px] z-50 transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex h-full flex-col">
          <div className="bg-black/60 backdrop-blur-md m-4 p-2 rounded-xl">
            <ul>
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center justify-start p-2 text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-white/10 pt-4">
              <a
                href="/login"
                className="flex w-full items-center justify-start p-2 text-white"
              >
                Login
              </a>
              <a
                href="/signup"
                className="flex w-full items-center justify-start p-2 text-white"
              >
                Sign up
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
