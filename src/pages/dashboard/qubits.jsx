import { AppLayout } from "@/components/_shared/app-layout";
import { QubitsContainer } from "@/components/dashboard/qubits-container";

export default function DashbaordPage() {
  return (
    <AppLayout>
      <QubitsContainer />
    </AppLayout>
  );
}
