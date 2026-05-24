"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "We went from a napkin idea to a validated MVP with real user signups in 5 days. PONYX compressed what would have taken us 3 months.",
    name: "Marco R.",
    role: "Founder, AI fitness startup",
  },
  {
    quote: "The validation score saved us from building the wrong product. We pivoted early and found product-market fit on our second iteration.",
    name: "Sofia L.",
    role: "Co-founder, EdTech platform",
  },
  {
    quote: "As an incubator, we use PONYX for every new cohort. It gives our founders a 10x head start compared to traditional methods.",
    name: "Alessandro B.",
    role: "Director, Tech Accelerator",
  },
];

export function Testimonials() {
  return (
    <section className="py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-black md:text-6xl">
            What founders{" "}
            <span className="gradient-text">say</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <Quote className="h-6 w-6 text-accent-purple mb-4" />
              <p className="text-sm text-muted leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-bold">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
