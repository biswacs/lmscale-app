import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAssistants } from "@/providers/assistants-provider";
import { SelectAssistantModal } from "../dashboard/assistants-modal-container";
import {
  Settings,
  Code2,
  ChartNoAxesColumn,
  MessageCircle,
  Waypoints,
  SquareTerminal,
  ArrowRightLeft,
} from "lucide-react";

const navigation = [
  { name: "Panel", href: "/dashboard", icon: ChartNoAxesColumn },
  { name: "Prompt", href: "/dashboard/prompt", icon: SquareTerminal },
  { name: "Instructions", href: "/dashboard/instructions", icon: Waypoints },
  { name: "Functions", href: "/dashboard/functions", icon: Code2 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Chat", href: "/dashboard/chat", icon: MessageCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const { currentAssistant } = useAssistants();
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);

  const renderNavLink = (item) => {
    const isActive = pathname === item.href;

    return (
      <Link
        key={item.name}
        href={item.href}
        className={`flex items-center justify-center md:justify-start gap-3 px-3 py-2 w-full text-sm transition-colors duration-200
          ${
            isActive
              ? "bg-neutral-900 text-white"
              : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
          }`}
      >
        <item.icon className="h-4 w-4 flex-shrink-0" />
        <span className="hidden md:block font-light truncate">{item.name}</span>
      </Link>
    );
  };

  return (
    <>
      <div className="relative flex flex-col border-r border-neutral-200 bg-white transition-all duration-200 w-12 md:w-44">
        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col gap-2 p-2">
            {navigation.map((item) => renderNavLink(item))}
          </nav>
        </div>

        <button
          onClick={() => setIsSelectModalOpen(true)}
          className="border-t border-neutral-200 flex items-center justify-center md:justify-start gap-3 px-6 py-4 w-full text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors duration-200"
        >
          <ArrowRightLeft className="h-4 w-4 flex-shrink-0" />
          <span className="hidden md:block font-light truncate">
            {currentAssistant?.name || "Loading..."}
          </span>
        </button>
      </div>

      <SelectAssistantModal
        isOpen={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
      />
    </>
  );
}
