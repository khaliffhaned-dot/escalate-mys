import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-100 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[700px] h-[700px] bg-emerald-500/[0.07] rounded-full blur-3xl" />
        <div className="absolute top-20 -right-40 w-[500px] h-[500px] bg-teal-500/[0.06] rounded-full blur-3xl" />
      </div>

      <nav className="relative z-10 max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5 font-semibold tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-[#0a0a0a] text-sm font-bold">E</div>
          <span>Escalate MY</span>
        </div>
        <div className="flex items-center gap-5 text-sm">
          <Link href="/login" className="text-neutral-300 hover:text-white transition">Sign in</Link>
          <Link href="/dashboard" className="px-4 py-2 bg-emerald-500 text-[#0a0a0a] rounded-full text-sm font-medium hover:bg-emerald-400 active:scale-[0.98] transition">
            Launch Dashboard
          </Link>
        </div>
      </nav>

      <section className="relative z-10 max-w-3xl mx-auto px-6 pt-16 pb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-xs text-emerald-300 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Crisis Governance Platform
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
          The First Hour<br />Decides Everything.
        </h1>
        <p className="mt-6 text-lg text-neutral-400 leading-relaxed">
          Govern critical incidents with structured workflows for regulatory obligations, executive decisions, evidence records and board reporting.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard" className="px-6 py-3 bg-emerald-500 text-[#0a0a0a] rounded-full text-sm font-medium hover:bg-emerald-400 active:scale-[0.98] transition inline-flex items-center justify-center gap-2">
            Enter Situation Room <span aria-hidden>→</span>
          </Link>
          <Link href="/login" className="px-6 py-3 border border-neutral-700 rounded-full text-sm hover:bg-white/5 transition">
            Sign in
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.06] py-8 text-center text-xs text-neutral-600">
        Escalate MY™ · Crisis Governance Platform for Malaysian Organisations
      </footer>
    </main>
  );
}
