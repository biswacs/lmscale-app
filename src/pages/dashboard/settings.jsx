import { AppLayout } from "@/components/_shared/app-layout";
import { useAuthentication } from "@/providers/authentication-provider";
import { useAssistants } from "@/providers/assistants-provider";
import { Copy, Check, User } from "lucide-react";
import React, { useState } from "react";

const Settings = () => {
  const { logOutUser } = useAuthentication();
  const { currentAssistant } = useAssistants();
  const { user, loading } = useAuthentication();
  const [copied, setCopied] = useState(false);

  const maskApiKey = (apiKey) => {
    if (!apiKey) return "";
    const firstFour = apiKey.slice(0, 4);
    const lastFour = apiKey.slice(-4);
    const middleLength = apiKey.length - 8;
    return `${firstFour}${"•".repeat(middleLength)}${lastFour}`;
  };

  const handleCopy = async () => {
    if (currentAssistant?.apiKey) {
      await navigator.clipboard.writeText(currentAssistant.apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <AppLayout>
      <div className="px-3 sm:px-6 py-4 font-light">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white border border-neutral-200 p-3 sm:p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-neutral-100">
                <div className="size-10 bg-neutral-900 text-white flex items-center justify-center text-sm">
                  {!loading && user?.name ? user.name[0].toUpperCase() : "U"}
                </div>
                <div>
                  <h2 className="text-neutral-900 font-medium">Profile</h2>
                  <p className="text-sm text-neutral-500">
                    Your account details
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                <div>
                  <label className="block text-sm text-neutral-500 mb-1">
                    Name
                  </label>
                  <p className="text-neutral-900">
                    {loading ? "Loading..." : user?.name}
                  </p>
                </div>

                <div>
                  <label className="block text-sm text-neutral-500 mb-1">
                    Email
                  </label>
                  <p className="text-neutral-900">
                    {loading ? "Loading..." : user?.email}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-neutral-500 mb-1">
                      Member Since
                    </label>
                    <p className="text-neutral-900">
                      {loading ? "Loading..." : formatDate(user?.createdAt)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-500 mb-1">
                      Status
                    </label>
                    <div className="flex items-center gap-2">
                      <span
                        className={`size-2 rounded-full ${
                          user?.isActive ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <span className="text-neutral-900">
                        {user?.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-neutral-200 p-3 sm:p-4">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm sm:text-md text-neutral-800">
                  {currentAssistant?.name || ""} API Key
                </p>
                <span className="text-xs text-neutral-500">
                  Assistant ID: {currentAssistant?.id?.slice(0, 8)}
                </span>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <code className="flex-1 text-xs sm:text-sm bg-neutral-50 border break-all border-neutral-200 px-2 sm:px-3 py-2 text-neutral-600">
                    {currentAssistant?.apiKey
                      ? maskApiKey(currentAssistant.apiKey)
                      : "No API key available"}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="h-8 sm:w-8 flex items-center justify-center bg-neutral-900 text-white hover:bg-neutral-800"
                  >
                    {copied ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={logOutUser}
              className="bg-neutral-900 text-white px-3 py-1.5 text-sm hover:bg-neutral-800"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
