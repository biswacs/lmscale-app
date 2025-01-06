import { useRouter } from "next/router";

export default function AgentContainer() {
  const router = useRouter();
  const agentId = router.query.slug;
  return <div>Single Agent UI - {agentId}</div>;
}
