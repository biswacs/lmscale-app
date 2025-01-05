import { useState, useEffect } from "react";
import { AppLayout } from "@/components/_shared/app-layout";
import { usePrompt } from "@/providers/prompt-provider";
import { Loader2 } from "lucide-react";

export default function PromptPage() {
  const { prompt, isLoading, error, updatePrompt } = usePrompt();
  const [localPrompt, setLocalPrompt] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    setLocalPrompt(prompt);
  }, [prompt]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);

    try {
      await updatePrompt(localPrompt);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="h-full flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-neutral-500" />
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="h-full flex items-center justify-center">
          <div className="text-red-500 text-sm font-light">{error}</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-light">System Prompt</h1>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-neutral-900 text-white text-sm hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-light"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Save Changes"
            )}
          </button>
        </div>

        {saveError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 text-sm font-light">
            {saveError}
          </div>
        )}

        <div className="bg-white border border-neutral-200 p-6">
          <textarea
            value={localPrompt}
            onChange={(e) => setLocalPrompt(e.target.value)}
            rows={12}
            className="w-full bg-neutral-50 px-3 py-2 text-sm font-light border border-neutral-200 focus:outline-none focus:border-neutral-900 resize-none"
            placeholder="Enter system prompt..."
          />
        </div>
      </div>
    </AppLayout>
  );
}
