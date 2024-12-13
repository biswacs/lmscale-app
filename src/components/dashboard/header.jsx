import { useState } from "react";
import Link from "next/link";
import { LogOut, Settings, Box } from "lucide-react";
import { useAuthentication } from "@/providers/authentication-provider";
import { useUser } from "@/providers/user-provider";

export function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { logOutUser } = useAuthentication();
  const { user, loading } = useUser();

  const userDisplayName = loading ? "Loading..." : user?.name || "Guest";

  const menuItems = [
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
    },
    {
      label: "Deployments",
      icon: Box,
      href: "/deployments",
    },
  ];

  const handleClickOutside = () => {
    setShowDropdown(false);
  };

  return (
    <div className="w-full h-14 bg-white border-b border-neutral-200 px-4">
      <div className="h-full flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-neutral-800"
        >
          <img
            src="/icon.png"
            alt="LmScale Logo"
            className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
          />
          <span className="font-light">LmScale</span>
        </Link>

        <div className="items-center">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="border border-neutral-200 size-8 flex items-center justify-center rounded-full hover:bg-neutral-50 transition-colors duration-200 text-sm font-medium text-neutral-600 uppercase"
            >
              {userDisplayName?.[0] || "?"}
            </button>

            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={handleClickOutside}
                />
                <div className="absolute right-0 mt-4 w-56 bg-white rounded-md shadow-lg border border-neutral-200 z-20">
                  <div className="py-1">
                    {menuItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    ))}
                    <hr className="my-1 border-neutral-200" />
                    <button
                      onClick={logOutUser}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-neutral-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
