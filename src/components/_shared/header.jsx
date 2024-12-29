import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, Terminal, Server, Activity } from "lucide-react";
import { useUser } from "@/providers/user-provider";

const navigation = [
  { name: "Playground", href: "/dashboard", icon: Terminal },
  { name: "Deployments", href: "/dashboard/deployments", icon: Server },
  { name: "Monitoring", href: "/dashboard/monitoring", icon: Activity },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, loading } = useUser();
  const pathname = usePathname();
  const userDisplayName = loading ? "Loading..." : user?.name || "Guest";

  return (
    <div className="flex flex-col bg-white">
      <header className="h-12 border-b border-neutral-200">
        <div className="h-full px-4 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 text-lg text-neutral-800"
          >
            <img
              src="/icon.png"
              alt="LmScale Logo"
              className="h-7 w-7 object-contain"
            />
            <span className="font-light tracking-tight">LmScale</span>
          </Link>
          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center h-8 w-8 border border-neutral-200 hover:bg-neutral-50"
              >
                <div className="w-full h-full flex items-center justify-center bg-neutral-100 text-sm font-medium text-neutral-700 uppercase">
                  {userDisplayName[0]}
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="h-12 border-b border-neutral-200 px-4">
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
