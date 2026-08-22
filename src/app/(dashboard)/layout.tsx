import { redirect } from "next/navigation";
import DashboardShell from "@/components/layout/dashboard-shell";
import { createClient } from "@/lib/supabase/server";
import type { Workspace } from "@/types/workspace";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase.rpc("create_personal_workspace");

  if (error) {
    console.error("Unable to load workspace:", error.message);

    throw new Error(
      "Unable to load your workspace. Please refresh the page and try again.",
    );
  }

  const workspace = data as Workspace | null;

  if (!workspace) {
    throw new Error("Workspace could not be created.");
  }

  return (
    <DashboardShell
      userEmail={user.email ?? "User"}
      workspaceName={workspace.name}
    >
      {children}
    </DashboardShell>
  );
}
