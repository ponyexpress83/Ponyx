"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How does PONYX validate my startup idea?",
    a: "Our AI Analyst evaluates your idea across 5 dimensions: Market Size, Competition, Timing, Uniqueness, and Feasibility. It generates a score from 0-100 based on real market patterns and provides actionable recommendations.",
  },
  {
    q: "Do I need technical skills to use PONYX?",
    a: "Not at all. PONYX is designed for non-technical founders. You describe your idea through a simple chat interface, and our AI agents handle everything — from landing page generation to pitch deck creation.",
  },
  {
    q: "What's the SIF Contract?",
    a: "SIF stands for 'Strumento di Investimento Futuro' (Future Investment Instrument). For high-potential startups, we offer a low upfront fee in exchange for a share of future revenue. It aligns our success with yours.",
  },
  {
    q: "Can PONYX really build my MVP in 7 days?",
    a: "Yes. Our AI generates landing pages, marketing copy, product architecture, and go-to-market strategies. While it's not a full production app, it's enough to validate demand, acquire first users, and make data-driven decisions.",
  },
  {
    q: "What happens after Day 7?",
    a: "You get a decision report: scale or pivot. If the signals are strong, you proceed with full development. If not, you've saved months of wasted effort. Either way, you have data — not assumptions.",
  },
  {
    q: "Is my startup idea safe?",
    a: "Absolutely. Your data is encrypted and never shared. We don't claim ownership of your ideas. Each project is isolated to your account and accessible only by you.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 px-6">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-black md:text-6xl">
            <span className="gradient-text">FAQ</span>
          </h2>
          <p className="mt-4 text-muted">Everything you need to know</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full rounded-xl border border-border bg-surface p-5 text-left transition-colors hover:border-accent-purple/30"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-bold">{faq.q}</h3>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-muted transition-transform",
                      openIndex === index && "rotate-180"
                    )}
                  />
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-sm text-muted leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
