import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PONYX — The AI Operating System for Startups",
  description:
    "From idea to first revenue in 7 days. PONYX autonomously validates, builds, tests, and fundraises for startups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
