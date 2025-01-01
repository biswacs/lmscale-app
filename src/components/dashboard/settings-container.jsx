import { useState } from "react";
import { useRouter } from "next/navigation";

export function SettingsContainer() {
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
                <h1 className="text-2xl font-semibold text-neutral-900">
                  Settings
                </h1>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-neutral-200 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:border-neutral-300"
                >
                  Logout
                </button>
              </div>

              <div className="bg-white border border-neutral-200">
                <div className="px-4 py-5 border-b border-neutral-200">
                  <h2 className="text-lg font-medium text-neutral-900">
                    API Configuration
                  </h2>
                  <p className="mt-1 text-sm text-neutral-500">
                    Manage your API settings and credentials
                  </p>
                </div>

                <div className="p-4 space-y-4">
                  <div className="max-w-xl space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">
                      API Key
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={settings.apiKey}
                        readOnly
                        className="flex-1 border border-neutral-200 p-2 text-sm focus:outline-none focus:border-neutral-400"
                      />
                      <button className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800">
                        Regenerate
                      </button>
                    </div>
                  </div>

                  <div className="max-w-xl space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">
                      Webhook URL
                    </label>
                    <input
                      type="text"
                      value={settings.webhookUrl}
                      onChange={(e) =>
                        setSettings({ ...settings, webhookUrl: e.target.value })
                      }
                      className="w-full border border-neutral-200 p-2 text-sm focus:outline-none focus:border-neutral-400"
                    />
                  </div>

                  <div className="max-w-xl space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Enable Notifications</div>
                        <div className="text-sm text-neutral-500">
                          Receive notifications for important events
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setSettings({
                            ...settings,
                            notifications: !settings.notifications,
                          })
                        }
                        className={`relative inline-flex h-6 w-11 items-center ${
                          settings.notifications
                            ? "bg-neutral-900"
                            : "bg-neutral-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform bg-white transition ${
                            settings.notifications
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Enable Logging</div>
                        <div className="text-sm text-neutral-500">
                          Log all API requests and responses
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setSettings({
                            ...settings,
                            logging: !settings.logging,
                          })
                        }
                        className={`relative inline-flex h-6 w-11 items-center ${
                          settings.logging ? "bg-neutral-900" : "bg-neutral-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform bg-white transition ${
                            settings.logging ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
