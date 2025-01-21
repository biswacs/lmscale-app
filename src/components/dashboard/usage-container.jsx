import React, { useState, useEffect } from "react";
import { useAssistants } from "@/providers/assistants-provider";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const UsageContainer = () => {
  const [error, setError] = useState("");
  const [usageData, setUsageData] = useState([]);
  const { currentAssistant } = useAssistants();

  useEffect(() => {
    if (currentAssistant?.usages) {
      const sortedUsages = [...currentAssistant.usages].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setUsageData(sortedUsages);
    }
  }, [currentAssistant]);

  const renderUsageChart = () => {
    if (usageData.length === 0) {
      return (
        <div className="text-center text-neutral-500 p-8">
          No usage data available
        </div>
      );
    }

    return (
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={usageData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="inputTokens"
              stroke="#8884d8"
              name="Input Tokens"
            />
            <Line
              type="monotone"
              dataKey="outputTokens"
              stroke="#82ca9d"
              name="Output Tokens"
            />
            <Line
              type="monotone"
              dataKey="totalTokens"
              stroke="#ffc658"
              name="Total Tokens"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return {
      date: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
    };
  };

  return (
    <div className="min-h-[75vh] p-2 sm:p-6 font-light">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-light text-neutral-800">
            {currentAssistant?.name
              ? `${currentAssistant.name} Usage Statistics`
              : "Usage Statistics"}
          </h2>
        </div>
        {error ? (
          <div className="h-96 flex items-center justify-center">
            <div className="bg-red-50 text-red-500 p-4 text-center max-w-lg">
              {error}
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-white border border-neutral-200 p-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="p-4 border border-neutral-200">
                  <h3 className="text-sm text-neutral-500 mb-2">
                    Input Tokens
                  </h3>
                  <p className="text-2xl">
                    {usageData[
                      usageData.length - 1
                    ]?.inputTokens.toLocaleString() || "-"}
                  </p>
                </div>
                <div className="p-4 border border-neutral-200">
                  <h3 className="text-sm text-neutral-500 mb-2">
                    Output Tokens
                  </h3>
                  <p className="text-2xl">
                    {usageData[
                      usageData.length - 1
                    ]?.outputTokens.toLocaleString() || "-"}
                  </p>
                </div>
                <div className="p-4 border border-neutral-200">
                  <h3 className="text-sm text-neutral-500 mb-2">
                    Total Tokens
                  </h3>
                  <p className="text-2xl">
                    {usageData[
                      usageData.length - 1
                    ]?.totalTokens.toLocaleString() || "-"}
                  </p>
                </div>
                <div className="p-4 border border-neutral-200">
                  <h3 className="text-sm text-neutral-500 mb-2">
                    Latest Usage
                  </h3>
                  <div className="flex flex-col">
                    {usageData[usageData.length - 1]?.updatedAt ? (
                      <>
                        <p className="text-lg">
                          {
                            formatDateTime(
                              usageData[usageData.length - 1].updatedAt
                            ).date
                          }
                        </p>
                        <p className="text-lg">
                          {
                            formatDateTime(
                              usageData[usageData.length - 1].updatedAt
                            ).time
                          }
                        </p>
                      </>
                    ) : (
                      "-"
                    )}
                  </div>
                </div>
              </div>
              {renderUsageChart()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsageContainer;
