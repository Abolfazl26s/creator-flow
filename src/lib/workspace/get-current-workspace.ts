import { createClient } from "@/lib/supabase/server";
import type { Workspace } from "@/types/workspace";

export async function getCurrentWorkspace() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be authenticated to access a workspace.");
  }

  const { data, error: workspaceError } = await supabase.rpc(
    "create_personal_workspace",
  );

  if (workspaceError) {
    throw new Error("Unable to load the current workspace.");
  }

  const workspace = data as Workspace | null;

  if (!workspace) {
    throw new Error("No workspace is available for this user.");
  }

  return {
    supabase,
    user,
    workspace,
  };
}
