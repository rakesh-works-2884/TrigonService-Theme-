"use client";

export default function NewsletterForm() {
  return (
    <form className="mt-5" onSubmit={(e) => e.preventDefault()}>
      <label className="text-xs font-medium uppercase tracking-wide text-slate-500">Newsletter</label>
      <div className="mt-2 flex gap-2">
        <input
          type="email"
          placeholder="Your email"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-accent focus:outline-none"
        />
        <button className="shrink-0 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-primary-dark hover:bg-accent-light">
          Join
        </button>
      </div>
    </form>
  );
}
