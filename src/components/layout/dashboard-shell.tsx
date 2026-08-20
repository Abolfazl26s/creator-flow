import Link from "next/link";
import LogoutButton from "@/components/layout/logout-button";
import NavLink from "@/components/layout/nav-link";

type DashboardShellProps = {
  children: React.ReactNode;
  userEmail: string;
};

export default function DashboardShell({
  children,
  userEmail,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
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
          <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">
            <div>
              <p className="text-sm text-slate-500">Workspace</p>
              <p className="font-medium text-white">My Creative Space</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm text-white">{userEmail}</p>
                <p className="text-xs text-slate-500">Creator</p>
              </div>

              <div
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 font-semibold text-slate-950"
              >
                {userEmail.charAt(0).toUpperCase()}
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
