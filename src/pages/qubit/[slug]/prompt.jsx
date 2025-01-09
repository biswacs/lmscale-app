import { QubitLayout } from "@/components/_shared/qubit-layout";
import React from "react";
import { useRouter } from "next/router";

const Prompt = () => {
  const router = useRouter();
  const qubitId = router.query.slug;

  return (
    <QubitLayout>
      <div>prompt: {qubitId}</div>
    </QubitLayout>
  );
};

export default Prompt;
