import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProfileContainer() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    apiKey: "••••••••••••••••",
    webhookUrl: "https://api.example.com/webhook",
    notifications: true,
    logging: true,
  });

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute inset-0 overflow-y-auto">
        <div className="min-h-full pb-24">
          <div className="px-4 py-4">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl text-neutral-900">Profile</h1>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-neutral-200 text-sm  text-neutral-600 hover:text-neutral-900 hover:border-neutral-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
