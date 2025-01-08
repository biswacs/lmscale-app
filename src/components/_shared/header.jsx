import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bot, Plus } from "lucide-react";
import { useUser } from "@/providers/user-provider";
import { useQubits } from "@/providers/qubits-provider";

export function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, loading } = useUser();
  const pathname = usePathname();
  const { setIsCreateModalOpen } = useQubits();
  const userDisplayName = loading ? "Loading..." : user?.name || "User";
  const isQubitsPage = pathname === "/dashboard/qubits";

  const handleCreateQubit = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <nav className="w-full border-b border-neutral-100 bg-white">
      <div className="px-4">
        <div className="flex h-14 items-center justify-between">
          <Link href="/dashboard/qubits" className="flex items-center gap-2">
            <img
              src="/icon.png"
              alt="LmScale Logo"
              className="h-7 w-7 object-contain"
            />
            <span className="text-lg font-light text-neutral-800">LmScale</span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            {isQubitsPage && (
              <button
                onClick={handleCreateQubit}
                className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 
                          hover:bg-neutral-800 transition-colors text-sm"
              >
                <Plus className="h-4 w-4" />
                New Qubit
              </button>
            )}
            <div className="flex items-center">
              <Link
                href="/dashboard/qubits"
                className="relative flex h-14 items-center gap-2 mx-1 px-3 text-sm font-light"
              >
                <Bot className="h-4 w-4" />
                <span>Qubits</span>
              </Link>
            </div>
            <Link
              href="/dashboard/profile"
              className="flex h-7 w-7 items-center justify-center border border-neutral-100 bg-neutral-50 text-sm uppercase text-neutral-600 hover:bg-neutral-100 transition-colors duration-200 font-light"
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
          <div className="md:hidden py-2 border-t border-neutral-100">
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
            {isQubitsPage && (
              <button
                onClick={() => {
                  handleCreateQubit();
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800 font-light"
              >
                <Plus className="h-4 w-4" />
                New Qubit
              </button>
            )}
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2 px-4 py-3 text-sm transition-colors duration-200 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800 font-light"
              onClick={() => setShowMobileMenu(false)}
            >
              <div className="uppercase flex h-7 w-7 items-center justify-center border border-neutral-100 bg-neutral-50 text-sm text-neutral-600 font-light">
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
