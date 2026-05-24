"use client";

import { motion } from "framer-motion";

const metrics = [
  { value: "7", suffix: " days", label: "From idea to revenue" },
  { value: "4", suffix: " AI agents", label: "Working for you 24/7" },
  { value: "10", suffix: "x", label: "Faster than traditional approach" },
  { value: "€1.5", suffix: "K", label: "Launch package starting at" },
];

export function Metrics() {
  return (
    <section className="py-20 px-6 border-y border-border">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl font-black md:text-5xl">
                <span className="gradient-text">{metric.value}</span>
                <span className="text-foreground">{metric.suffix}</span>
              </p>
              <p className="mt-2 text-sm text-muted">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
