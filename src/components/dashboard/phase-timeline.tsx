"use client";

import { cn } from "@/lib/utils";

const phases = [
  { key: "VALIDATE", label: "Validate", color: "bg-accent-purple", textColor: "text-accent-purple" },
  { key: "BUILD", label: "Build", color: "bg-accent-orange", textColor: "text-accent-orange" },
  { key: "TEST", label: "Test", color: "bg-accent-green", textColor: "text-accent-green" },
  { key: "RAISE", label: "Raise", color: "bg-accent-red", textColor: "text-accent-red" },
];

const phaseOrder = ["VALIDATE", "BUILD", "TEST", "RAISE"];

interface PhaseTimelineProps {
  currentPhase: string;
  onPhaseClick?: (phase: string) => void;
}

export function PhaseTimeline({ currentPhase, onPhaseClick }: PhaseTimelineProps) {
  const currentIndex = phaseOrder.indexOf(currentPhase);

  return (
    <div className="flex items-center gap-2">
      {phases.map((phase, index) => {
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;

        return (
          <div key={phase.key} className="flex items-center">
            <button
              onClick={() => onPhaseClick?.(phase.key)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                isActive && `${phase.color}/20 ${phase.textColor} border border-current`,
                isCompleted && "bg-surface text-foreground",
                !isActive && !isCompleted && "text-muted hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                  isActive && `${phase.color} text-white`,
                  isCompleted && "bg-accent-green text-white",
                  !isActive && !isCompleted && "bg-border text-muted"
                )}
              >
                {isCompleted ? "✓" : index + 1}
              </div>
              <span className="hidden sm:inline">{phase.label}</span>
            </button>
            {index < phases.length - 1 && (
              <div className={cn("mx-1 h-0.5 w-8", index < currentIndex ? "bg-accent-green" : "bg-border")} />
            )}
          </div>
        );
      })}
    </div>
  );
}
