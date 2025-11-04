import Image from "next/image";
import { clsx } from "clsx";
import { workspaces } from "@/data/spaces";

export function SeatShowcase() {
  return (
    <section className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold">Spaces curated for how your team works</h2>
          <p className="mt-2 max-w-2xl text-base text-slate-300">
            Every area is mapped with real-time telemetry so the concierge can match
            your request with availability, ambience, and equipment requirements.
          </p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300">
          Sensor-backed insights
        </div>
      </header>
      <div className="grid gap-6 lg:grid-cols-2">
        {workspaces.map((space) => (
          <article
            key={space.id}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-floating ring-1 ring-white/5 transition hover:-translate-y-1"
          >
            <div className="grid gap-4 p-6 md:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] md:gap-8 lg:gap-10">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={space.image}
                  alt={space.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={clsx(
                    "mb-3 inline-flex items-center gap-2 self-start rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em]",
                    categoryPillColor(space.category)
                  )}
                >
                  <span className="h-2 w-2 rounded-full bg-current" />
                  {space.category}
                </span>
                <h3 className="text-2xl font-semibold text-slate-100">{space.name}</h3>
                <p className="mt-3 text-sm text-slate-300">{space.description}</p>
                <dl className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-300">
                  <div>
                    <dt className="uppercase tracking-wide text-xs text-slate-400">
                      Capacity
                    </dt>
                    <dd className="mt-1 text-base font-medium text-slate-100">
                      Up to {space.capacity} guests
                    </dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-wide text-xs text-slate-400">
                      Peak occupancy
                    </dt>
                    <dd className="mt-1 text-base font-medium text-slate-100">
                      {seatLoad(space.availability)}%
                    </dd>
                  </div>
                </dl>
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Signature amenities
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2 text-xs text-slate-200">
                    {space.amenities.map((amenity) => (
                      <li
                        key={amenity}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                      >
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto pt-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Availability by block
                  </p>
                  <ul className="mt-3 grid gap-2 text-sm">
                    {space.availability.map((slot) => (
                      <li
                        key={`${space.id}-${slot.start}`}
                        className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-2"
                      >
                        <span className="text-slate-200">
                          {slot.start} – {slot.end}
                        </span>
                        <span className="text-slate-400">{slot.occupancy}% utilized</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function seatLoad(entries: { occupancy: number }[]) {
  if (!entries.length) {
    return 0;
  }

  const total = entries.reduce((acc, entry) => acc + entry.occupancy, 0);
  return Math.round(total / entries.length);
}

function categoryPillColor(category: string) {
  switch (category) {
    case "focus":
      return "text-brand-200";
    case "collaboration":
      return "text-teal-300";
    case "meeting":
      return "text-amber-300";
    case "lounge":
      return "text-emerald-300";
    default:
      return "text-slate-200";
  }
}
