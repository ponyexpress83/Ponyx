import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Timeline } from "@/components/landing/timeline";
import { Agents } from "@/components/landing/agents";
import { Pricing } from "@/components/landing/pricing";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Timeline />
        <Agents />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
