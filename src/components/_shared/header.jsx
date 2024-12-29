import { useState } from "react";
import Link from "next/link";
import { LogOut, Settings, Box, Bell } from "lucide-react";
import { useAuthentication } from "@/providers/authentication-provider";
import { useUser } from "@/providers/user-provider";

export function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { logOutUser } = useAuthentication();
  const { user, loading } = useUser();

  const userDisplayName = loading ? "Loading..." : user?.name || "Guest";

  const menuItems = [
    {
      label: "Profile",
      icon: Settings,
      href: "/dashboard/profile",
    },
    {
      label: "Deployments",
      icon: Box,
      href: "/dashboard/deployments",
    },
  ];

  const handleClickOutside = () => {
    setShowDropdown(false);
  };

  return (
    <header className="h-14 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-full items-center justify-between px-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-xl font-bold text-neutral-800"
        >
          <img
            src="/icon.png"
            alt="LmScale Logo"
            className="h-8 w-8 object-contain"
          />
          <span className="font-light">LmScale</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50"
            >
              <div className="size-6 flex items-center justify-center rounded-full bg-neutral-100 text-xs font-medium uppercase">
                {userDisplayName[0]}
              </div>
              <span>{userDisplayName}</span>
            </button>

            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={handleClickOutside}
                />
                <div className="absolute right-0 mt-2 w-56 rounded-md border border-neutral-200 bg-white shadow-lg z-20">
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
    </header>
  );
}
