import { AppLayout } from "@/components/_shared/app-layout";
import { useAuthentication } from "@/providers/authentication-provider";
import { useAssistants } from "@/providers/assistants-provider";
import { Copy, Check } from "lucide-react";
import React, { useState } from "react";

const Settings = () => {
  const { logOutUser } = useAuthentication();
  const { currentAssistant } = useAssistants();
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

  return (
    <AppLayout>
      <div className="px-3 sm:px-6 py-4 font-light">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white border border-neutral-200 p-3 sm:p-4">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-sm sm:text-md text-neutral-800">
                {currentAssistant?.name || ""} API Key
              </p>

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
