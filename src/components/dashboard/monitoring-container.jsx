import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function MonitoringContainer() {
  const data = [
    { time: "00:00", requests: 2400, latency: 150 },
    { time: "04:00", requests: 1398, latency: 140 },
    { time: "08:00", requests: 9800, latency: 180 },
    { time: "12:00", requests: 3908, latency: 160 },
    { time: "16:00", requests: 4800, latency: 145 },
    { time: "20:00", requests: 3800, latency: 142 },
  ];

  const stats = [
    { label: "Total Requests", value: "1.2M" },
    { label: "Avg. Latency", value: "156ms" },
    { label: "Error Rate", value: "0.02%" },
    { label: "Success Rate", value: "99.98%" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-neutral-900">Monitoring</h1>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-neutral-200 p-4"
          >
            <div className="text-sm  text-neutral-500">{stat.label}</div>
            <div className="text-2xl font-semibold mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-neutral-200 p-4">
        <h2 className="text-lg  mb-4">Request Volume</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="requests" stroke="#000" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
