import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bot } from "lucide-react";
import { useUser } from "@/providers/user-provider";

const navigation = [
  { name: "Assistants", href: "/dashboard/assistants", icon: Bot },
];

export function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, loading } = useUser();
  const pathname = usePathname();
  const userDisplayName = (
    loading ? "Loading..." : user?.name || "User"
  ).toUpperCase();
  const isAssistantsPage = pathname === "/dashboard/assistants";

  return (
    <nav className="w-full border-b border-neutral-100 bg-white">
      <div className="px-4">
        <div className="flex h-12 items-center justify-between text-neutral-800">
          <Link
            href="/dashboard/assistants"
            className="flex items-center gap-2"
          >
            <img
              src="/icon.png"
              alt="LmScale Logo"
              className="size-7 object-contain"
            />
            <span className="text-md font-light">LmScale</span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center">
              <Link
                href="/dashboard/assistants"
                className={`relative flex h-12 items-center gap-2 mx-1 px-3 text-sm font-light
                  ${isAssistantsPage ? "border-b-2 border-neutral-900" : ""}`}
              >
                <Bot className="h-4 w-4" />
                <span>Assistants</span>
              </Link>
            </div>
            <Link
              href="/dashboard/profile"
              className="flex size-7 items-center justify-center border border-neutral-100 bg-neutral-50 text-sm uppercase text-neutral-600 hover:bg-neutral-100 transition-colors duration-200 font-light"
            >
              {userDisplayName[0]}
            </Link>
          </div>

          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-1.5 text-neutral-600 hover:bg-neutral-100 transition-colors duration-200 font-light rounded"
            aria-label="Toggle mobile menu"
          >
            {showMobileMenu ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>

        {showMobileMenu && (
          <div className="md:hidden py-1.5 border-t border-neutral-100">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors duration-200 font-light
                    ${
                      isActive
                        ? "bg-neutral-50 text-neutral-900"
                        : "text-neutral-500 hover:bg-neutral-50 hover"
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
              className="flex items-center gap-2 px-4 py-2.5 text-sm transition-colors duration-200 text-neutral-500 hover:bg-neutral-50 hover font-light"
              onClick={() => setShowMobileMenu(false)}
            >
              <div className="uppercase flex h-6 w-6 items-center justify-center border border-neutral-100 bg-neutral-50 text-sm text-neutral-600 font-light">
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
