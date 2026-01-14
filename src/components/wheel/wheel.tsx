import React, { useMemo, useState } from "react";
import "./wheel.css";

interface Segment {
  label: string;
  color: string;
}

const generateSegments = (count: number): Segment[] =>
  Array.from({ length: count }, (_, i) => ({
    label: ``,
    //  gold, grey and black colors each for one third of the segments
    color: i % 3 === 0 ? 'oklch(0.7509 0.0856 83.92)' : i % 3 === 1 ? 'oklch(0.7509 0 290.12)' : 'oklch(0.3427 0 0)',
  }));

interface WheelProps {
  count: number;
  champions?: string[];
  onLock?: (segment: { index: number; label: string }) => void;
}

const Wheel: React.FC<WheelProps> = ({ count, champions, onLock }) => {
  const segments = useMemo(() => generateSegments(count), [count]);
  const championsSegments = useMemo(() => {
    if (!champions || champions.length === 0) return segments;
    return champions.map((champion, index) => ({
      label: champion,
      color: index % 3 === 0 ? 'oklch(0.7509 0.0856 83.92)' : index % 3 === 1 ? 'oklch(0.7509 0 290.12)' : 'oklch(0.3427 0 0)',
    }));
  }, [champions, segments]);

  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const size = 700;
  const center = size / 2;
  const radius = center - 10;
  const angleStep = 360 / segments.length;
  const textRadius = championsSegments.length > 20 ? radius - 80 : radius - 40;

  const spin = () => {
    if (isSpinning) return;

    const extraSpins = 5 * 360;
    const randomOffset = Math.random() * 360;
    const newRotation = rotation + extraSpins + randomOffset;

    setRotation(newRotation);
    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false)
      const angleStep = 360 / championsSegments.length;
      const normalized =
        (360 - (newRotation % 360) + angleStep / 2) % 360;

      const index = Math.floor(normalized / angleStep);
      const segment = championsSegments[index];

      onLock?.({
        index,
        label: segment.label,
      });
    }, 5000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <div style={{ position: "relative", width: size, height: size }}>
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
            borderTop: "30px solid white",
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

            const x1 = center + radius * Math.cos((Math.PI * (startAngle - 90)) / 180);
            const y1 = center + radius * Math.sin((Math.PI * (startAngle - 90)) / 180);
            const x2 = center + radius * Math.cos((Math.PI * (endAngle - 90)) / 180);
            const y2 = center + radius * Math.sin((Math.PI * (endAngle - 90)) / 180);

            const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;

            return (
              <g key={i}>
                <path d={pathData} fill={seg.color} stroke="white" strokeWidth="0.5" />
                <text
                  x={
                    center +
                    textRadius * Math.cos((Math.PI * (startAngle + angleStep / 2 - 90)) / 180)
                  }
                  y={
                    center +
                    textRadius * Math.sin((Math.PI * (startAngle + angleStep / 2 - 90)) / 180)
                  }
                  fill="white"
                  fontSize={16}
                  fontWeight="bold"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  transform={`rotate(${startAngle + angleStep / 2}, ${center +
                    textRadius * Math.cos((Math.PI * (startAngle + angleStep / 2 - 90)) / 180)
                    }, ${center +
                    textRadius * Math.sin((Math.PI * (startAngle + angleStep / 2 - 90)) / 180)
                    })`}
                  writingMode={championsSegments.length > 20 ? "vertical-rl" : "horizontal-tb"}
                >
                  {seg.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <button
        className="animate-pulse text-4xl bg-golden hover:bg-[#C8AAAA] text-white font-bold py-4 px-8 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white"
        onClick={spin}
        disabled={isSpinning}
      >
        MAKE IT TURN!
      </button>
    </div>
  );
};

export default Wheel;
