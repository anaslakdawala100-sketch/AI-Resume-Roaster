import React from "react";

export default function ScoreCircle({ score }) {
  // Convert 0–10 score to percentage
  const percentage = Math.max(0, Math.min(score * 10, 100));

  let color = "#ef4444";

  if (percentage >= 80) color = "#22c55e";
  else if (percentage >= 60) color = "#f59e0b";

  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">

      <svg width="170" height="170">

        <circle
          cx="85"
          cy="85"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="12"
          fill="none"
        />

        <circle
          cx="85"
          cy="85"
          r={radius}
          stroke={color}
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 85 85)"
          style={{
            transition: "stroke-dashoffset 1s ease",
          }}
        />

        <text
          x="50%"
          y="48%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="30"
          fontWeight="bold"
        >
          {percentage}%
        </text>

        <text
          x="50%"
          y="66%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="14"
          fill="#6b7280"
        >
          {score}/10
        </text>

      </svg>

      <h2 className="text-2xl font-bold mt-4">
        Resume Score
      </h2>

    </div>
  );
}