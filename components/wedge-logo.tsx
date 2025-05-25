"use client";

// Pre-load the logo image statically to prevent flicker during navigation
// This ensures the image is cached before any component rendering
const logoImageUrl = "/logo.png";
if (typeof window !== "undefined") {
  const preloadLink = document.createElement("link");
  preloadLink.rel = "preload";
  preloadLink.as = "image";
  preloadLink.href = logoImageUrl;
  document.head.appendChild(preloadLink);
}

export function WedgeLogo({
  className = "",
  pos = false,
  width = 32,
  height = 32,
}: {
  className?: string;
  pos?: boolean;
  width?: number;
  height?: number;
}) {
  // Fixed sizes for consistent rendering
  const logoWidth = width || 32;
  const logoHeight = height || 32;
  const mainFontSize = logoWidth * 0.7;
  const posFontSize = logoWidth * 0.3;

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ height: logoHeight }}
    >
      <div className="flex items-center justify-center h-full">
        {/* Using a regular img tag with fixed dimensions for consistent rendering */}
        <img
          src={logoImageUrl}
          alt={pos ? "Wedge POS" : "Wedge"}
          width={logoWidth}
          height={logoHeight}
          className="mr-2 object-contain"
          loading="eager"
          fetchPriority="high"
        />
        <h1
          className="font-bold text-lime-600"
          style={{ fontSize: mainFontSize, lineHeight: 1 }}
        >
          Wedge
        </h1>
        {pos && (
          <span
            className="ml-2 text-neutral-500 font-medium"
            style={{ fontSize: posFontSize, lineHeight: 1 }}
          >
            POS
          </span>
        )}
      </div>
    </div>
  );
}
