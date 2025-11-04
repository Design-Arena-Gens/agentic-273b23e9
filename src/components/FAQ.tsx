const faqs = [
  {
    question: "Can Lumi coordinate recurring seat reservations for hybrid teams?",
    answer:
      "Absolutely. Ask for a cadence like “every Tuesday afternoon for the design guild” and Lumi stores the series, syncs it to calendars, and releases seats if headcount changes."
  },
  {
    question: "How does the assistant respect workspace access policies?",
    answer:
      "The concierge cross-references your team roster, membership tiers, and meeting security level before confirming. If anything needs human approval, Lumi routes it with context."
  },
  {
    question: "What if guests need onboarding or visitor passes?",
    answer:
      "Mention your visitors and Lumi prepares QR passes, schedules lobby check-in, and pushes welcome instructions. Front-desk staff get a briefing with arrival times and preferences."
  },
  {
    question: "Does the AI integrate with our existing tools?",
    answer:
      "Yes. Lumi syncs with calendar providers, workplace sensors, catering, and IT ticketing. Custom webhooks let you extend the workflow into CRMs or HR systems."
  }
];

export function FAQ() {
  return (
    <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
      <header>
        <h3 className="text-2xl font-semibold text-slate-100">Frequently asked</h3>
        <p className="mt-2 text-sm text-slate-400">
          Concierge policies are transparent—here are the details teams ask about most.
        </p>
      </header>
      <dl className="space-y-5">
        {faqs.map((item) => (
          <div key={item.question} className="space-y-2 rounded-2xl border border-white/5 bg-white/5 p-4">
            <dt className="text-sm font-semibold text-slate-100">{item.question}</dt>
            <dd className="text-sm text-slate-300">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
