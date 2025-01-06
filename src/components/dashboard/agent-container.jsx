import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AgentContainer() {
  const router = useRouter();
  const agentId = router.query.slug;

  const [loading, setLoading] = useState(true);

  const fetchAgentData = (id) => {
    setLoading(true);
    setTimeout(() => {
      console.log("Fetch agent data with id: ", id);
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (agentId) {
      fetchAgentData(agentId);
    }
  }, [router]);
  if (loading) return "loading...";
  return <div>Single Agent UI - {agentId}</div>;
}
