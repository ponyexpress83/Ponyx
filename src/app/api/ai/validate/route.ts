import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { chatWithAgent } from "@/lib/ai/client";
import { ANALYST_SYSTEM_PROMPT } from "@/lib/ai/analyst";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectId, message, history } = await req.json();

  if (!projectId || !message) {
    return NextResponse.json({ error: "projectId and message required" }, { status: 400 });
  }

  const userId = (session.user as { id: string }).id;
  const project = await prisma.project.findFirst({ where: { id: projectId, userId } });
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  try {
    const contextPrompt = `${ANALYST_SYSTEM_PROMPT}\n\nProject context:\n- Name: ${project.name}\n- Description: ${project.description}`;

    const response = await chatWithAgent(contextPrompt, history || [], message);

    // Save messages
    await prisma.aIMessage.createMany({
      data: [
        { role: "user", content: message, agent: "ANALYST", projectId },
        { role: "assistant", content: response, agent: "ANALYST", projectId },
      ],
    });

    // Extract score if present
    const scoreMatch = response.match(/"score"\s*:\s*(\d+)/);
    const tierMatch = response.match(/"pricingTier"\s*:\s*"(HIGH_POTENTIAL|COMPLEX_BUILD)"/);

    if (scoreMatch) {
      const updateData: { score: number; pricingTier?: string } = { score: parseInt(scoreMatch[1]) };
      if (tierMatch) {
        updateData.pricingTier = tierMatch[1];
      }
      await prisma.project.update({ where: { id: projectId }, data: updateData });
    }

    return NextResponse.json({ response });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "AI request failed";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
