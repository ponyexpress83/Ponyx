export type PricingTier = "HIGH_POTENTIAL" | "COMPLEX_BUILD" | "B2B_RETAINER";

export interface PricingResult {
  tier: PricingTier;
  upfrontFee: string;
  futureUpside: string;
  description: string;
}

export function calculatePricing(score: number, isB2B: boolean = false): PricingResult {
  if (isB2B) {
    return {
      tier: "B2B_RETAINER",
      upfrontFee: "Fixed Retainer",
      futureUpside: "SaaS Model",
      description: "Dedicated AI tech partner at a fraction of the cost of an internal dev team.",
    };
  }

  if (score >= 65) {
    return {
      tier: "HIGH_POTENTIAL",
      upfrontFee: "Low (e.g. €1.500)",
      futureUpside: "High % (SIF Contract)",
      description:
        "Strong market fit and high scalability detected. We invest our tech resources to maximize future upside.",
    };
  }

  return {
    tier: "COMPLEX_BUILD",
    upfrontFee: "High (Market Rate)",
    futureUpside: "None / Minimal",
    description:
      "Project requires heavy custom development or operates in a niche with limited venture scalability.",
  };
}
