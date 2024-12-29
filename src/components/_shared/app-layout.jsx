import React from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex h-[calc(100vh-3.5rem)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
