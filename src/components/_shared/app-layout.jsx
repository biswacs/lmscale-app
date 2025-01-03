import React from "react";
import { Header } from "./header";

export function AppLayout({ children }) {
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
        <main className="flex-1 overflow-hidden p-2">{children}</main>
      </div>
    </div>
  );
}
