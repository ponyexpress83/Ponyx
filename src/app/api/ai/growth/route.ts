import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { chatWithAgent } from "@/lib/ai/client";
import { GROWTH_SYSTEM_PROMPT } from "@/lib/ai/growth";

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
    const contextPrompt = `${GROWTH_SYSTEM_PROMPT}\n\nProject context:\n- Name: ${project.name}\n- Description: ${project.description}\n- Validation Score: ${project.score ?? "Not yet validated"}\n- Pricing Tier: ${project.pricingTier ?? "Not assessed"}`;

    const response = await chatWithAgent(contextPrompt, history || [], message);

    await prisma.aIMessage.createMany({
      data: [
        { role: "user", content: message, agent: "GROWTH", projectId },
        { role: "assistant", content: response, agent: "GROWTH", projectId },
      ],
    });

    return NextResponse.json({ response });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "AI request failed";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
