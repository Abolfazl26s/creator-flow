import DashboardShell from "@/components/layout/dashboard-shell";
import { getCurrentWorkspace } from "@/lib/workspace/get-current-workspace";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, workspace } = await getCurrentWorkspace();

  return (
    <DashboardShell
      userEmail={user.email ?? "User"}
      workspaceName={workspace.name}
    >
      {children}
    </DashboardShell>
  );
}
