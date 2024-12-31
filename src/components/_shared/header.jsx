import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, Terminal, Server, Activity, Menu, X } from "lucide-react";
import { useUser } from "@/providers/user-provider";

const navigation = [
  { name: "Playground", href: "/dashboard", icon: Terminal },
  { name: "Deployments", href: "/dashboard/deployments", icon: Server },
  { name: "Monitoring", href: "/dashboard/monitoring", icon: Activity },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, loading } = useUser();
  const pathname = usePathname();
  const userDisplayName = loading ? "Loading..." : user?.name || "Guest";

  return (
    <div className="flex flex-col bg-white">
      <header className="h-12 border-b border-neutral-200">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg text-neutral-800">
            <Link href="/dashboard">
              <img
                src="/icon.png"
                alt="LmScale Logo"
                className="h-6 w-6 sm:h-7 sm:w-7 object-contain"
              />
            </Link>
            <span className="text-neutral-400 font-thin text-xl">|</span>
            <Link
              href="/dashboard/settings"
              className="ml-0.5 flex items-center justify-center text-normal size-7 border border-neutral-200 uppercase bg-neutral-50 font-light text-neutral-600"
            >
              {userDisplayName[0]}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="sm:hidden p-2"
            >
              {showMobileMenu ? (
                <X className="h-5 w-5 text-neutral-600" />
              ) : (
                <Menu className="h-5 w-5 text-neutral-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {showMobileMenu && (
        <div className="sm:hidden border-b border-neutral-200">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-2 px-4 py-3 text-sm transition-colors duration-200
                  ${
                    isActive
                      ? "bg-neutral-50 text-neutral-800 font-medium"
                      : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800"
                  }
                `}
                onClick={() => setShowMobileMenu(false)}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </div>
      )}

      <nav className="hidden sm:block h-12 border-b border-neutral-200 px-4">
        <div className="flex h-full relative">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  relative flex items-center gap-2 px-4 text-sm transition-colors duration-200
                  ${
                    isActive
                      ? "text-neutral-800 font-medium"
                      : "text-neutral-500 hover:text-neutral-800"
                  }
                `}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
                {isActive && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-800 transition-transform duration-200" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
