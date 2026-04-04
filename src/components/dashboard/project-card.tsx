"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const phaseConfig = {
  VALIDATE: { label: "Valutazione", variant: "validate" as const, color: "text-accent-purple" },
  BUILD: { label: "Build", variant: "build" as const, color: "text-accent-orange" },
  TEST: { label: "Test", variant: "test" as const, color: "text-accent-green" },
  RAISE: { label: "Raise", variant: "raise" as const, color: "text-accent-red" },
};

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

  return (
    <Link href={`/dashboard/project/${project.id}`}>
      <Card className="transition-all hover:border-accent-purple/50 hover:glow cursor-pointer group">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <CardDescription className="mt-1 line-clamp-2">{project.description}</CardDescription>
            </div>
            <ArrowRight className="h-5 w-5 text-muted transition-transform group-hover:translate-x-1" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Badge variant={phase.variant}>{phase.label}</Badge>
            {project.score !== null && (
              <span className="text-sm text-muted">
                Score: <span className="font-bold text-foreground">{project.score}/100</span>
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
