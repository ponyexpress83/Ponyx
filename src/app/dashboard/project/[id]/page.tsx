"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { PhaseTimeline } from "@/components/dashboard/phase-timeline";
import { AIChat } from "@/components/dashboard/ai-chat";
import { ScoreRadial } from "@/components/dashboard/score-radial";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectSkeleton } from "@/components/dashboard/project-skeleton";
import { ArrowRight, BarChart3, Code2, Rocket, PiggyBank, TrendingUp, Target, Shield, Lightbulb, Timer, Trash2 } from "lucide-react";

interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  agent: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  phase: string;
  score: number | null;
  pricingTier: string | null;
  createdAt: string;
  messages?: AIMessage[];
}

const phaseConfig = {
  VALIDATE: {
    agent: "validate" as const,
    name: "AI Analyst",
    color: "bg-accent-purple",
    icon: BarChart3,
    description: "Evaluate market opportunity, competitive landscape, and demand signals",
    placeholder: "Describe your startup idea in detail and I'll evaluate its market potential, competition, and feasibility.",
  },
  BUILD: {
    agent: "build" as const,
    name: "AI Builder",
    color: "bg-accent-orange",
    icon: Code2,
    description: "Generate landing pages, marketing copy, and product prototypes",
    placeholder: "Tell me what you want to build — I'll generate landing pages, copy, and product architecture.",
  },
  TEST: {
    agent: "growth" as const,
    name: "AI Growth",
    color: "bg-accent-green",
    icon: Rocket,
    description: "Plan go-to-market strategy, acquire first users, analyze signals",
    placeholder: "Let's plan your go-to-market strategy, target audience, and growth experiments.",
  },
  RAISE: {
    agent: "raise" as const,
    name: "AI Investor",
    color: "bg-accent-red",
    icon: PiggyBank,
    description: "Create pitch decks, financial models, and prepare investor data room",
    placeholder: "I'll help you create pitch decks, financial projections, and prepare your data room.",
  },
};

const phaseOrder = ["VALIDATE", "BUILD", "TEST", "RAISE"];

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProject = useCallback(async () => {
    const res = await fetch(`/api/projects/${params.id}`);
    if (!res.ok) {
      router.push("/dashboard");
      return;
    }
    const data = await res.json();
    setProject(data);
    setLoading(false);
  }, [params.id, router]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const advancePhase = async () => {
    const currentIndex = phaseOrder.indexOf(project!.phase);
    if (currentIndex >= phaseOrder.length - 1) return;

    const nextPhase = phaseOrder[currentIndex + 1];
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

  const handleScoreUpdate = (score: number) => {
    if (project) {
      setProject({ ...project, score });
    }
  };

  const deleteProject = async () => {
    if (!confirm("Are you sure you want to delete this project? This cannot be undone.")) return;
    const res = await fetch(`/api/projects/${params.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/dashboard");
    }
  };

  if (loading || !project) {
    return <ProjectSkeleton />;
  }

  const config = phaseConfig[project.phase as keyof typeof phaseConfig] || phaseConfig.VALIDATE;
  const phaseIndex = phaseOrder.indexOf(project.phase);
  const dayRange = phaseIndex === 0 ? "Day 1" : phaseIndex === 1 ? "Days 2-3" : phaseIndex === 2 ? "Days 3-5" : "Days 5-7";

  const agentNameMap: Record<string, string> = { validate: "ANALYST", build: "BUILDER", growth: "GROWTH", raise: "INVESTOR" };
  const currentAgentName = agentNameMap[config.agent];
  const chatHistory = (project.messages || [])
    .filter((m) => m.agent === currentAgentName)
    .map((m) => ({ id: m.id, role: m.role as "user" | "assistant", content: m.content }));

  return (
    <div className="space-y-8">
      {/* Project Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-black">{project.name}</h1>
            <Badge variant={
              project.phase === "VALIDATE" ? "validate" :
              project.phase === "BUILD" ? "build" :
              project.phase === "TEST" ? "test" : "raise"
            }>
              {project.phase}
            </Badge>
          </div>
          <p className="text-muted max-w-xl">{project.description}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={deleteProject}
            className="mt-3 text-muted hover:text-accent-red"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete Project
          </Button>
        </div>

        {project.score !== null && (
          <Card className="shrink-0 lg:w-48">
            <CardContent className="p-6 flex flex-col items-center">
              <ScoreRadial score={project.score} />
              {project.pricingTier && (
                <Badge
                  className="mt-3"
                  variant={project.pricingTier === "HIGH_POTENTIAL" ? "validate" : "outline"}
                >
                  {project.pricingTier === "HIGH_POTENTIAL" ? "High Potential" :
                   project.pricingTier === "COMPLEX_BUILD" ? "Complex Build" : "B2B Retainer"}
                </Badge>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Phase Timeline + Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <PhaseTimeline currentPhase={project.phase} />
            {project.phase !== "RAISE" && (
              <Button onClick={advancePhase} variant="outline" size="sm" className="shrink-0">
                Next Phase <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Current Phase Info */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${config.color}`}>
                <config.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-base">{config.name}</CardTitle>
                <p className="text-xs text-muted">{dayRange}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted leading-relaxed">{config.description}</p>

            <div className="mt-6 space-y-3">
              <h4 className="text-xs font-bold text-muted uppercase tracking-wider">Quick Guide</h4>
              {project.phase === "VALIDATE" && (
                <div className="space-y-2 text-xs text-muted">
                  <div className="flex items-start gap-2">
                    <Target className="h-3.5 w-3.5 mt-0.5 text-accent-purple shrink-0" />
                    <span>Describe your problem & solution</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-3.5 w-3.5 mt-0.5 text-accent-purple shrink-0" />
                    <span>Share target market & revenue model</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-3.5 w-3.5 mt-0.5 text-accent-purple shrink-0" />
                    <span>Discuss competition & differentiators</span>
                  </div>
                </div>
              )}
              {project.phase === "BUILD" && (
                <div className="space-y-2 text-xs text-muted">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-3.5 w-3.5 mt-0.5 text-accent-orange shrink-0" />
                    <span>Ask for a landing page</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Code2 className="h-3.5 w-3.5 mt-0.5 text-accent-orange shrink-0" />
                    <span>Generate marketing copy</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="h-3.5 w-3.5 mt-0.5 text-accent-orange shrink-0" />
                    <span>Define your brand messaging</span>
                  </div>
                </div>
              )}
              {project.phase === "TEST" && (
                <div className="space-y-2 text-xs text-muted">
                  <div className="flex items-start gap-2">
                    <Rocket className="h-3.5 w-3.5 mt-0.5 text-accent-green shrink-0" />
                    <span>Plan go-to-market strategy</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-3.5 w-3.5 mt-0.5 text-accent-green shrink-0" />
                    <span>Analyze market signals</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Timer className="h-3.5 w-3.5 mt-0.5 text-accent-green shrink-0" />
                    <span>Get pivot/scale recommendation</span>
                  </div>
                </div>
              )}
              {project.phase === "RAISE" && (
                <div className="space-y-2 text-xs text-muted">
                  <div className="flex items-start gap-2">
                    <PiggyBank className="h-3.5 w-3.5 mt-0.5 text-accent-red shrink-0" />
                    <span>Generate pitch deck</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-3.5 w-3.5 mt-0.5 text-accent-red shrink-0" />
                    <span>Create financial projections</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-3.5 w-3.5 mt-0.5 text-accent-red shrink-0" />
                    <span>Prepare data room</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* AI Chat */}
        <div className="lg:col-span-3">
          <AIChat
            key={project.phase}
            projectId={project.id}
            agent={config.agent}
            agentName={config.name}
            agentColor={config.color}
            placeholder={config.placeholder}
            initialMessages={chatHistory}
            onScoreUpdate={handleScoreUpdate}
          />
        </div>
      </div>
    </div>
  );
}
