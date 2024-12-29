import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Server, Activity, Settings } from "lucide-react";

const navigation = [
  { name: "Playground", href: "/dashboard", icon: MessageSquare },
  { name: "Deployments", href: "/dashboard/deployments", icon: Server },
  { name: "Monitoring", href: "/dashboard/monitoring", icon: Activity },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-neutral-200 bg-white">
      <div className="flex h-full flex-col">
        <div className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors
                  ${
                    isActive
                      ? "bg-neutral-100 text-neutral-800"
                      : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-800"
                  }
                `}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
