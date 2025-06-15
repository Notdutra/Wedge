"use client";

import React from "react";
import Image from "next/image";

interface WedgeLogoProps {
  width?: number;
  height?: number;
  pos?: boolean;
  className?: string;
}

// Simple, stable logo component that doesn't re-render
export const WedgeLogo = React.memo(function WedgeLogo({
  width = 40,
  height = 40,
  pos = false,
  className = "",
}: WedgeLogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/logo.png"
        alt="Wedge"
        width={width}
        height={height}
        priority
        className="flex-shrink-0"
        style={{
          width: "auto",
          height: `${height}px`,
        }}
      />
      {pos && (
        <span className="text-xl font-bold text-gray-900 ml-2">Wedge</span>
      )}
    </div>
  );
});

export default WedgeLogo;
