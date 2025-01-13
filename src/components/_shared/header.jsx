import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/providers/user-provider";

export function Header() {
  const { user, loading } = useUser();
  const pathname = usePathname();
  const userDisplayName = (
    loading ? "Loading..." : user?.name || "User"
  ).toUpperCase();

  const isSettingsPage = pathname === "/dashboard/settings";

  return (
    <nav className="w-full border-b border-neutral-200 bg-white">
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

          <Link
            href="/dashboard/settings"
            className={`flex size-7 items-center justify-center border text-sm uppercase transition-colors duration-200 font-light
              ${
                isSettingsPage
                  ? "bg-neutral-900 border-neutral-900 text-white"
                  : "border-neutral-100 bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
              }`}
          >
            {userDisplayName[0]}
          </Link>
        </div>
      </div>
    </nav>
  );
}
