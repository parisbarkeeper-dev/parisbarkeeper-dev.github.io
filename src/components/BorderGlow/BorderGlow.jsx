import { useCallback, useEffect, useMemo, useRef } from "react";

import "./BorderGlow.css";

const GRADIENT_POSITIONS = [
  "80% 55%",
  "69% 34%",
  "8% 6%",
  "41% 38%",
  "86% 85%",
  "82% 18%",
  "51% 4%",
];
const GRADIENT_KEYS = [
  "--gradient-one",
  "--gradient-two",
  "--gradient-three",
  "--gradient-four",
  "--gradient-five",
  "--gradient-six",
  "--gradient-seven",
];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function parseHSL(hslString) {
  const match = hslString.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return {
    h: Number.parseFloat(match[1]),
    s: Number.parseFloat(match[2]),
    l: Number.parseFloat(match[3]),
  };
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ["", "-60", "-50", "-40", "-30", "-20", "-10"];

  return Object.fromEntries(
    opacities.map((opacity, index) => [
      `--glow-color${keys[index]}`,
      `hsl(${h}deg ${s}% ${l}% / ${Math.min(opacity * intensity, 100)}%)`,
    ]),
  );
}

function buildGradientVars(colors) {
  const variables = {};
  GRADIENT_KEYS.forEach((key, index) => {
    const color = colors[Math.min(COLOR_MAP[index], colors.length - 1)];
    variables[key] =
      `radial-gradient(at ${GRADIENT_POSITIONS[index]}, ${color} 0, transparent 50%)`;
  });
  variables["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`;
  return variables;
}

export default function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "40 80 80",
  backgroundColor = "rgba(7, 8, 12, 0.62)",
  borderRadius = 22,
  glowRadius = 32,
  glowIntensity = 1,
  coneSpread = 25,
  colors = ["#0205fc", "#f5e400", "#ff0202"],
  fillOpacity = 0.22,
  reveal = false,
}) {
  const cardRef = useRef(null);
  const frameRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });

  const updateGlow = useCallback(() => {
    frameRef.current = 0;
    const card = cardRef.current;
    if (!card) return;

    const { width, height } = card.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;
    const deltaX = pointerRef.current.x - centerX;
    const deltaY = pointerRef.current.y - centerY;
    const scaleX = deltaX === 0 ? Infinity : centerX / Math.abs(deltaX);
    const scaleY = deltaY === 0 ? Infinity : centerY / Math.abs(deltaY);
    const proximity = Math.min(
      Math.max(1 / Math.min(scaleX, scaleY), 0),
      1,
    );
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;

    card.style.setProperty("--edge-proximity", (proximity * 100).toFixed(3));
    card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
  }, []);

  const handlePointerMove = useCallback(
    (event) => {
      const card = cardRef.current;
      if (!card) return;
      card.classList.add("is-glow-active");
      const rect = card.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(updateGlow);
      }
    },
    [updateGlow],
  );

  const handlePointerLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.classList.remove("is-glow-active");
  }, []);

  useEffect(
    () => () => {
      cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  const style = useMemo(
    () => ({
      "--card-bg": backgroundColor,
      "--edge-sensitivity": edgeSensitivity,
      "--border-radius": `${borderRadius}px`,
      "--glow-padding": `${glowRadius}px`,
      "--cone-spread": coneSpread,
      "--fill-opacity": fillOpacity,
      ...buildGlowVars(glowColor, glowIntensity),
      ...buildGradientVars(colors),
    }),
    [
      backgroundColor,
      borderRadius,
      colors,
      coneSpread,
      edgeSensitivity,
      fillOpacity,
      glowColor,
      glowIntensity,
      glowRadius,
    ],
  );

  return (
    <div
      ref={cardRef}
      className={`border-glow-card ${className}`.trim()}
      data-reveal={reveal ? "" : undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={style}
    >
      <span className="edge-light" aria-hidden="true" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}
