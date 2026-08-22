"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderKanban, House, ListTodo, Settings } from "lucide-react";

const navigationItems = [
  {
    href: "/dashboard",
    label: "Home",
    icon: House,
    exact: true,
  },
  {
    href: "/dashboard/projects",
    label: "Projects",
    icon: FolderKanban,
  },
  {
    href: "/dashboard/tasks",
    label: "Tasks",
    icon: ListTodo,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-800 bg-slate-950/95 px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 backdrop-blur lg:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-2 py-1 text-xs font-medium transition ${
                isActive
                  ? "text-cyan-300"
                  : "text-slate-500 hover:text-slate-200"
              }`}
            >
              <span
                className={`flex h-8 w-12 items-center justify-center rounded-xl transition ${
                  isActive ? "bg-cyan-400/15" : ""
                }`}
              >
                <Icon
                  aria-hidden="true"
                  className="h-5 w-5"
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </span>

              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
