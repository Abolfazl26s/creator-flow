import Link from "next/link";
import { MenuSquare } from "lucide-react";
import LogoutButton from "@/components/layout/logout-button";
import MobileBottomNav from "@/components/layout/mobile-bottom-nav";
import NavLink from "@/components/layout/nav-link";

type DashboardShellProps = {
  children: React.ReactNode;
  userEmail: string;
};

export default function DashboardShell({
  children,
  userEmail,
}: DashboardShellProps) {
  const userInitial = userEmail.charAt(0).toUpperCase();

  return (
    <div className="min-h-[100dvh] bg-slate-950 text-white">
      <div className="flex min-h-[100dvh]">
        <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-slate-900 p-4 lg:flex lg:flex-col">
          <div className="px-3 py-4">
            <Link
              href="/dashboard"
              className="text-lg font-semibold tracking-tight"
            >
              <span className="text-cyan-400">Creator</span>Flow
            </Link>
          </div>

          <nav aria-label="Main navigation" className="mt-6 space-y-1">
            <NavLink href="/dashboard" exact>
              Overview
            </NavLink>

            <NavLink href="/dashboard/projects">Projects</NavLink>

            <NavLink href="/dashboard/tasks">Tasks</NavLink>

            <NavLink href="/dashboard/settings">Settings</NavLink>
          </nav>

          <div className="mt-auto border-t border-slate-800 pt-4">
            <p className="truncate px-3 text-xs text-slate-500">{userEmail}</p>

            <div className="mt-2">
              <LogoutButton />
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex min-h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <Link
                href="/dashboard"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400 text-slate-950 lg:hidden"
                aria-label="CreatorFlow dashboard"
              >
                <MenuSquare aria-hidden="true" className="h-5 w-5" />
              </Link>

              <div className="min-w-0">
                <p className="text-xs text-slate-500 sm:text-sm">Workspace</p>

                <p className="truncate text-sm font-medium text-white sm:text-base">
                  My Creative Space
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

      <MobileBottomNav />
    </div>
  );
}
