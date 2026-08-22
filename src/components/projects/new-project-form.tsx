"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Plus, X } from "lucide-react";
import { createProject } from "@/app/(dashboard)/dashboard/projects/actions";
import { initialCreateProjectState } from "@/components/projects/project-form-state";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-11 items-center justify-center rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Creating project..." : "Create project"}
    </button>
  );
}

export default function NewProjectForm() {
  const [isOpen, setIsOpen] = useState(false);

  const [state, formAction] = useActionState(
    createProject,
    initialCreateProjectState,
  );

  return (
    <section>
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        aria-expanded={isOpen}
        aria-controls="new-project-form"
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-300 sm:w-auto"
      >
        <Plus aria-hidden="true" className="h-4 w-4" />

        <span>New project</span>
      </button>

      {isOpen ? (
        <div
          id="new-project-form"
          className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-5 sm:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Create a project</h2>

              <p className="mt-1 text-sm text-slate-400">
                Add a video, audio, social, writing or other creative project.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close project form"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <form action={formAction} className="mt-6 grid gap-5">
            <div>
              <label
                htmlFor="project-name"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Project name
              </label>

              <input
                id="project-name"
                name="name"
                required
                minLength={2}
                maxLength={120}
                placeholder="Summer campaign"
                aria-describedby={
                  state.fieldErrors?.name ? "project-name-error" : undefined
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
              />

              {state.fieldErrors?.name ? (
                <p
                  id="project-name-error"
                  role="alert"
                  className="mt-2 text-sm text-red-300"
                >
                  {state.fieldErrors.name[0]}
                </p>
              ) : null}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="project-type"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Project type
                </label>

                <select
                  id="project-type"
                  name="type"
                  defaultValue="video"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                >
                  <option value="video">Video</option>
                  <option value="audio">Audio</option>
                  <option value="social">Social content</option>
                  <option value="writing">Writing</option>
                  <option value="other">Other</option>
                </select>

                {state.fieldErrors?.type ? (
                  <p role="alert" className="mt-2 text-sm text-red-300">
                    {state.fieldErrors.type[0]}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="target-date"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Target date
                </label>

                <input
                  id="target-date"
                  name="targetDate"
                  type="date"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                />

                {state.fieldErrors?.targetDate ? (
                  <p role="alert" className="mt-2 text-sm text-red-300">
                    {state.fieldErrors.targetDate[0]}
                  </p>
                ) : null}
              </div>
            </div>

            <div>
              <label
                htmlFor="project-description"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Description
                <span className="ml-1 font-normal text-slate-500">
                  (optional)
                </span>
              </label>

              <textarea
                id="project-description"
                name="description"
                rows={4}
                maxLength={2000}
                placeholder="What are you planning to create?"
                className="w-full resize-y rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
              />

              {state.fieldErrors?.description ? (
                <p role="alert" className="mt-2 text-sm text-red-300">
                  {state.fieldErrors.description[0]}
                </p>
              ) : null}
            </div>

            {state.status === "error" && !state.fieldErrors ? (
              <p
                role="alert"
                className="rounded-lg border border-red-900 bg-red-950/60 p-3 text-sm text-red-300"
              >
                {state.message}
              </p>
            ) : null}

            <div className="flex justify-end">
              <SubmitButton />
            </div>
          </form>
        </div>
      ) : null}
    </section>
  );
}
