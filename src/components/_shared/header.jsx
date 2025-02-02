import Link from "next/link";
import { useAuthentication } from "@/providers/authentication-provider";

export function Header() {
  const { user, loading } = useAuthentication();
  const userDisplayName = (
    loading ? "Loading..." : user?.name || "User"
  ).toUpperCase();

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

          <div className="flex items-center gap-4">
            <Link
              href="/docs"
              className="text-sm text-neutral-600 hover:text-neutral-800 transition-colors duration-200"
            >
              Docs
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex size-7 items-center justify-center bg-neutral-900 border border-neutral-900 text-white text-sm uppercase transition-colors duration-200 font-light hover:bg-neutral-800"
            >
              {userDisplayName[0]}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
