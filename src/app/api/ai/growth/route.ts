import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { mockChatWithAgent } from "@/lib/ai/mock";

export async function POST(req: NextRequest) {
  const session = await auth();
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
    const result = mockChatWithAgent(
      "growth",
      project.name,
      project.description,
      history || [],
      message
    );

    await prisma.aIMessage.createMany({
      data: [
        { role: "user", content: message, agent: "GROWTH", projectId },
        { role: "assistant", content: result.response, agent: "GROWTH", projectId },
      ],
    });

    return NextResponse.json({ response: result.response });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "AI request failed";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
