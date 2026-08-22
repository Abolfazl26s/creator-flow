"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  House,
  ListTodo,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  X,
  type LucideIcon,
} from "lucide-react";
import LogoutButton from "@/components/layout/logout-button";
import MobileBottomNav from "@/components/layout/mobile-bottom-nav";

type DashboardAppShellProps = {
  children: ReactNode;
  userEmail: string;
  workspaceName: string;
};

type NavigationItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
};

const navigationItems: NavigationItem[] = [
  {
    href: "/dashboard",
    label: "Overview",
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

function isNavigationItemActive(pathname: string, item: NavigationItem) {
  if (item.exact) {
    return pathname === item.href;
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

type NavigationLinksProps = {
  collapsed?: boolean;
  onNavigate?: () => void;
};

function NavigationLinks({
  collapsed = false,
  onNavigate,
}: NavigationLinksProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="space-y-1">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = isNavigationItemActive(pathname, item);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            title={collapsed ? item.label : undefined}
            className={`flex items-center rounded-lg text-sm font-medium transition ${
              collapsed ? "justify-center px-3 py-3" : "gap-3 px-3 py-2.5"
            } ${
              isActive
                ? "bg-cyan-400 text-slate-950"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Icon
              aria-hidden="true"
              className="h-5 w-5 shrink-0"
              strokeWidth={isActive ? 2.5 : 2}
            />

            {!collapsed ? <span>{item.label}</span> : null}
          </Link>
        );
      })}
    </nav>
  );
}

export default function DashboardAppShell({
  children,
  userEmail,
  workspaceName,
}: DashboardAppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] =
    useState(false);

  const userInitial = userEmail.charAt(0).toUpperCase();

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <div className="min-h-[100dvh] bg-slate-950 text-white">
      <div className="flex min-h-[100dvh]">
        <aside
          className={`hidden shrink-0 border-r border-slate-800 bg-slate-900 p-4 transition-[width] duration-200 lg:flex lg:flex-col ${
            isDesktopSidebarCollapsed ? "w-20" : "w-64"
          }`}
        >
          <div
            className={`py-4 ${
              isDesktopSidebarCollapsed ? "px-0 text-center" : "px-3"
            }`}
          >
            <Link
              href="/dashboard"
              title={isDesktopSidebarCollapsed ? "CreatorFlow" : undefined}
              className="inline-flex items-center text-lg font-semibold tracking-tight"
            >
              {isDesktopSidebarCollapsed ? (
                <span className="text-cyan-400">CF</span>
              ) : (
                <>
                  <span className="text-cyan-400">Creator</span>Flow
                </>
              )}
            </Link>
          </div>

          <div className="mt-6">
            <NavigationLinks collapsed={isDesktopSidebarCollapsed} />
          </div>

          <div className="mt-auto border-t border-slate-800 pt-4">
            {!isDesktopSidebarCollapsed ? (
              <>
                <p className="truncate px-3 text-xs text-slate-500">
                  {userEmail}
                </p>

                <div className="mt-2">
                  <LogoutButton />
                </div>
              </>
            ) : (
              <div className="flex justify-center">
                <LogoutButton compact />
              </div>
            )}
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex min-h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-controls="mobile-navigation-drawer"
                aria-expanded={isMobileMenuOpen}
                className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-800 text-slate-300 transition hover:border-slate-700 hover:bg-slate-900 hover:text-white lg:hidden"
              >
                <Menu aria-hidden="true" className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setIsDesktopSidebarCollapsed((isCollapsed) => !isCollapsed)
                }
                aria-label={
                  isDesktopSidebarCollapsed
                    ? "Expand sidebar"
                    : "Collapse sidebar"
                }
                title={
                  isDesktopSidebarCollapsed
                    ? "Expand sidebar"
                    : "Collapse sidebar"
                }
                className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-800 text-slate-300 transition hover:border-slate-700 hover:bg-slate-900 hover:text-white lg:flex"
              >
                {isDesktopSidebarCollapsed ? (
                  <PanelLeftOpen aria-hidden="true" className="h-5 w-5" />
                ) : (
                  <PanelLeftClose aria-hidden="true" className="h-5 w-5" />
                )}
              </button>

              <div className="min-w-0">
                <p className="text-xs text-slate-500 sm:text-sm">Workspace</p>

                <p className="truncate text-sm font-medium text-white sm:text-base">
                  {workspaceName}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="max-w-48 truncate text-sm text-white">
                  {userEmail}
                </p>

                <p className="text-xs text-slate-500">Creator</p>
              </div>

              <div
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 font-semibold text-slate-950"
              >
                {userInitial}
              </div>

              <div className="lg:hidden">
                <LogoutButton compact />
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 pb-28 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pb-8">
            {children}
          </main>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />

          <aside
            id="mobile-navigation-drawer"
            aria-label="Mobile navigation"
            className="absolute inset-y-0 left-0 flex w-[min(20rem,85vw)] flex-col border-r border-slate-800 bg-slate-900 p-4 shadow-2xl"
          >
            <div className="flex items-center justify-between px-3 py-4">
              <Link
                href="/dashboard"
                onClick={closeMobileMenu}
                className="text-lg font-semibold tracking-tight"
              >
                <span className="text-cyan-400">Creator</span>Flow
              </Link>

              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close navigation menu"
                className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6">
              <NavigationLinks onNavigate={closeMobileMenu} />
            </div>

            <div className="mt-auto border-t border-slate-800 pt-4">
              <p className="truncate px-3 text-xs text-slate-500">
                {userEmail}
              </p>

              <div className="mt-2">
                <LogoutButton />
              </div>
            </div>
          </aside>
        </div>
      ) : null}

      <MobileBottomNav />
    </div>
  );
}
