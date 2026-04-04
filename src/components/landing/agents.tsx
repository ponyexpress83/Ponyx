"use client";

import { motion } from "framer-motion";
import { BarChart3, Code2, Rocket, PiggyBank } from "lucide-react";

const agents = [
  {
    name: "AI ANALYST",
    description: "Validates market opportunities, competitive landscape, and demand signals in real time.",
    icon: BarChart3,
    color: "text-accent-purple",
    borderColor: "border-accent-purple",
  },
  {
    name: "AI BUILDER",
    description: "Generates MVPs: landing pages, product prototypes, copy, and design — zero coding required.",
    icon: Code2,
    color: "text-accent-orange",
    borderColor: "border-accent-orange",
  },
  {
    name: "AI GROWTH",
    description: "Launches targeted campaigns, acquires first users, and collects behavioral data.",
    icon: Rocket,
    color: "text-accent-green",
    borderColor: "border-accent-green",
  },
  {
    name: "AI INVESTOR",
    description: "Prepares pitch decks, financial models, and investor-ready data rooms automatically.",
    icon: PiggyBank,
    color: "text-accent-red",
    borderColor: "border-accent-red",
  },
];

export function Agents() {
  return (
    <section id="agents" className="py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-black md:text-6xl">
            Multi-Agent AI System —{" "}
            <span className="gradient-text">AI that executes,</span>
            <br />
            not just assists
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl border ${agent.borderColor}/30 bg-surface p-6 transition-all hover:border-opacity-100 hover:glow`}
            >
              <div className="flex items-start gap-4">
                <div className={`rounded-lg bg-surface-light p-3 ${agent.color}`}>
                  <agent.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${agent.color}`}>{agent.name}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{agent.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-3xl font-black italic text-accent-green leading-tight">
              &ldquo;AI doesn&apos;t assist. It executes.&rdquo;
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-border bg-surface p-6"
          >
            <h4 className="text-sm font-bold text-accent-orange uppercase tracking-wider">Data Flywheel</h4>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Every startup built on PONYX improves the system. Shared learnings. Shared data.{" "}
              <span className="font-bold text-foreground">Network effect that compounds.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
