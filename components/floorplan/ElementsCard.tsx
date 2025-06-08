import React from "react";
import type { TableType } from "@/contexts/floorplan-context";
import type { ElementType } from "@/types/element-types";

interface ElementsCardProps {
  selectedElement: ElementType | null;
  handleElementSelect: (type: ElementType) => void;
  tableTypes: TableType[];
  SHAPE_PRESETS: Record<string, { width: number; height: number }>;
}

export const ElementsCard = React.memo<ElementsCardProps>(
  function ElementsCard({
    selectedElement,
    handleElementSelect,
    tableTypes,
    SHAPE_PRESETS,
  }) {
    return (
      <div className="bg-white border border-neutral-200 rounded shadow-sm p-4">
        <div className="space-y-3">
          <div>
            <h1 className="text-base font-medium text-neutral-900 mb-1">
              Add Elements
            </h1>
            <p className="text-xs text-neutral-500 mb-3">
              Select an element to place on your floorplan
            </p>
          </div>
          <button
            className={`flex items-center gap-3 border rounded p-3 w-full shadow-sm focus:ring-2 focus:ring-lime-400 transition-all duration-200 ${
              selectedElement === "barrier"
                ? "ring-2 ring-lime-400 bg-lime-50 border-lime-300 shadow-md"
                : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200"
            }`}
            type="button"
            aria-label="Select Barrier Element"
            onClick={() => handleElementSelect("barrier")}
          >
            <span className="w-4 h-1 bg-neutral-400 rounded" />
            <div className="text-left">
              <span
                className={`text-sm ${selectedElement === "barrier" ? "text-lime-700 font-medium" : "text-neutral-700"}`}
              >
                Wall / Barrier
              </span>
              <p className="text-xs text-neutral-500 mt-0.5">
                Add walls, pillars, or dividers
              </p>
            </div>
          </button>
          <button
            className={`flex items-center gap-3 border rounded p-3 w-full shadow-sm focus:ring-2 focus:ring-lime-400 transition-all duration-200 ${
              selectedElement === "zone"
                ? "ring-2 ring-lime-400 bg-lime-50 border-lime-300 shadow-md"
                : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200"
            }`}
            type="button"
            aria-label="Select Zone Element"
            onClick={() => handleElementSelect("zone")}
          >
            <span className="w-4 h-4 bg-yellow-100 rounded" />
            <div className="text-left">
              <span
                className={`text-sm ${selectedElement === "zone" ? "text-lime-700 font-medium" : "text-neutral-700"}`}
              >
                Area / Zone
              </span>
              <p className="text-xs text-neutral-500 mt-0.5">
                Define kitchen, bar, or dining areas
              </p>
            </div>
          </button>
          <button
            className={`flex items-center gap-3 border rounded p-3 w-full shadow-sm focus:ring-2 focus:ring-lime-400 transition-all duration-200 ${
              selectedElement === "table"
                ? "ring-2 ring-lime-400 bg-lime-50 border-lime-300 shadow-md"
                : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200"
            }`}
            type="button"
            aria-label="Select Table Element"
            onClick={() => handleElementSelect("table")}
          >
            <span className="w-4 h-4 bg-lime-100 rounded" />
            <div className="text-left">
              <span
                className={`text-sm ${selectedElement === "table" ? "text-lime-700 font-medium" : "text-neutral-700"}`}
              >
                Table (Default)
              </span>
              <p className="text-xs text-neutral-500 mt-0.5">
                Basic dining table
              </p>
            </div>
          </button>
          {tableTypes.map((type) => (
            <button
              key={type.id}
              className={`flex flex-col items-center border rounded p-3 w-full shadow-sm focus:ring-2 focus:ring-lime-400 transition-all duration-200 ${
                selectedElement === `TableType:${type.id}`
                  ? "ring-2 ring-lime-400 bg-lime-50 border-lime-300 shadow-md"
                  : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200"
              }`}
              onClick={() =>
                handleElementSelect(`TableType:${type.id}` as ElementType)
              }
              type="button"
              aria-label={`Select ${type.label} Table Type`}
            >
              <div
                style={{
                  width: SHAPE_PRESETS[type.shape].width,
                  height: SHAPE_PRESETS[type.shape].height,
                  background: type.color,
                  borderRadius: 6,
                }}
                className="mb-2 border"
              />
              <div className="text-center">
                <span
                  className={`text-sm ${selectedElement === `TableType:${type.id}` ? "text-lime-700 font-medium" : "text-neutral-700"}`}
                >
                  {type.label || "Table"}
                </span>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {type.seats} seats • {type.shape}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  },
);
