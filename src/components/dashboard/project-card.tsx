"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart3, Code2, Rocket, PiggyBank } from "lucide-react";

const phaseConfig = {
  VALIDATE: { label: "Validate", variant: "validate" as const, color: "text-accent-purple", bg: "bg-accent-purple", icon: BarChart3 },
  BUILD: { label: "Build", variant: "build" as const, color: "text-accent-orange", bg: "bg-accent-orange", icon: Code2 },
  TEST: { label: "Test", variant: "test" as const, color: "text-accent-green", bg: "bg-accent-green", icon: Rocket },
  RAISE: { label: "Raise", variant: "raise" as const, color: "text-accent-red", bg: "bg-accent-red", icon: PiggyBank },
};

const phaseOrder = ["VALIDATE", "BUILD", "TEST", "RAISE"];

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    phase: string;
    score: number | null;
    createdAt: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const phase = phaseConfig[project.phase as keyof typeof phaseConfig] || phaseConfig.VALIDATE;
  const PhaseIcon = phase.icon;
  const currentIndex = phaseOrder.indexOf(project.phase);
  const progress = ((currentIndex + 1) / phaseOrder.length) * 100;

  return (
    <Link href={`/dashboard/project/${project.id}`}>
      <Card className="transition-all hover:border-accent-purple/50 hover:glow cursor-pointer group h-full">
        <CardContent className="p-5 flex flex-col h-full">
          <div className="flex items-start justify-between mb-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${phase.bg}`}>
              <PhaseIcon className="h-5 w-5 text-white" />
            </div>
            <ArrowRight className="h-5 w-5 text-muted transition-transform group-hover:translate-x-1" />
          </div>

          <h3 className="text-lg font-bold mb-1">{project.name}</h3>
          <p className="text-sm text-muted line-clamp-2 mb-4 flex-1">{project.description}</p>

          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <Badge variant={phase.variant} className="text-xs">{phase.label}</Badge>
              {project.score !== null && (
                <span className="text-xs text-muted">
                  Score: <span className="font-bold text-accent-green">{project.score}</span>
                </span>
              )}
            </div>
            <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
              <div
                className={`h-full rounded-full ${phase.bg} transition-all duration-500`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              {phaseOrder.map((p, i) => (
                <div
                  key={p}
                  className={`h-1.5 w-1.5 rounded-full ${i <= currentIndex ? phase.bg : "bg-border"}`}
                />
              ))}
            </div>
          </div>

          <p className="text-xs text-muted">
            Created {new Date(project.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
