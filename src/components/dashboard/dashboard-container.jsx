import { useUser } from "@/providers/user-provider";
import { Header } from "./header";

export function DashboardContainer() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-light text-neutral-900">
            Welcome to LmScale
          </h1>
          {user && (
            <p className="text-md font-light text-neutral-900">
              Hello {user.name}, We are coming very soon.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
