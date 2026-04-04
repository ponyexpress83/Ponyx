"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-2xl font-black gradient-text">
          PONYX
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <Link href="#how-it-works" className="text-sm text-muted hover:text-foreground transition-colors">
            Come funziona
          </Link>
          <Link href="#agents" className="text-sm text-muted hover:text-foreground transition-colors">
            AI Agents
          </Link>
          <Link href="#pricing" className="text-sm text-muted hover:text-foreground transition-colors">
            Pricing
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/auth/signin">
            <Button variant="ghost" size="sm">Accedi</Button>
          </Link>
          <Link href="/auth/signin">
            <Button size="sm" className="bg-gradient-to-r from-brand-pink to-brand-magenta hover:opacity-90">
              Inizia ora
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
