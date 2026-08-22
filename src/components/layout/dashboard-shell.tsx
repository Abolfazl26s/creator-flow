import DashboardAppShell from "@/components/layout/dashboard-app-shell";

type DashboardShellProps = {
  children: React.ReactNode;
  userEmail: string;
};

export default function DashboardShell({
  children,
  userEmail,
}: DashboardShellProps) {
  return (
    <DashboardAppShell userEmail={userEmail}>{children}</DashboardAppShell>
  );
}
