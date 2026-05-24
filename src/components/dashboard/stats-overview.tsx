"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen, TrendingUp, Zap, Target } from "lucide-react";

interface Project {
  phase: string;
  score: number | null;
}

export function StatsOverview({ projects }: { projects: Project[] }) {
  const totalProjects = projects.length;
  const validatedProjects = projects.filter((p) => p.score !== null);
  const avgScore = validatedProjects.length > 0
    ? Math.round(validatedProjects.reduce((sum, p) => sum + (p.score || 0), 0) / validatedProjects.length)
    : null;

  const phaseCounts = projects.reduce(
    (acc, p) => {
      acc[p.phase] = (acc[p.phase] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const furthestPhase = ["RAISE", "TEST", "BUILD", "VALIDATE"].find((p) => phaseCounts[p]) || "VALIDATE";
  const phaseLabels: Record<string, string> = { VALIDATE: "Validate", BUILD: "Build", TEST: "Test", RAISE: "Raise" };

  const stats = [
    { label: "Total Projects", value: totalProjects.toString(), icon: FolderOpen, color: "text-accent-purple" },
    { label: "Avg. Score", value: avgScore !== null ? `${avgScore}/100` : "—", icon: TrendingUp, color: "text-accent-green" },
    { label: "Validated", value: `${validatedProjects.length}/${totalProjects}`, icon: Target, color: "text-accent-orange" },
    { label: "Furthest Phase", value: phaseLabels[furthestPhase], icon: Zap, color: "text-brand-pink" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 mb-8">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-4 flex items-center gap-3">
            <div className={`${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted">{stat.label}</p>
              <p className="text-lg font-bold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
