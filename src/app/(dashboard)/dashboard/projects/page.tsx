import { CalendarDays, FolderKanban, ListChecks, Plus } from "lucide-react";
import NewProjectForm from "@/components/projects/new-project-form";
import { getCurrentWorkspace } from "@/lib/workspace/get-current-workspace";
import type { Project } from "@/types/project";

const projectTypeLabels = {
  video: "Video",
  audio: "Audio",
  social: "Social",
  writing: "Writing",
  other: "Other",
};

const projectStatusLabels = {
  planned: "Planned",
  in_progress: "In progress",
  review: "In review",
  completed: "Completed",
  archived: "Archived",
};

const projectStatusClasses = {
  planned: "bg-slate-800 text-slate-300",
  in_progress: "bg-cyan-950 text-cyan-300",
  review: "bg-amber-950 text-amber-300",
  completed: "bg-emerald-950 text-emerald-300",
  archived: "bg-slate-900 text-slate-500",
};

function formatTargetDate(date: string | null) {
  if (!date) {
    return "No target date";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export default async function ProjectsPage() {
  const { supabase, workspace } = await getCurrentWorkspace();

  const { data, error } = await supabase
    .from("projects")
    .select(
      `
        id,
        workspace_id,
        name,
        description,
        type,
        status,
        progress,
        target_date,
        created_by,
        created_at,
        updated_at
      `,
    )
    .eq("workspace_id", workspace.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Unable to load projects.");
  }

  const projects = (data ?? []) as Project[];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
            Workspace
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Projects
          </h1>

          <p className="mt-2 max-w-2xl text-slate-400">
            Plan and track the creative work inside {workspace.name}.
          </p>
        </div>

        <div className="sm:self-end">
          <NewProjectForm />
        </div>
      </div>

      {projects.length === 0 ? (
        <section className="mt-8 rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
            <FolderKanban aria-hidden="true" className="h-7 w-7" />
          </div>

          <h2 className="mt-5 text-xl font-semibold">
            Your workspace has no projects yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
            Start by creating a project for your next video, audio episode,
            social campaign or writing workflow.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 text-sm text-slate-500">
            <Plus aria-hidden="true" className="h-4 w-4" />
            Use the New project button above to begin.
          </div>
        </section>
      ) : (
        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="flex min-h-64 flex-col rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-cyan-400">
                    {projectTypeLabels[project.type]}
                  </p>

                  <h2 className="mt-2 text-lg font-semibold">{project.name}</h2>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                    projectStatusClasses[project.status]
                  }`}
                >
                  {projectStatusLabels[project.status]}
                </span>
              </div>

              <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-400">
                {project.description || "No project description yet."}
              </p>

              <div className="mt-auto pt-6">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <ListChecks aria-hidden="true" className="h-3.5 w-3.5" />
                    {project.progress}% complete
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
                    {formatTargetDate(project.target_date)}
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-cyan-400 transition-[width]"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
