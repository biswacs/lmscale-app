import { AppLayout } from "@/components/_shared/app-layout";
import { DeploymentsContainer } from "@/components/dashboard/deployments-container";

export default function DeploymentsPage() {
  return (
    <AppLayout>
      <DeploymentsContainer />
    </AppLayout>
  );
}
