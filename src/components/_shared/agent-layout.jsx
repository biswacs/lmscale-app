import React from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export function AgentLayout({ children }) {
  return (
    <div className="min-h-screen bg-white relative">
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:14px_14px] sm:bg-[size:24px_24px] md:bg-[size:32px_32px]"
        style={{
          mask: "radial-gradient(circle at center, white 30%, transparent 70%)",
          WebkitMask:
            "radial-gradient(circle at center, white 30%, transparent 70%)",
        }}
      />
      <div className="relative z-10 flex flex-col h-screen">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto px-4 py-4">
            <div className="max-w-3xl mx-auto pb-24">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
