"use client";

import { useEffect, useState } from "react";

interface ScoreRadialProps {
  score: number;
  size?: number;
}

export function ScoreRadial({ score, size = 140 }: ScoreRadialProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedScore / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = (s: number) => {
    if (s >= 75) return "var(--accent-green)";
    if (s >= 60) return "var(--accent-orange)";
    return "var(--accent-red)";
  };

  const getLabel = (s: number) => {
    if (s >= 75) return "Strong";
    if (s >= 60) return "Moderate";
    return "Needs Work";
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={getColor(score)}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black" style={{ color: getColor(score) }}>
            {animatedScore}
          </span>
          <span className="text-xs text-muted">/100</span>
        </div>
      </div>
      <span className="text-sm font-medium" style={{ color: getColor(score) }}>
        {getLabel(score)}
      </span>
    </div>
  );
}
