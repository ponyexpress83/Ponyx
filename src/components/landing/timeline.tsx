"use client";

import { motion } from "framer-motion";

const phases = [
  {
    day: "DAY 1",
    label: "VALUTAZIONE",
    description: "Voice/Video input → L'AI valuta la tua idea rispetto ai dati di mercato reali in pochi minuti.",
    color: "bg-accent-purple",
    textColor: "text-accent-purple",
  },
  {
    day: "DAYS 2–7",
    label: "BUILD",
    description: "Generazione MVP con AI: landing page, prodotto, copy. Zero codice necessario.",
    color: "bg-accent-orange",
    textColor: "text-accent-orange",
  },
  {
    day: "DAYS 8–12",
    label: "VALIDATION",
    description: "Utenti reali, feedback reali, segnali reali. Inizia il market testing.",
    color: "bg-accent-green",
    textColor: "text-accent-green",
  },
  {
    day: "DAYS 13–15",
    label: "RAISE",
    description: "Pitch deck, modelli finanziari e data room generati automaticamente.",
    color: "bg-accent-red",
    textColor: "text-accent-red",
  },
];

export function Timeline() {
  return (
    <section className="py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-4xl font-black md:text-6xl"
        >
          Autonomous{" "}
          <span className="gradient-text">Startup Creation</span>
        </motion.h2>

        {/* Timeline bar */}
        <div className="relative mb-12">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />
          <div className="flex justify-between">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative z-10"
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded border-2 border-current ${phase.textColor} bg-background text-xs font-bold`}>
                  {String(index + 1).padStart(2, "0")}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Phase details */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-lg font-bold">{phase.day}</h3>
              <div className="mt-2 flex items-center gap-2">
                <div className={`h-full w-1 self-stretch ${phase.color} rounded`} />
                <div>
                  <span className={`text-sm font-semibold ${phase.textColor}`}>{phase.label}</span>
                  <p className="mt-1 text-sm text-muted leading-relaxed">{phase.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 rounded-xl border border-border bg-surface p-6"
        >
          <p className="text-muted">
            <span className="font-bold text-foreground">Process simplicity:</span>{" "}
            Just chat with our AI via voice message or short video. PONYX evaluates the potential instantly and
            generates a dynamic pricing model tailored to your startup&apos;s value.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-xl italic text-accent-green"
        >
          &ldquo;From idea &rarr; valuation &rarr; product &rarr; traction. In 15 days.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
