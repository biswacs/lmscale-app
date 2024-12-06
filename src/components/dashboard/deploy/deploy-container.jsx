import React, { useState } from "react";
import { useDeploy } from "@/providers/deploy-provider";

export default function DeployContainer() {
  const { createDeployment } = useDeploy();

  const [name, setName] = useState("");

  const handleCreateDeployment = () => {
    createDeployment(name);
    setName("");
  };

  return (
    <div className="p-10">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="mb-4 p-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleCreateDeployment}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Deployment
      </button>
    </div>
  );
}
