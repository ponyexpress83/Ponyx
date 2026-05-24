"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut, Plus, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-2xl font-black gradient-text">
              PONYX
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/dashboard"
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === "/dashboard"
                    ? "bg-surface text-foreground"
                    : "text-muted hover:text-foreground"
                )}
              >
                <LayoutDashboard className="h-4 w-4" />
                Projects
              </Link>
              <Link
                href="/dashboard/settings"
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === "/dashboard/settings"
                    ? "bg-surface text-foreground"
                    : "text-muted hover:text-foreground"
                )}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {session?.user && (
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted mr-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-light">
                  <User className="h-3.5 w-3.5" />
                </div>
                <span>{session.user.name || session.user.email}</span>
              </div>
            )}
            <Link href="/dashboard?new=true">
              <Button size="sm" className="bg-gradient-to-r from-brand-pink to-brand-magenta hover:opacity-90">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">New Project</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut({ callbackUrl: "/" })}
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 pb-24 md:pb-8">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-around py-2">
          <Link
            href="/dashboard"
            className={cn(
              "flex flex-col items-center gap-1 px-4 py-1.5 text-xs transition-colors",
              pathname === "/dashboard" ? "text-foreground" : "text-muted"
            )}
          >
            <LayoutDashboard className="h-5 w-5" />
            Projects
          </Link>
          <Link
            href="/dashboard?new=true"
            className="flex flex-col items-center gap-1 px-4 py-1.5 text-xs text-brand-pink"
          >
            <Plus className="h-5 w-5" />
            New
          </Link>
          <Link
            href="/dashboard/settings"
            className={cn(
              "flex flex-col items-center gap-1 px-4 py-1.5 text-xs transition-colors",
              pathname === "/dashboard/settings" ? "text-foreground" : "text-muted"
            )}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </div>
      </nav>
    </div>
  );
}
