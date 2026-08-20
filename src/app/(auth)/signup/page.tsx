import SignupForm from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
          CreatorFlow
        </p>

        <h1 className="mt-4 text-2xl font-semibold">Create your account</h1>

        <p className="mt-2 text-sm text-slate-400">
          Start managing your creative workspace.
        </p>

        <SignupForm />
      </section>
    </main>
  );
}
