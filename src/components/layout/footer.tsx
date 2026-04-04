export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <span className="text-2xl font-black gradient-text">PONYX</span>
            <p className="mt-2 text-sm text-muted">The AI Operating System for Startups</p>
          </div>
          <div className="flex gap-8 text-sm text-muted">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} PONYX. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
