import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PONYX — The AI Operating System for Startups",
    template: "%s | PONYX",
  },
  description:
    "From idea to first revenue in 7 days. PONYX autonomously validates, builds, tests, and fundraises for startups.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "PONYX — The AI Operating System for Startups",
    description:
      "From idea to first revenue in 7 days. AI that validates, builds, tests, and fundraises for your startup.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PONYX — The AI Operating System for Startups",
    description:
      "From idea to first revenue in 7 days. AI that validates, builds, tests, and fundraises for your startup.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
