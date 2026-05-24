"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-2xl font-black gradient-text">
          PONYX
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="#how-it-works" className="text-sm text-muted hover:text-foreground transition-colors">
            How it works
          </Link>
          <Link href="#agents" className="text-sm text-muted hover:text-foreground transition-colors">
            AI Agents
          </Link>
          <Link href="#pricing" className="text-sm text-muted hover:text-foreground transition-colors">
            Pricing
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/signin">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link href="/auth/signin">
            <Button size="sm" className="bg-gradient-to-r from-brand-pink to-brand-magenta hover:opacity-90">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-muted hover:text-foreground"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="flex flex-col gap-4 px-6 py-6">
            <Link href="#how-it-works" onClick={() => setOpen(false)} className="text-sm text-muted hover:text-foreground">
              How it works
            </Link>
            <Link href="#agents" onClick={() => setOpen(false)} className="text-sm text-muted hover:text-foreground">
              AI Agents
            </Link>
            <Link href="#pricing" onClick={() => setOpen(false)} className="text-sm text-muted hover:text-foreground">
              Pricing
            </Link>
            <hr className="border-border" />
            <Link href="/auth/signin" onClick={() => setOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full">Sign In</Button>
            </Link>
            <Link href="/auth/signin" onClick={() => setOpen(false)}>
              <Button size="sm" className="w-full bg-gradient-to-r from-brand-pink to-brand-magenta hover:opacity-90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
