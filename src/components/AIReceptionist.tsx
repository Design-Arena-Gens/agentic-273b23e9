/* eslint-disable react/no-unescaped-entities */
"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  buildConfirmationSummary,
  craftAssistantResponse,
  extractBookingUpdates,
  formatBookingSummary,
  isReadyToConfirm,
  quickPrompts
} from "@/lib/receptionist";
import type { BookingIntent } from "@/lib/receptionist";
import type { SeatCategory } from "@/data/spaces";

type MessageRole = "assistant" | "user";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

const initialAssistantMessage =
  "Hi there! I'm Lumi, the AI receptionist for LumaDesk. Tell me what you need—seat types, dates, amenities—and I’ll orchestrate everything in one flow.";

export function AIReceptionist() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    createMessage("assistant", initialAssistantMessage)
  ]);
  const [intent, setIntent] = useState<BookingIntent>({
    status: "collecting",
    amenities: []
  });
  const [isThinking, setIsThinking] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const conversationHistory = useMemo(
    () =>
      messages.map((message) => ({
        ...message,
        formattedTime: message.timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      })),
    [messages]
  );

  const readyToConfirm = isReadyToConfirm(intent);

  const handleSubmit = async (value?: string) => {
    const trimmed = (value ?? input).trim();
    if (!trimmed) return;
    setInput("");

    const userMessage = createMessage("user", trimmed);
    setMessages((prev) => [...prev, userMessage]);

    setIsThinking(true);

    await new Promise((resolve) => setTimeout(resolve, 400));

    setIntent((prevIntent) => {
      const updates = extractBookingUpdates(trimmed, prevIntent);
      const nextIntent = { ...prevIntent, ...updates };
      if (readyToConfirm && trimmed.toLowerCase().includes("confirm")) {
        nextIntent.status = "ready";
      }

      const assistantReply = craftAssistantResponse(updates, nextIntent);
      const assistantMessage = createMessage("assistant", assistantReply);

      setMessages((prev) => [...prev, assistantMessage]);
      setIsThinking(false);
      return nextIntent;
    });
  };

  const handleConfirm = () => {
    setIntent((prev) => {
      if (!isReadyToConfirm(prev)) return prev;
      const confirmation = createMessage(
        "assistant",
        `Perfect, I’ve secured this for you.\n\n${buildConfirmationSummary({
          ...prev,
          status: "confirmed"
        })}\n\nNeed travel directions, guest check-in, or follow-up notes scheduled? Just ask!`
      );
      setMessages((current) => [...current, confirmation]);
      return {
        ...prev,
        status: "confirmed"
      };
    });
  };

  const handleReset = () => {
    setIntent({
      status: "collecting",
      amenities: []
    });
    setMessages([createMessage("assistant", initialAssistantMessage)]);
    setAttempts((prev) => prev + 1);
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,0.35fr)]">
      <div className="relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-floating">
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4 text-sm uppercase tracking-[0.3em] text-slate-300">
          <span>Concierge conversation</span>
          <span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs text-brand-200">
            Live
          </span>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
          <AnimatePresence initial={false}>
            {conversationHistory.map((message) => (
              <motion.div
                key={`${message.id}-${attempts}`}
                initial={{ opacity: 0, y: message.role === "assistant" ? 10 : 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-col gap-1"
              >
                <div
                  className={
                    message.role === "assistant"
                      ? "self-start rounded-2xl rounded-bl-sm bg-white/10 px-5 py-3 text-sm text-slate-100 backdrop-blur"
                      : "self-end rounded-2xl rounded-br-sm bg-brand-500 px-5 py-3 text-sm text-white"
                  }
                >
                  <RichText content={message.content} />
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  {message.role === "assistant" ? "Lumi Concierge" : "You"} •{" "}
                  {message.formattedTime}
                </span>
              </motion.div>
            ))}
            {isThinking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="self-start rounded-2xl rounded-bl-sm bg-white/10 px-5 py-3 text-sm text-slate-100"
              >
                <div className="flex items-center gap-2">
                  <span className="block h-2 w-2 animate-pulse rounded-full bg-brand-400" />
                  <span className="block h-2 w-2 animate-pulse rounded-full bg-brand-400" />
                  <span className="block h-2 w-2 animate-pulse rounded-full bg-brand-400" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <QuickPromptRail onSelect={handleSubmit} />
        <form
          className="border-t border-white/10 bg-white/[0.03] px-6 py-4"
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit();
          }}
        >
          <label htmlFor="chat-input" className="sr-only">
            Compose message
          </label>
          <div className="flex items-end gap-3">
            <textarea
              id="chat-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask me to reserve a space, coordinate guests, or plan an itinerary..."
              className="min-h-[72px] flex-1 resize-none rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/40"
            />
            <button
              type="submit"
              className="rounded-2xl bg-brand-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/50"
            >
              Send
            </button>
          </div>
        </form>
      </div>
      <div className="space-y-6">
        <BookingSummary intent={intent} onReset={handleReset} onConfirm={handleConfirm} />
        <ServicePlaybooks />
      </div>
    </section>
  );
}

function BookingSummary({
  intent,
  onConfirm,
  onReset
}: {
  intent: BookingIntent;
  onConfirm: () => void;
  onReset: () => void;
}) {
  const ready = isReadyToConfirm(intent);
  const summary = formatBookingSummary(intent);
  const statusMessage = (() => {
    switch (intent.status) {
      case "confirmed":
        return "Reservation locked • Confirmation sent";
      case "ready":
        return "Ready to finalize";
      case "collecting":
      default:
        return "Gathering requirements";
    }
  })();

  return (
    <aside className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-floating">
      <header className="space-y-1">
        <h3 className="text-xl font-semibold text-slate-100">Booking blueprint</h3>
        <p className="text-sm text-slate-400">
          Lumi continuously learns from your conversation to fill key details.
        </p>
      </header>
      <div className="space-y-3 text-sm">
        <StatusBadge status={intent.status ?? "collecting"} message={statusMessage} />
        {summary ? (
          <p className="leading-relaxed text-slate-200">{summary}</p>
        ) : (
          <p className="text-slate-500">
            Start chatting to capture date, guests, preferred space, and amenities.
          </p>
        )}
      </div>
      <dl className="grid gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm">
        <BookingLine label="Contact" value={intent.name} secondary={intent.email} />
        <BookingLine
          label="Schedule"
          value={
            intent.date
              ? `${intent.date} ${intent.startTime ? `• ${intent.startTime}–${intent.endTime}` : ""}`
              : undefined
          }
        />
        <BookingLine label="Guests" value={intent.attendees ? `${intent.attendees}` : undefined} />
        <BookingLine label="Space" value={intent.seatCategory} />
        <BookingLine
          label="Amenities"
          value={intent.amenities && intent.amenities.length ? intent.amenities.join(", ") : undefined}
        />
        <BookingLine label="Purpose" value={intent.purpose} />
      </dl>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!ready || intent.status === "confirmed"}
          onClick={onConfirm}
          className="flex-1 rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition enabled:hover:bg-brand-400 disabled:cursor-not-allowed disabled:bg-brand-500/40"
        >
          Confirm reservation
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-300 transition hover:border-white/30 hover:text-white"
        >
          Reset
        </button>
      </div>
    </aside>
  );
}

function StatusBadge({
  status,
  message
}: {
  status: BookingIntent["status"];
  message: string;
}) {
  const color =
    status === "confirmed"
      ? "bg-emerald-500/20 text-emerald-300"
      : status === "ready"
        ? "bg-brand-500/20 text-brand-200"
        : "bg-slate-700/40 text-slate-300";

  return (
    <span
      className={`inline-flex items-center gap-2 self-start rounded-full px-3 py-1 text-xs uppercase tracking-[0.3em] ${color}`}
    >
      <span className="h-2 w-2 rounded-full bg-current" />
      {message}
    </span>
  );
}

function BookingLine({
  label,
  value,
  secondary
}: {
  label: string;
  value?: string | SeatCategory | undefined;
  secondary?: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs uppercase tracking-[0.3em] text-slate-500">{label}</span>
      {value ? (
        <span className="text-sm font-medium text-slate-100">{value}</span>
      ) : (
        <span className="text-sm text-slate-500">Pending</span>
      )}
      {secondary && <span className="text-xs text-slate-400">{secondary}</span>}
    </div>
  );
}

function QuickPromptRail({ onSelect }: { onSelect: (value: string) => void }) {
  return (
    <div className="border-y border-white/10 bg-white/[0.03] px-6 py-3">
      <div className="scrollbar-thin flex items-center gap-3 overflow-x-auto text-xs text-slate-200">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onSelect(prompt)}
            className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-brand-400/50 hover:text-white"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

function RichText({ content }: { content: string }) {
  const segments = content.split("\n");
  return (
    <>
      {segments.map((segment, index) =>
        segment.startsWith("✅") ||
        segment.startsWith("📅") ||
        segment.startsWith("⏰") ||
        segment.startsWith("👥") ||
        segment.startsWith("📍") ||
        segment.startsWith("🎯") ||
        segment.startsWith("📝") ||
        segment.startsWith("✉️") ? (
          <p key={index} className="text-sm text-slate-100">
            {segment}
          </p>
        ) : (
          <p key={index} className="text-sm leading-relaxed text-slate-100">
            {segment}
          </p>
        )
      )}
    </>
  );
}

function ServicePlaybooks() {
  const playbooks = [
    {
      title: "Hybrid meeting handshake",
      items: [
        "Syncs with calendars to hold room and remote bridge",
        "Schedules technical checks with AV concierge",
        "Pushes pre-reads to all attendees and automates recap"
      ]
    },
    {
      title: "Drop-in day orchestration",
      items: [
        "Maps team arrivals to hot desks and lockers",
        "Coordinates guest passes with security kiosk",
        "Reserves lunch tables and wellness breaks"
      ]
    },
    {
      title: "Executive client arrival",
      items: [
        "Books premium suite with catering timeline",
        "Queues branded signage and white-glove welcome",
        "Packages follow-up notes and gratitude email"
      ]
    }
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold text-slate-100">Automation playbooks</h3>
      <p className="mt-2 text-sm text-slate-400">
        Drop hints like “also invite our London pod” and Lumi will expand the workflow.
      </p>
      <ul className="mt-4 space-y-4 text-sm text-slate-200">
        {playbooks.map((playbook) => (
          <li key={playbook.title} className="rounded-2xl border border-white/5 bg-slate-900/60 p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-200">
              {playbook.title}
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-300">
              {playbook.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

function createMessage(role: MessageRole, content: string): Message {
  return {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36),
    role,
    content,
    timestamp: new Date()
  };
}
