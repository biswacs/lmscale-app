import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Server, Menu, X } from "lucide-react";
import { useUser } from "@/providers/user-provider";

const navigation = [
  { name: "Playground", href: "/dashboard", icon: Terminal },
  { name: "Deployments", href: "/dashboard/deployments", icon: Server },
];

export function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, loading } = useUser();
  const pathname = usePathname();
  const userDisplayName = loading ? "Loading..." : user?.name || "Guest";

  return (
    <nav className="w-full border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-12 items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center gap-2">
              <img
                src="/icon.png"
                alt="LmScale Logo"
                className="h-7 w-7 object-contain"
              />
              <span className="text-lg font-light text-neutral-800">
                LmScale
              </span>
            </Link>
          </div>

          <div className="hidden md:flex">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex h-12 items-center gap-2 px-4 text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-neutral-800 font-medium"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-800" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center">
            <Link
              href="/dashboard/settings"
              className="hidden md:flex h-7 w-7 items-center justify-center border border-neutral-200 bg-neutral-50 text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition-colors duration-200"
            >
              {userDisplayName[0]}
            </Link>

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-neutral-600 hover:bg-neutral-100 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {showMobileMenu ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="md:hidden py-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-3 text-sm transition-colors duration-200 ${
                    isActive
                      ? "bg-neutral-100 text-neutral-800 font-medium"
                      : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800"
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 px-4 py-3 text-sm transition-colors duration-200 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800"
              onClick={() => setShowMobileMenu(false)}
            >
              <div className="flex h-4 w-4 items-center justify-center text-xs">
                {userDisplayName[0]}
              </div>
              Profile Settings
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
