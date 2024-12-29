import { Server, Globe, Clock } from "lucide-react";

export function DeploymentsContainer() {
  const deployments = [
    {
      id: 1,
      name: "Production API",
      status: "running",
      model: "mixtral-8x7b",
      region: "us-east-1",
      lastUpdated: "2024-03-28 14:30",
      requests: "1.2M",
    },
    {
      id: 2,
      name: "Staging Environment",
      status: "running",
      model: "llama-2-70b",
      region: "eu-west-1",
      lastUpdated: "2024-03-28 12:15",
      requests: "250K",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-neutral-900">Deployments</h1>
        <button className="bg-neutral-900 text-white px-4 py-2 text-sm font-medium hover:bg-neutral-800">
          New Deployment
        </button>
      </div>

      <div className="border border-neutral-200 bg-white">
        <div className="grid grid-cols-7 gap-4 p-4 border-b border-neutral-200 text-sm font-medium text-neutral-500">
          <div className="col-span-2">Name</div>
          <div>Status</div>
          <div>Model</div>
          <div>Region</div>
          <div>Last Updated</div>
          <div>Requests</div>
        </div>

        {deployments.map((deployment) => (
          <div
            key={deployment.id}
            className="grid grid-cols-7 gap-4 p-4 border-b border-neutral-200 text-sm hover:bg-neutral-50"
          >
            <div className="col-span-2 font-medium text-neutral-900">
              {deployment.name}
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 bg-green-500 rounded-full" />
                {deployment.status}
              </span>
            </div>
            <div className="text-neutral-600">{deployment.model}</div>
            <div className="text-neutral-600">{deployment.region}</div>
            <div className="text-neutral-600">{deployment.lastUpdated}</div>
            <div className="text-neutral-600">{deployment.requests}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
