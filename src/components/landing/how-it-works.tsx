"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "VALUTAZIONE",
    description: "L'AI valuta la tua idea rispetto ai dati di mercato reali in pochi minuti.",
    color: "text-accent-purple",
    borderColor: "border-accent-purple",
  },
  {
    number: "02",
    title: "BUILD",
    description: "Generazione istantanea di MVP: landing page, prodotto, copy.",
    color: "text-accent-orange",
    borderColor: "border-accent-orange",
  },
  {
    number: "03",
    title: "TEST",
    description: "Utenti reali, feedback reali, segnali reali in 72 ore.",
    color: "text-accent-green",
    borderColor: "border-accent-green",
  },
  {
    number: "04",
    title: "RAISE",
    description: "Pitch deck, modelli finanziari e data room pronti per gli investitori.",
    color: "text-accent-red",
    borderColor: "border-accent-red",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-black md:text-6xl">
            Autonomous{" "}
            <span className="gradient-text">Startup Creation</span>
          </h2>
          <p className="mt-4 text-lg font-bold text-accent-orange uppercase tracking-wider">
            One system. From idea to traction. Without a team.
          </p>
          <p className="mt-6 max-w-3xl text-lg text-muted">
            <span className="font-bold text-foreground">PONYX</span> is the first AI Operating System that
            autonomously validates, builds, tests, and fundraises for startups — compressing months of work into days.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`border-t-2 ${step.borderColor} pt-6`}
            >
              <span className={`text-3xl font-black ${step.color}`}>{step.number}</span>
              <h3 className="mt-2 text-xl font-bold">{step.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center text-xl italic text-accent-green"
        >
          &ldquo;From idea &rarr; validation &rarr; product &rarr; traction. In days, not months.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
