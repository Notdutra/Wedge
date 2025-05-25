"use client";

import { useEffect } from "react";

/**
 * Component to preload critical images and prevent them from flickering
 * during page transitions. This should be included in the main layout.
 */
export function PreloadImages() {
  useEffect(() => {
    // List all critical images that should be preloaded
    const imagesToPreload = [
      "/logo.png",
      // Add any other critical images here
    ];

    // Preload all images
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return null; // This component doesn't render anything
}
