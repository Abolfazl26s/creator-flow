import DashboardAppShell from "@/components/layout/dashboard-app-shell";

type DashboardShellProps = {
  children: React.ReactNode;
  userEmail: string;
  workspaceName: string;
};

export default function DashboardShell({
  children,
  userEmail,
  workspaceName,
}: DashboardShellProps) {
  return (
    <DashboardAppShell userEmail={userEmail} workspaceName={workspaceName}>
      {children}
    </DashboardAppShell>
  );
}
