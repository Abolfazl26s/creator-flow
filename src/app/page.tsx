import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
            CreatorFlow
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Manage your creative work in one focused workspace.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Plan scripts, organise production tasks and track progress across
            your video and audio projects.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <div className="flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="rounded-lg bg-cyan-400 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-300"
              >
                Create account
              </Link>

              <Link
                href="/login"
                className="rounded-lg border border-slate-700 px-5 py-3 font-medium text-slate-200 transition hover:border-slate-500"
              >
                Sign in
              </Link>
            </div>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-700 px-5 py-3 font-medium text-slate-200 transition hover:border-slate-500"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
