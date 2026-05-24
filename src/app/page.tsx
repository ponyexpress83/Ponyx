import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/landing/hero";
import { Metrics } from "@/components/landing/metrics";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Timeline } from "@/components/landing/timeline";
import { Agents } from "@/components/landing/agents";
import { Pricing } from "@/components/landing/pricing";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Metrics />
      <HowItWorks />
      <Timeline />
      <Agents />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
