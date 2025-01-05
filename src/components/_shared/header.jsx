import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bot, MessageCircle } from "lucide-react";
import { useUser } from "@/providers/user-provider";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Bot },
  { name: "Chat", href: "/dashboard/chat", icon: MessageCircle },
];

export function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, loading } = useUser();
  const pathname = usePathname();
  const userDisplayName = loading ? "Loading..." : user?.name || "Guest";

  return (
    <nav className="w-full border-b border-neutral-200 bg-white">
      <div className="px-4">
        <div className="flex h-12 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <img
              src="/icon.png"
              alt="LmScale Logo"
              className="h-7 w-7 object-contain"
            />
            <span className="text-lg font-light text-neutral-800">LmScale</span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative  flex h-12 items-center gap-2 mx-1 px-3 text-sm transition-colors duration-200 font-light
                      ${
                        isActive
                          ? "text-neutral-900 border-b-2 border-neutral-600"
                          : "text-neutral-500 hover:text-neutral-800"
                      }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <Link
              href="/dashboard/profile"
              className="flex h-7 w-7 items-center justify-center border border-neutral-200 bg-neutral-50 text-sm uppercase text-neutral-600 hover:bg-neutral-100 transition-colors duration-200 font-light"
            >
              {userDisplayName[0]}
            </Link>
          </div>

          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 text-neutral-600 hover:bg-neutral-100 transition-colors duration-200 font-light"
            aria-label="Toggle mobile menu"
          >
            {showMobileMenu ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {showMobileMenu && (
          <div className="md:hidden py-2 border-t border-neutral-200">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-3 text-sm transition-colors duration-200 font-light
                    ${
                      isActive
                        ? "bg-neutral-50 text-neutral-900"
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
              href="/dashboard/profile"
              className="flex items-center gap-2 px-4 py-3 text-sm transition-colors duration-200 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800 font-light"
              onClick={() => setShowMobileMenu(false)}
            >
              <div className="uppercase flex h-7 w-7 items-center justify-center border border-neutral-200 bg-neutral-50 text-sm text-neutral-600 font-light">
                {userDisplayName[0]}
              </div>
              Profile
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
