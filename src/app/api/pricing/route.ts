import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { calculatePricing } from "@/lib/pricing";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectId, isB2B } = await req.json();

  if (!projectId) {
    return NextResponse.json({ error: "projectId required" }, { status: 400 });
  }

  const userId = (session.user as { id: string }).id;
  const project = await prisma.project.findFirst({ where: { id: projectId, userId } });

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  if (project.score === null) {
    return NextResponse.json({ error: "Project must be validated first" }, { status: 400 });
  }

  const pricing = calculatePricing(project.score, isB2B);

  await prisma.project.update({
    where: { id: projectId },
    data: { pricingTier: pricing.tier },
  });

  return NextResponse.json(pricing);
}
