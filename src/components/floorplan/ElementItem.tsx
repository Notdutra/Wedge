import { type MouseEvent, type ReactNode, type CSSProperties } from "react";
import {
  TableElement,
  ZoneElement,
  BarrierElement,
} from "@/types/element-types";

// Union type for all element types
export type ElementType = "table" | "zone";

export type ElementData = TableElement | ZoneElement | BarrierElement;

interface ElementItemProps {
  element: ElementData;
  isSelected: boolean;
  isDragging: boolean;
  isHovered?: boolean;
  isOutOfBounds?: boolean;
  onResizeMouseDown?: (e: MouseEvent<HTMLSpanElement>) => void;
  children?: ReactNode;
  disableTransitions?: boolean;
}

export const ElementItem = ({
  element,
  isSelected,
  isDragging,
  isHovered = false,
  isOutOfBounds = false,
  onResizeMouseDown,
  children,
  disableTransitions = false,
}: ElementItemProps) => {
  // Shared style
  const style: CSSProperties = {
    left: Math.round(element.x),
    top: Math.round(element.y),
    width: element.width,
    height: element.height,
    position: "absolute",
    zIndex: isSelected ? 3 : isHovered ? 2 : 1,
    cursor: isDragging ? "grabbing" : isSelected ? "grab" : "pointer",
    transition: disableTransitions ? "none" : "all 0.15s ease-in-out",
  };

  if (element.type === "table") {
    return (
      <div
        className={`element-item table-item flex flex-col items-center justify-center border rounded-lg group ${
          disableTransitions ? "" : "transition-all duration-150"
        } ${
          isOutOfBounds
            ? "border-red-400 bg-red-50 ring-2 ring-red-300 shadow-lg"
            : isSelected
              ? "border-lime-400 bg-lime-50 ring-2 ring-lime-300 shadow-lg"
              : isHovered
                ? "border-lime-300 bg-lime-25 ring-1 ring-lime-200 shadow-md"
                : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm"
        } ${isDragging ? "opacity-80 shadow-lg" : ""}`}
        style={style}
        title={`${element.label} - ${element.seats} seats (click to edit, drag to move)${isOutOfBounds ? " - Release to delete!" : ""}`}
      >
        <span className="font-bold text-xs text-neutral-900">
          {element.label}
        </span>
        <span className="text-[10px] text-neutral-700">
          {element.seats} seats
        </span>
        {/* Resize handle (bottom-right) - show on hover or when selected */}
        {onResizeMouseDown && (
          <span
            className={`absolute right-0 bottom-0 w-3 h-3 bg-lime-500 border border-white rounded-sm cursor-nwse-resize transition-opacity duration-150 ${
              isSelected
                ? "opacity-100"
                : isHovered
                  ? "opacity-80"
                  : "opacity-0 group-hover:opacity-60"
            }`}
            style={{
              zIndex: 30,
              transform: "translate(50%, 50%)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
            }}
            onMouseDown={onResizeMouseDown}
            title="Drag to resize"
          />
        )}
        {children}
      </div>
    );
  }

  // zone or barrier
  return (
    <div
      className={`element-item zone-item border flex items-center justify-center group ${
        disableTransitions ? "" : "transition-all duration-150"
      } ${
        isOutOfBounds
          ? "ring-2 ring-red-300 shadow-lg"
          : isSelected
            ? "ring-2 ring-lime-300 shadow-lg"
            : isHovered
              ? "ring-1 ring-lime-200 shadow-md"
              : "hover:ring-1 hover:ring-neutral-300 hover:shadow-sm"
      } ${element.name === "Barrier" ? "rounded-md" : "rounded"} ${
        isDragging ? "opacity-80 shadow-lg" : ""
      }`}
      style={{
        ...style,
        background: isOutOfBounds ? "#fef2f2" : element.color,
        borderColor: isOutOfBounds
          ? "#f87171"
          : element.name === "Barrier"
            ? "#a3a3a3"
            : "#eab308",
      }}
      title={`${element.name} (click to edit, drag to move)${isOutOfBounds ? " - Release to delete!" : ""}`}
    >
      <span className="text-xs font-bold text-neutral-900 select-none">
        {element.name}
      </span>
      {/* Resize handle (bottom-right) - show on hover or when selected */}
      {onResizeMouseDown && (
        <span
          className={`absolute right-0 bottom-0 w-3 h-3 bg-lime-500 border border-white rounded-sm cursor-nwse-resize transition-opacity duration-150 ${
            isSelected
              ? "opacity-100"
              : isHovered
                ? "opacity-80"
                : "opacity-0 group-hover:opacity-60"
          }`}
          style={{
            zIndex: 30,
            transform: "translate(50%, 50%)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          }}
          onMouseDown={onResizeMouseDown}
          title="Drag to resize"
        />
      )}
      {children}
    </div>
  );
};
