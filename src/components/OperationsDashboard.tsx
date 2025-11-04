import { Activity, BellRing, CalendarClock, Headphones } from "lucide-react";

const metrics = [
  {
    icon: CalendarClock,
    label: "Reservations today",
    value: "42 holds",
    delta: "+18% vs avg",
    tone: "text-brand-200"
  },
  {
    icon: Activity,
    label: "Occupancy thru noon",
    value: "68%",
    delta: "Well-balanced",
    tone: "text-emerald-300"
  },
  {
    icon: Headphones,
    label: "Assistant escalations",
    value: "2 of 95",
    delta: "Handled by humans",
    tone: "text-amber-200"
  },
  {
    icon: BellRing,
    label: "Workflow automations",
    value: "17 running",
    delta: "6 concierge tasks",
    tone: "text-sky-300"
  }
];

export function OperationsDashboard() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">
            Concierge control panel snapshot
          </h3>
          <p className="text-sm text-slate-400">
            Operational signals refresh every 90 seconds from building sensors and calendar sync.
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-slate-900/70 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-400">
          Insights • Live
        </span>
      </header>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="flex items-center gap-4 rounded-2xl border border-white/5 bg-slate-900/60 px-4 py-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
              <metric.icon className={`h-5 w-5 ${metric.tone}`} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                {metric.label}
              </p>
              <p className="text-sm font-semibold text-slate-100">{metric.value}</p>
              <p className="text-xs text-slate-400">{metric.delta}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
