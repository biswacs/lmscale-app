import DeployConatiner from "@/components/dashboard/deploy/deploy-container";
import DeployProvider from "@/providers/deploy-provider";

export default function DeployPage() {
  return (
    <DeployProvider>
      <DeployConatiner />
    </DeployProvider>
  );
}
