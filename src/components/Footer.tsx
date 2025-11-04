export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 py-8 text-sm text-slate-500">
      <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between">
        <p>LumaDesk Concierge • Crafted to keep teams fluid, focused, and welcomed.</p>
        <div className="flex items-center justify-center gap-4 text-xs uppercase tracking-[0.3em]">
          <span>Privacy-first AI</span>
          <span>24/7 Human Oversight</span>
          <span>ISO 27001</span>
        </div>
      </div>
    </footer>
  );
}
