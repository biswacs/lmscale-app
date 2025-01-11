import React from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import {
  Settings,
  Code2,
  ChartNoAxesColumn,
  MessageCircle,
  Waypoints,
  SquareTerminal,
} from "lucide-react";

const navigation = [
  { name: "Panel", href: "", icon: ChartNoAxesColumn },
  { name: "Prompt", href: "prompt", icon: SquareTerminal },
  { name: "Instructions", href: "instructions", icon: Waypoints },
  { name: "Functions", href: "functions", icon: Code2 },
  { name: "Settings", href: "settings", icon: Settings },
  { name: "Chat", href: "chat", icon: MessageCircle, newTab: true },
];

export function Sidebar() {
  const pathname = usePathname();
  const params = useParams();
  const assistantId = params?.slug;

  const renderNavLink = (item) => {
    const fullPath = `/assistant/${assistantId}${
      item.href ? `/${item.href}` : ""
    }`;
    const isActive = pathname === fullPath;
    const linkProps = item.newTab
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <Link
        key={item.name}
        href={fullPath}
        {...linkProps}
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
    <div className="relative flex flex-col border-r border-neutral-200 bg-white transition-all duration-300 w-14 md:w-44">
      <div className="flex-1 overflow-y-auto">
        <nav className="flex flex-col gap-2 p-2">
          {navigation.map((item) => renderNavLink(item))}
        </nav>
      </div>
    </div>
  );
}
