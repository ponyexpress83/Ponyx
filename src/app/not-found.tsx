import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-black gradient-text">404</h1>
      <p className="mt-4 text-xl font-bold">Page not found</p>
      <p className="mt-2 text-muted max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-lg bg-gradient-to-r from-brand-pink to-brand-magenta px-6 text-sm font-medium text-white hover:opacity-90 transition-opacity"
        >
          Go Home
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex h-10 items-center rounded-lg border border-border px-6 text-sm font-medium hover:bg-surface transition-colors"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
