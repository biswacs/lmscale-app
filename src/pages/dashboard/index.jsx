import { AppLayout } from "@/components/_shared/app-layout";
import UsageContainer from "@/components/dashboard/usage-container";
import React from "react";

const index = () => {
  return (
    <AppLayout>
      <UsageContainer />
    </AppLayout>
  );
};

export default index;
