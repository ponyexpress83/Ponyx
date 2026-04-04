"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-32 px-6">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-black md:text-6xl">
            Ready to build your startup
            <br />
            <span className="gradient-text">with AI?</span>
          </h2>
          <p className="mt-6 text-lg text-muted">
            From idea to validation to product to traction. In days, not months.
          </p>
          <div className="mt-10">
            <Link href="/auth/signin">
              <Button size="xl" className="bg-gradient-to-r from-brand-pink to-brand-magenta hover:opacity-90 group">
                Start your journey
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
