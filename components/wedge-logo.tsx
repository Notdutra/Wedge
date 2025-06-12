"use client";

import React from "react";

// Pre-load the logo image statically to prevent flicker during navigation
const logoImageUrl = "/logo.png";

// Create a stable image element to prevent reloading
if (typeof globalThis !== "undefined" && typeof document !== "undefined") {
  const doc = globalThis.document;
  // Preload via link tag
  const preloadLink = doc.createElement("link");
  preloadLink.rel = "preload";
  preloadLink.as = "image";
  preloadLink.href = logoImageUrl;
  doc.head.appendChild(preloadLink);
}

// Create a singleton logo element that never changes
let logoElement: HTMLDivElement | null = null;

const createStableLogo = (
  width: number,
  height: number,
  pos: boolean,
  className: string,
) => {
  if (
    typeof globalThis === "undefined" ||
    typeof globalThis.document === "undefined"
  )
    return null;

  const doc = globalThis.document;
  const container = doc.createElement("div");
  container.className = `flex items-center ${className}`;
  container.style.cssText = `
    height: ${height}px;
    min-height: ${height}px;
    width: auto;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    contain: layout style;
    transform: translateZ(0);
    backface-visibility: hidden;
  `;

  container.innerHTML = `
    <img
      src="${logoImageUrl}"
      alt="${pos ? "Wedge POS" : "Wedge"}"
      width="${width}"
      height="${height}"
      style="
        width: ${width}px;
        height: ${height}px;
        margin-right: 8px;
        object-fit: contain;
        display: block;
        flex-shrink: 0;
        transform: translateZ(0);
        backface-visibility: hidden;
        image-rendering: crisp-edges;
      "
    />
    <h1 style="
      font-family: inherit;
      font-weight: bold;
      color: #65a30d;
      font-size: 20px;
      line-height: 20px;
      margin: 0;
      padding: 0;
      white-space: nowrap;
      display: block;
      flex-shrink: 0;
      transform: translateZ(0);
      backface-visibility: hidden;
    ">
      Wedge
    </h1>
    ${
      pos
        ? `
    <span style="
      font-family: inherit;
      font-weight: 500;
      color: #737373;
      font-size: 14px;
      line-height: 14px;
      margin: 0 0 0 8px;
      padding: 0;
      white-space: nowrap;
      display: block;
      flex-shrink: 0;
      transform: translateZ(0);
      backface-visibility: hidden;
    ">
      POS
    </span>
    `
        : ""
    }
  `;

  return container;
};

// This component NEVER re-renders after the first render
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
  // Create the element only once
  if (!logoElement) {
    logoElement = createStableLogo(width, height, pos, className);
  }

  return React.createElement("div", {
    ref: (node: HTMLDivElement | null) => {
      if (node && logoElement && node !== logoElement) {
        // Replace the placeholder with our stable logo
        node.appendChild(logoElement);
      }
    },
  });
}
