"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-accent-purple/10 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-[300px] w-[400px] rounded-full bg-brand-magenta/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Pre-seed badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm"
        >
          <Sparkles className="h-4 w-4 text-accent-green" />
          <span className="text-muted">Pre-Seed Round</span>
          <span className="font-bold text-accent-green">&euro;750,000</span>
        </motion.div>

        {/* Main heading */}
        <h1 className="max-w-4xl text-6xl font-black leading-tight tracking-tight md:text-8xl">
          <span className="gradient-text">PONYX</span>
        </h1>

        <h2 className="mt-6 max-w-2xl text-2xl font-bold md:text-4xl">
          The AI Operating System for Startups
        </h2>

        <p className="mt-6 max-w-xl text-lg text-muted">
          We don&apos;t help founders build startups.{" "}
          <span className="font-semibold text-foreground">We build startups with them.</span>
        </p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link href="/auth/signin">
            <Button size="xl" className="bg-gradient-to-r from-brand-pink to-brand-magenta hover:opacity-90 group">
              From idea to first revenue — in 7 days
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
