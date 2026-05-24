import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { mockChatWithAgent } from "@/lib/ai/mock";

export async function POST() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;

  const project = await prisma.project.create({
    data: {
      name: "EcoTrack",
      description: "An AI-powered carbon footprint tracker for small businesses. Automatically monitors energy usage, travel, and supply chain emissions, then suggests actionable reductions. SaaS model with freemium tier targeting SMBs in the EU market.",
      userId,
      phase: "BUILD",
    },
  });

  const validateResult = mockChatWithAgent(
    "validate",
    project.name,
    project.description,
    [
      { role: "user", content: "Analyze this startup idea: EcoTrack - an AI carbon footprint tracker for SMBs." },
      { role: "assistant", content: "I'll analyze EcoTrack. Let me ask some questions about your target market and revenue model." },
      { role: "user", content: "We're targeting EU small businesses with 10-200 employees. Freemium SaaS with pro tier at €49/month. Main competitors are Watershed and Sweep but they focus on enterprise. Our AI automatically pulls data from accounting software and utility providers." },
    ],
    "We have a working prototype and 3 pilot customers. The team has 2 co-founders - one with 8 years in sustainability consulting and one senior ML engineer."
  );

  await prisma.aIMessage.createMany({
    data: [
      { role: "user", content: "Analyze this startup idea: EcoTrack - an AI carbon footprint tracker for SMBs.", agent: "ANALYST", projectId: project.id },
      { role: "assistant", content: "I'll analyze EcoTrack. Let me ask some questions about your target market and revenue model.", agent: "ANALYST", projectId: project.id },
      { role: "user", content: "We're targeting EU small businesses with 10-200 employees. Freemium SaaS with pro tier at €49/month. Main competitors are Watershed and Sweep but they focus on enterprise. Our AI automatically pulls data from accounting software and utility providers.", agent: "ANALYST", projectId: project.id },
      { role: "assistant", content: "Excellent insights! Let me evaluate the market dynamics and feasibility.", agent: "ANALYST", projectId: project.id },
      { role: "user", content: "We have a working prototype and 3 pilot customers. The team has 2 co-founders - one with 8 years in sustainability consulting and one senior ML engineer.", agent: "ANALYST", projectId: project.id },
      { role: "assistant", content: validateResult.response, agent: "ANALYST", projectId: project.id },
    ],
  });

  await prisma.project.update({
    where: { id: project.id },
    data: {
      score: validateResult.score ?? 78,
      pricingTier: validateResult.pricingTier ?? "HIGH_POTENTIAL",
    },
  });

  return NextResponse.json(project, { status: 201 });
}
