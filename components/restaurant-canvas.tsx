import React, { forwardRef } from "react";

interface RestaurantCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
}

// Flexible, scrollable canvas for realistic restaurant layouts
export const RestaurantCanvas = forwardRef<
  HTMLDivElement,
  RestaurantCanvasProps
>(
  (
    {
      children,
      className = "",
      width = "100%",
      height = 600,
      style = {},
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={`relative bg-neutral-50 rounded-lg border-2 border-dashed border-neutral-200 shadow-sm transition-shadow mx-auto overflow-auto select-none ${className}`}
      style={{
        width,
        height,
        minWidth: 400,
        minHeight: 400,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  ),
);
RestaurantCanvas.displayName = "RestaurantCanvas";
