import { AppLayout } from "@/components/_shared/app-layout";
import { AgentsContainer } from "@/components/dashboard/agents-container";

export default function DashbaordPage() {
  return (
    <AppLayout>
      <AgentsContainer />
    </AppLayout>
  );
}
