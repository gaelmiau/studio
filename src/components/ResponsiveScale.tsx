"use client";

import React from "react";

interface ResponsiveScaleProps {
  children: React.ReactNode;
  minWidth?: number; // a partir de este ancho empieza a escalar
  maxScale?: number; // escala máxima
  className?: string;
}

export function ResponsiveScale({
  children,
  minWidth = 1400,
  maxScale = 1.45,
  className = "",
}: ResponsiveScaleProps) {
  const cssVar = `clamp(1, calc(100vw / ${minWidth}px), ${maxScale})`;

  return (
    <div className={`w-full flex justify-center ${className}`} style={{ position: "relative" }}>
      <div
        style={{
          ["--ui-scale" as any]: cssVar,
          width: "calc(100% / var(--ui-scale))",
          transform: "scale(var(--ui-scale))",
          transformOrigin: "top center",
        }}
      >
        {children}
      </div>
    </div>
  );
}