const stats = [
  {
    label: "Active projects",
    value: "8",
    change: "+2 this month",
  },
  {
    label: "Open tasks",
    value: "24",
    change: "6 due this week",
  },
  {
    label: "Completed tasks",
    value: "142",
    change: "+18% this month",
  },
  {
    label: "Hours tracked",
    value: "86.5",
    change: "+12.4% this month",
  },
];

const recentProjects = [
  {
    name: "Summer campaign",
    type: "Video production",
    progress: 72,
    status: "In progress",
  },
  {
    name: "Podcast episode 12",
    type: "Audio production",
    progress: 45,
    status: "In progress",
  },
  {
    name: "CreatorFlow launch",
    type: "Product project",
    progress: 88,
    status: "Almost done",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
            Overview
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Good afternoon
          </h1>

          <p className="mt-2 text-slate-400">
            Here is what is happening across your creative workspace.
          </p>
        </div>

        <button
          type="button"
          className="rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-cyan-300"
        >
          New project
        </button>
      </div>

      <section
        aria-label="Workspace statistics"
        className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5"
          >
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold">{stat.value}</p>
            <p className="mt-2 text-xs text-emerald-400">{stat.change}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-xl border border-slate-800 bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <div>
            <h2 className="font-semibold">Recent projects</h2>
            <p className="mt-1 text-sm text-slate-500">
              Your latest creative work.
            </p>
          </div>

          <a
            href="/dashboard/projects"
            className="text-sm text-cyan-400 hover:text-cyan-300"
          >
            View all
          </a>
        </div>

        <div className="divide-y divide-slate-800">
          {recentProjects.map((project) => (
            <article
              key={project.name}
              className="grid gap-4 px-5 py-5 md:grid-cols-[1fr_160px_120px] md:items-center"
            >
              <div>
                <h3 className="font-medium">{project.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{project.type}</p>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-xs text-slate-500">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>

                <div className="h-2 rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-cyan-400"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <span className="text-sm text-amber-300">{project.status}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
