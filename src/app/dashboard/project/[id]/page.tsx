"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PhaseTimeline } from "@/components/dashboard/phase-timeline";
import { AIChat } from "@/components/dashboard/ai-chat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowRight, BarChart3, Code2, Rocket, PiggyBank } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  phase: string;
  score: number | null;
  pricingTier: string | null;
  createdAt: string;
}

const phaseAgentMap = {
  VALIDATE: {
    agent: "validate" as const,
    name: "AI Analyst",
    color: "bg-accent-purple",
    icon: BarChart3,
    placeholder: "Describe your startup idea and I'll evaluate market potential, competition, and demand signals.",
  },
  BUILD: {
    agent: "build" as const,
    name: "AI Builder",
    color: "bg-accent-orange",
    icon: Code2,
    placeholder: "Tell me what you want to build and I'll generate landing pages, copy, and product prototypes.",
  },
  TEST: {
    agent: "growth" as const,
    name: "AI Growth",
    color: "bg-accent-green",
    icon: Rocket,
    placeholder: "Let's plan your go-to-market strategy, target audience, and growth experiments.",
  },
  RAISE: {
    agent: "raise" as const,
    name: "AI Investor",
    color: "bg-accent-red",
    icon: PiggyBank,
    placeholder: "I'll help you create pitch decks, financial projections, and prepare your data room.",
  },
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [params.id]);

  const fetchProject = async () => {
    const res = await fetch(`/api/projects/${params.id}`);
    if (!res.ok) {
      router.push("/dashboard");
      return;
    }
    const data = await res.json();
    setProject(data);
    setLoading(false);
  };

  const advancePhase = async () => {
    const phases = ["VALIDATE", "BUILD", "TEST", "RAISE"];
    const currentIndex = phases.indexOf(project!.phase);
    if (currentIndex >= phases.length - 1) return;

    const nextPhase = phases[currentIndex + 1];
    const res = await fetch(`/api/projects/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phase: nextPhase }),
    });

    if (res.ok) {
      const updated = await res.json();
      setProject(updated);
    }
  };

  if (loading || !project) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-muted" />
      </div>
    );
  }

  const agentConfig = phaseAgentMap[project.phase as keyof typeof phaseAgentMap] || phaseAgentMap.VALIDATE;

  return (
    <div className="space-y-8">
      {/* Project header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-black">{project.name}</h1>
          <p className="mt-1 text-muted max-w-xl">{project.description}</p>
        </div>
        {project.score !== null && (
          <Card className="shrink-0">
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted uppercase tracking-wider">Validation Score</p>
              <p className="text-3xl font-black text-accent-green">{project.score}/100</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Phase timeline */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PhaseTimeline currentPhase={project.phase} />
        {project.phase !== "RAISE" && (
          <Button onClick={advancePhase} variant="outline" size="sm">
            Next Phase <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Pricing tier */}
      {project.pricingTier && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pricing Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={project.pricingTier === "HIGH_POTENTIAL" ? "validate" : "outline"}>
              {project.pricingTier === "HIGH_POTENTIAL" ? "High Potential" :
               project.pricingTier === "COMPLEX_BUILD" ? "Complex Build" : "B2B Retainer"}
            </Badge>
          </CardContent>
        </Card>
      )}

      {/* AI Chat */}
      <div>
        <div className="mb-4 flex items-center gap-3">
          <agentConfig.icon className={`h-5 w-5 ${agentConfig.color.replace("bg-", "text-")}`} />
          <h2 className="text-xl font-bold">{agentConfig.name}</h2>
          <Badge variant={
            project.phase === "VALIDATE" ? "validate" :
            project.phase === "BUILD" ? "build" :
            project.phase === "TEST" ? "test" : "raise"
          }>
            {project.phase}
          </Badge>
        </div>
        <AIChat
          projectId={project.id}
          agent={agentConfig.agent}
          agentName={agentConfig.name}
          agentColor={agentConfig.color}
          placeholder={agentConfig.placeholder}
        />
      </div>
    </div>
  );
}
