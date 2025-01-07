import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import {
  Settings,
  Terminal,
  BookOpen,
  Code2,
  ChevronRight,
  ChevronLeft,
  ChartNoAxesColumn,
  MessageCircle,
} from "lucide-react";

const navigation = [
  { name: "Panel", href: "", icon: ChartNoAxesColumn },
  { name: "System Prompt", href: "prompt", icon: Terminal },
  { name: "Functions", href: "functions", icon: Code2 },
  { name: "Instructions", href: "instructions", icon: BookOpen },
  { name: "Chat", href: "chat", icon: MessageCircle },
  { name: "Settings", href: "settings", icon: Settings },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const agentId = params?.slug;

  return (
    <div
      className={`relative flex flex-col border-r border-neutral-200 bg-white transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-52"
      }`}
    >
      <div className="flex-1 overflow-y-auto">
        <nav
          className={`flex flex-col gap-1 py-2 ${
            isCollapsed ? "px-2" : "px-4"
          }`}
        >
          {navigation.map((item) => {
            const fullPath = `/agent/${agentId}${
              item.href ? `/${item.href}` : ""
            }`;
            const isActive = pathname === fullPath;

            return (
              <Link
                key={item.name}
                href={fullPath}
                className={`flex items-center ${
                  isCollapsed ? "justify-center" : "justify-start"
                } gap-3 rounded px-3 py-2 text-sm transition-colors duration-200
                  ${
                    isActive
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  }`}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-light truncate">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-2.5 top-3.5 flex h-5 w-5 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
