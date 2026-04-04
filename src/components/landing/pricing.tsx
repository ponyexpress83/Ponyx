"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export function Pricing() {
  return (
    <section id="pricing" className="py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-black md:text-6xl">
            <span className="gradient-text">AI-Driven</span> Dynamic Pricing
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            No SaaS subscriptions. Our AI evaluates the startup&apos;s potential on Day 1 and dynamically adjusts
            the pricing model to align our success with theirs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* High Potential */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-xl border border-border bg-surface p-8 gradient-border"
          >
            <Badge className="absolute -top-3 right-6 bg-gradient-to-r from-brand-pink to-brand-magenta text-white border-0">
              CORE MODEL
            </Badge>
            <h3 className="text-2xl font-black gradient-text">High Potential Startup</h3>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              The AI detects strong market fit and high scalability. We invest our tech resources to maximize future upside.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
                <span className="text-sm text-muted">Upfront Fee</span>
                <span className="font-bold">Low (e.g. &euro;1.500)</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
                <span className="text-sm text-muted">Future Upside</span>
                <span className="font-bold">High % (SIF Contract)</span>
              </div>
            </div>
          </motion.div>

          {/* Complex Build */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-border bg-surface p-8"
          >
            <h3 className="text-2xl font-black">Complex Build / Low Potential</h3>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              The project requires heavy custom development or operates in a niche with limited venture scalability.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
                <span className="text-sm text-muted">Upfront Fee</span>
                <span className="font-bold">High (Market Rate)</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
                <span className="text-sm text-muted">Future Upside</span>
                <span className="font-bold">None / Minimal</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* B2B Exception */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-xl border-l-4 border-accent-orange bg-surface p-6"
        >
          <h4 className="text-sm font-bold text-accent-orange uppercase tracking-wider">
            B2B Exception: Incubators &amp; Tech Hubs
          </h4>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            For incubators launching multiple startups per year, we offer a{" "}
            <span className="font-bold text-foreground">fixed retainer/SaaS model</span>. They get a dedicated AI
            tech partner at a fraction of the cost of an internal dev team.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
