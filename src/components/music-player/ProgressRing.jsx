import React from "react";

function ProgressRing({ radius, stroke, progress }) {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset = circumference - (progress / 100) * circumference;
  return (
    <div className="absolute rounded-full left-0 top-0 w-full h-full scale-75 border-2 ">
      <div className="-rotate-90">
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="#14284A"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            stroke-width={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
      </div>
    </div>
  );
}

export default ProgressRing;
