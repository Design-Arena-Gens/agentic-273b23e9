export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 p-10 md:p-16 shadow-floating">
      <div className="absolute -left-16 top-16 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="absolute -right-10 bottom-10 h-72 w-72 rounded-full bg-teal-400/30 blur-3xl" />
      <div className="relative grid gap-10 md:grid-cols-[minmax(0,0.65fr)_minmax(0,0.35fr)]">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-brand-500/10 px-4 py-1 text-sm font-medium text-brand-200 ring-1 ring-brand-500/40">
            LumaDesk Concierge • Instant bookings powered by AI
          </span>
          <h1 className="text-4xl font-semibold md:text-5xl">
            Welcome to your autonomous workplace concierge
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Ask for the ideal seat, plan a client session, or coordinate hybrid
            visits—our AI receptionist understands context, checks space
            availability, and crafts a polished itinerary with one conversation.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-300">
            <FeaturePill label="Adaptive capacity planning" />
            <FeaturePill label="Policy-aware scheduling" />
            <FeaturePill label="Smart follow-up automations" />
          </div>
        </div>
        <div className="relative mx-auto max-w-sm rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-200">
            Live Occupancy
          </div>
          <div className="mt-6 space-y-4">
            <OccupancyBar label="Focus pods" percentage={35} />
            <OccupancyBar label="Collaboration hubs" percentage={48} />
            <OccupancyBar label="Strategy suites" percentage={62} />
            <OccupancyBar label="Recharge lounge" percentage={28} />
          </div>
          <p className="mt-6 text-xs text-slate-400">
            Synced every 90 seconds from smart access sensors and desk presence
            analytics.
          </p>
        </div>
      </div>
    </section>
  );
}

function FeaturePill({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-slate-300">
      <span className="block h-2 w-2 rounded-full bg-brand-400" />
      {label}
    </div>
  );
}

function OccupancyBar({ label, percentage }: { label: string; percentage: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-slate-200">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-brand-400/80 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
