import React, { useMemo, useState } from "react";
import "./wheel.css";
import { colorGenerator } from "@/lib/colorGenerator";

interface Segment {
  label: string;
  color: string;
}

const generateSegments = (count: number): Segment[] =>
  Array.from({ length: count }, (_, i) => ({
    label: `Lot ${i + 1}`,
    color: `hsl(${(i * 360) / count}, 70%, 60%)`,
  }));

const Wheel: React.FC<{ count?: number; champions?: string[] }> = ({ count = 40, champions }) => {
  const segments = useMemo(() => generateSegments(count), [count]);
  const championsSegments = useMemo(() => {
    if (!champions || champions.length === 0) return segments;
    return champions.map((champion) => ({
      label: champion,
      color: colorGenerator(),
    }));
  }, [champions, segments]);

  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const size = 400;
  const center = size / 2;
  const radius = center - 10;
  const angleStep = 360 / segments.length;

  const spin = () => {
    if (isSpinning) return;
    const newRotation = rotation + 1800 + Math.random() * 360;
    setRotation(newRotation);
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 5000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <div style={{ position: "relative", width: size, height: size }}>
        {/* Flèche indicatrice */}
        <div
          style={{
            position: "absolute",
            top: -10,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            width: 0,
            height: 0,
            borderLeft: "15px solid transparent",
            borderRight: "15px solid transparent",
            borderTop: "30px solid red",
          }}
        />

        <svg
          width={size}
          height={size}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 5s cubic-bezier(0.1, 0, 0.2, 1)",
            overflow: "visible",
          }}
        >
          {championsSegments.map((seg, i) => {
            const startAngle = i * angleStep;
            const endAngle = (i + 1) * angleStep;

            // Calcul des coordonnées de l'arc SVG
            const x1 = center + radius * Math.cos((Math.PI * (startAngle - 90)) / 180);
            const y1 = center + radius * Math.sin((Math.PI * (startAngle - 90)) / 180);
            const x2 = center + radius * Math.cos((Math.PI * (endAngle - 90)) / 180);
            const y2 = center + radius * Math.sin((Math.PI * (endAngle - 90)) / 180);

            const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;

            return (
              <g key={i}>
                <path d={pathData} fill={seg.color} stroke="white" strokeWidth="0.5" />
                {/* Texte incliné radialement */}
                <text
                  x={
                    center +
                    (radius - 40) * Math.cos((Math.PI * (startAngle + angleStep / 2 - 90)) / 180)
                  }
                  y={
                    center +
                    (radius - 40) * Math.sin((Math.PI * (startAngle + angleStep / 2 - 90)) / 180)
                  }
                  fill="white"
                  fontSize={count > 30 ? "6" : "10"}
                  fontWeight="bold"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  transform={`rotate(${startAngle + angleStep / 2}, ${
                    center +
                    (radius - 40) * Math.cos((Math.PI * (startAngle + angleStep / 2 - 90)) / 180)
                  }, ${
                    center +
                    (radius - 40) * Math.sin((Math.PI * (startAngle + angleStep / 2 - 90)) / 180)
                  })`}
                >
                  {seg.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <button
        onClick={spin}
        disabled={isSpinning}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Lancer la roue ({count} segments)
      </button>
    </div>
  );
};

export default Wheel;
