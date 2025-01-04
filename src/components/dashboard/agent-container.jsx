import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Loader2,
  PlusCircle,
  Code2,
  Settings,
  MessageSquare,
  Key,
  FileCode2,
  SquareTerminal,
} from "lucide-react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/v1";

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-light
      ${
        active
          ? "bg-neutral-100 text-neutral-900"
          : "text-neutral-500 hover:bg-neutral-50"
      }`}
  >
    <Icon className="h-5 w-5" />
    {label}
  </button>
);

export default function AgentContainer() {
  const router = useRouter();
  const agentId = router.query.slug;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [agentData, setAgentData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const fetchAgentData = async (id) => {
    setLoading(true);
    try {
      const lm_auth_token = localStorage.getItem("lm_auth_token");
      const headers = lm_auth_token
        ? { Authorization: `Bearer ${lm_auth_token}` }
        : {};

      const { data } = await axios({
        method: "GET",
        url: `${API_BASE_URL}/agent/data`,
        params: { agentId: id },
        headers: headers,
        timeout: 60000,
      });

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch agent data");
      }
      setAgentData(data.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch agent data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (agentId) {
      fetchAgentData(agentId);
    }
  }, [agentId]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-neutral-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-red-500 text-sm font-light">{error}</div>
      </div>
    );
  }

  if (!agentData) return null;

  const { agent, functions = [], instructions = [] } = agentData;

  const renderContent = () => {
    switch (activeTab) {
      case "api":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-light">API Configuration</h2>
            <div className="bg-white border border-neutral-200 p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-neutral-500 font-light">
                  API Key
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={agent.apiKey}
                    readOnly
                    className="flex-1 bg-neutral-50 px-3 py-2 text-sm font-mono border border-neutral-200"
                  />
                  <button className="px-3 py-2 border border-neutral-200 text-sm hover:bg-neutral-50 font-light">
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "system":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-light">System Prompt</h2>
            <div className="bg-white border border-neutral-200 p-6">
              <textarea
                value={agent.prompt}
                readOnly
                rows={8}
                className="w-full bg-neutral-50 px-3 py-2 text-sm font-light border border-neutral-200 resize-none"
              />
            </div>
          </div>
        );

      case "functions":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-light">Functions</h2>
              <button className="px-4 py-2 bg-neutral-900 text-white text-sm hover:bg-neutral-800 flex items-center gap-2 font-light">
                <PlusCircle className="h-4 w-4" />
                Add Function
              </button>
            </div>
            <div className="bg-white border border-neutral-200">
              {functions.length > 0 ? (
                <div className="divide-y divide-neutral-200">
                  {functions.map((func) => (
                    <div key={func.id} className="p-4 hover:bg-neutral-50">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="text-sm font-medium">{func.name}</h3>
                          <div className="flex items-center gap-3 text-sm text-neutral-500 font-light">
                            <span className="flex items-center gap-1">
                              <span
                                className={`px-2 py-0.5 text-xs ${
                                  func.method === "GET"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-green-100 text-green-700"
                                }`}
                              >
                                {func.method}
                              </span>
                              {func.endpoint}
                            </span>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-neutral-100 rounded-full">
                          <Settings className="h-4 w-4 text-neutral-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-neutral-500 text-sm font-light">
                  No functions configured
                </div>
              )}
            </div>
          </div>
        );

      case "instructions":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-light">Instructions</h2>
              <button className="px-4 py-2 bg-neutral-900 text-white text-sm hover:bg-neutral-800 flex items-center gap-2 font-light">
                <PlusCircle className="h-4 w-4" />
                Add Instruction
              </button>
            </div>
            <div className="bg-white border border-neutral-200">
              {instructions.length > 0 ? (
                <div className="divide-y divide-neutral-200">
                  {instructions.map((instruction) => (
                    <div
                      key={instruction.id}
                      className="p-4 hover:bg-neutral-50"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">
                          {instruction.name}
                        </h3>
                        <button className="p-2 hover:bg-neutral-100 rounded-full">
                          <Settings className="h-4 w-4 text-neutral-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-neutral-500 text-sm font-light">
                  No instructions added
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex">
      <div className="w-64 border-r border-neutral-200 flex flex-col">
        <div className="p-4 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-light">{agent.name}</h1>
          </div>
          <div className="mt-2">
            <span
              className={`size-2 rounded-full 
                ${agent.isActive ? "bg-green-500" : "bg-yellow-500"}`}
            />
          </div>
        </div>
        <div className="flex-1">
          <SidebarItem
            icon={SquareTerminal}
            label="System Prompt"
            active={activeTab === "system"}
            onClick={() => setActiveTab("system")}
          />
          <SidebarItem
            icon={Code2}
            label="Functions"
            active={activeTab === "functions"}
            onClick={() => setActiveTab("functions")}
          />
          <SidebarItem
            icon={FileCode2}
            label="Instructions"
            active={activeTab === "instructions"}
            onClick={() => setActiveTab("instructions")}
          />
          <SidebarItem
            icon={MessageSquare}
            label="Conversations"
            active={activeTab === "conversations"}
            onClick={() => setActiveTab("conversations")}
          />
          <SidebarItem
            icon={Key}
            label="API"
            active={activeTab === "api"}
            onClick={() => setActiveTab("api")}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-6">{renderContent()}</div>
      </div>
    </div>
  );
}
