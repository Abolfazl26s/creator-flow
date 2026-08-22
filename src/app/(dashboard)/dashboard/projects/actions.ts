"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { CreateProjectState } from "@/components/projects/project-form-state";
import { createProjectSchema } from "@/lib/validations/project";
import { getCurrentWorkspace } from "@/lib/workspace/get-current-workspace";

export async function createProject(
  _previousState: CreateProjectState,
  formData: FormData,
): Promise<CreateProjectState> {
  const validationResult = createProjectSchema.safeParse({
    name: String(formData.get("name") ?? ""),
    description: String(formData.get("description") ?? ""),
    type: String(formData.get("type") ?? ""),
    targetDate: String(formData.get("targetDate") ?? ""),
  });

  if (!validationResult.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    const { supabase, user, workspace } = await getCurrentWorkspace();

    const { error } = await supabase.from("projects").insert({
      workspace_id: workspace.id,
      name: validationResult.data.name,
      description: validationResult.data.description,
      type: validationResult.data.type,
      target_date: validationResult.data.targetDate,
      status: "planned",
      progress: 0,
      created_by: user.id,
    });

    if (error) {
      console.error("Unable to create project:", error.message);

      return {
        status: "error",
        message: "Unable to create the project. Please try again.",
      };
    }
  } catch (error) {
    console.error("Unexpected project creation error:", error);

    return {
      status: "error",
      message: "Unable to create the project. Please try again.",
    };
  }

  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard");

  redirect("/dashboard/projects");
}
