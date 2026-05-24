"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, BarChart3, Code2, Rocket, PiggyBank } from "lucide-react";

interface AIMessage {
  role: string;
  content: string;
  agent: string;
}

const phases = [
  { key: "VALIDATE", agent: "ANALYST", label: "Validation", icon: BarChart3, color: "text-accent-purple", variant: "validate" as const },
  { key: "BUILD", agent: "BUILDER", label: "Build", icon: Code2, color: "text-accent-orange", variant: "build" as const },
  { key: "TEST", agent: "GROWTH", label: "Testing", icon: Rocket, color: "text-accent-green", variant: "test" as const },
  { key: "RAISE", agent: "INVESTOR", label: "Fundraising", icon: PiggyBank, color: "text-accent-red", variant: "raise" as const },
];

const phaseOrder = ["VALIDATE", "BUILD", "TEST", "RAISE"];

export function PhaseSummary({ currentPhase, messages, score }: {
  currentPhase: string;
  messages: AIMessage[];
  score: number | null;
}) {
  const currentIndex = phaseOrder.indexOf(currentPhase);
  const completedPhases = phases.filter((_, i) => i < currentIndex);

  if (completedPhases.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Completed Phases</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {phases.map((phase, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const phaseMessages = messages.filter(m => m.agent === phase.agent && m.role === "assistant");
            const lastMessage = phaseMessages[phaseMessages.length - 1];

            return (
              <div
                key={phase.key}
                className={`flex items-start gap-3 rounded-lg border p-4 ${
                  isCompleted ? "border-border bg-surface" :
                  isCurrent ? "border-accent-purple/30 bg-accent-purple/5" :
                  "border-border/50 opacity-40"
                }`}
              >
                <div className="mt-0.5">
                  {isCompleted ? (
                    <CheckCircle className={`h-5 w-5 ${phase.color}`} />
                  ) : (
                    <Circle className="h-5 w-5 text-muted" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{phase.label}</span>
                    <Badge variant={phase.variant} className="text-xs">
                      {isCompleted ? "Done" : isCurrent ? "Active" : "Pending"}
                    </Badge>
                  </div>
                  {isCompleted && phase.key === "VALIDATE" && score !== null && (
                    <p className="mt-1 text-xs text-muted">
                      Score: <span className="font-bold text-accent-green">{score}/100</span>
                    </p>
                  )}
                  {isCompleted && lastMessage && (
                    <p className="mt-1 text-xs text-muted line-clamp-2">
                      {lastMessage.content.replace(/[#*`]/g, "").slice(0, 120)}...
                    </p>
                  )}
                  {!isCompleted && !isCurrent && (
                    <p className="mt-1 text-xs text-muted">Not started yet</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
