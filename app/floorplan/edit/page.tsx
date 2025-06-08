"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import React from "react";
import { DashboardLayout } from "@/components/dashboard-layout";

// TableType and TableOnLayout should match the main app
// (Consider moving these to a shared types file for real projects)
type TableType = {
  id: number;
  label: string;
  seats: number;
  shape: "square" | "rectangle" | "circle";
  color: string;
  count: number;
};

type TableOnLayout = TableType & {
  x: number;
  y: number;
  typeId: number;
  id: number;
};

// Demo initial data for now
const initialTableTypes: TableType[] = [
  {
    id: 1,
    label: "2-seat (square)",
    seats: 2,
    shape: "square",
    color: "#bef264",
    count: 0,
  },
  {
    id: 2,
    label: "4-seat (rectangle)",
    seats: 4,
    shape: "rectangle",
    color: "#86efac",
    count: 0,
  },
  {
    id: 3,
    label: "Round table",
    seats: 4,
    shape: "circle",
    color: "#f9a8d4",
    count: 0,
  },
];

const initialTables: TableOnLayout[] = [
  {
    ...initialTableTypes[0],
    id: 1001,
    typeId: 1,
    x: 60,
    y: 60,
  },
  {
    ...initialTableTypes[1],
    id: 1002,
    typeId: 2,
    x: 180,
    y: 60,
  },
];

// Table shape/size presets
const SHAPE_PRESETS = {
  square: { width: 48, height: 48 },
  rectangle: { width: 72, height: 40 },
  circle: { width: 48, height: 48 },
};

export default function FloorplanEditPage() {
  const [tableTypes, setTableTypes] = useState<TableType[]>(initialTableTypes);
  const [tables, setTables] = useState<TableOnLayout[]>(initialTables);
  const [draggedTableId, setDraggedTableId] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [editingTypeId, setEditingTypeId] = useState<number | null>(null);
  const [newTypeDraft, setNewTypeDraft] = useState<Partial<TableType> | null>(
    null,
  );
  const [editMode, setEditMode] = useState(false);
  const [mode, setMode] = useState<"floor" | "tables">("floor");
  const [floorElements, setFloorElements] = useState<any[]>([]);
  const layoutRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Drag logic
  const handleTableMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    tableId: number,
  ) => {
    e.stopPropagation();
    const table = tables.find((t) => t.id === tableId);
    if (!table) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setDraggedTableId(tableId);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (draggedTableId === null || !dragOffset || !layoutRef.current) return;
    const layoutRect = layoutRef.current.getBoundingClientRect();
    setTables((prev) =>
      prev.map((t) => {
        const preset = SHAPE_PRESETS[t.shape];
        return t.id === draggedTableId
          ? {
              ...t,
              x: Math.max(
                0,
                Math.min(
                  e.clientX - layoutRect.left - dragOffset.x,
                  layoutRect.width - preset.width,
                ),
              ),
              y: Math.max(
                0,
                Math.min(
                  e.clientY - layoutRect.top - dragOffset.y,
                  layoutRect.height - preset.height,
                ),
              ),
            }
          : t;
      }),
    );
  };

  const handleMouseUp = () => {
    if (draggedTableId !== null) {
      setDraggedTableId(null);
      setDragOffset(null);
      document.body.style.userSelect = "";
    }
  };

  // Attach global mousemove/mouseup listeners
  React.useEffect(() => {
    if (draggedTableId !== null) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [draggedTableId, dragOffset]);

  // Add table from palette
  // When adding a table, always use the latest shape preset for width/height
  const handleAddTable = (type: TableType) => {
    if (!layoutRef.current) return;
    const rect = layoutRef.current.getBoundingClientRect();
    const preset = SHAPE_PRESETS[type.shape];
    setTables((prev) => [
      ...prev,
      {
        ...type,
        width: preset.width,
        height: preset.height,
        typeId: type.id,
        id: Date.now() + Math.floor(Math.random() * 1000),
        x: rect.width / 2 - preset.width / 2,
        y: rect.height / 2 - preset.height / 2,
      },
    ]);
  };

  // Remove table
  const handleRemoveTable = (id: number) => {
    setTables((prev) => prev.filter((t) => t.id !== id));
  };

  // Save and return
  const handleSave = () => {
    // TODO: Persist tables and types
    router.push("/floorplan");
  };

  // Add new table type
  const handleAddTableType = () => {
    const newType: TableType = {
      id: Date.now(),
      label: "New Table",
      seats: 2,
      shape: "square",
      color: "#fef08a",
      count: 0,
    };
    setTableTypes((prev) => [...prev, newType]);
    setEditingTypeId(newType.id);
    setNewTypeDraft(newType);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
              Edit Floorplan Layout
            </h1>
            <p className="text-neutral-600">
              Visual layout and table management
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {/* Mode Switcher */}
            <Button
              variant={"outline"}
              size="default"
              className="min-h-[44px] min-w-[44px] px-4"
              onClick={() => setMode("floor")}
            >
              Edit Floor
            </Button>
            <Button
              variant={"outline"}
              size="default"
              className="min-h-[44px] min-w-[44px] px-4"
              onClick={() => setMode("tables")}
              // disabled={floorElements.length === 0}
            >
              Edit Tables
            </Button>
            <Button
              variant="outline"
              size="default"
              className="min-h-[44px] min-w-[44px] px-4"
              onClick={() => router.push("/floorplan")}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              size="default"
              className="bg-lime-600 hover:bg-lime-700 text-white min-h-[44px] min-w-[44px] px-4"
            >
              Save & Return
            </Button>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-neutral-200 bg-blue-500">
            <CardHeader>
              <CardTitle className="text-neutral-900">
                Restaurant Layout
              </CardTitle>
              <p className="text-neutral-600 text-sm mt-1">
                {mode === "floor"
                  ? "Draw walls and place bar, buffet, kitchen, etc."
                  : "Drag and drop tables to edit the layout"}
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex">
                {/* Restaurant blueprint or floor Layout Canvas  (no palette/sidebar here) */}
                <div
                  ref={layoutRef}
                  className="relative bg-neutral-50 rounded-lg p-4 flex-1 border-2 border-dashed border-neutral-200 shadow-sm transition-shadow min-h-[400px] min-w-[300px] flex items-center justify-center"
                  style={{ height: "400px", minWidth: 300 }}
                >
                  {/* Empty state guidance */}
                  {mode === "floor" && floorElements.length === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                      <div className="text-neutral-400 text-2xl mb-2">🖊️</div>
                      <div className="text-neutral-500 text-sm text-center max-w-xs">
                        Select an element from the sidebar to start drawing your
                        floor.
                      </div>
                    </div>
                  )}
                  {/* Render floor elements (walls, bar, etc.) */}
                  {mode === "floor" &&
                    floorElements.map((el) => {
                      if (el.type === "wall") {
                        const { x1, y1, x2, y2 } = el;
                        return (
                          <div
                            key={el.id}
                            style={{
                              position: "absolute",
                              left: Math.min(x1, x2),
                              top: Math.min(y1, y2),
                              width: Math.abs(x2 - x1) || 2,
                              height: Math.abs(y2 - y1) || 2,
                              background: "#888",
                            }}
                          />
                        );
                      }
                      if (
                        el.type === "bar" ||
                        el.type === "buffet" ||
                        el.type === "kitchen"
                      ) {
                        return (
                          <div
                            key={el.id}
                            style={{
                              position: "absolute",
                              left: el.x,
                              top: el.y,
                              width: el.width,
                              height: el.height,
                              background:
                                el.type === "bar"
                                  ? "#fde68a"
                                  : el.type === "buffet"
                                    ? "#fbcfe8"
                                    : "#bae6fd",
                              borderRadius: 8,
                              border: "2px solid #888",
                            }}
                          />
                        );
                      }
                      return null;
                    })}
                  {/* Render tables (tables mode only) */}
                  {mode === "tables" &&
                    tables.map((table) => {
                      const preset = SHAPE_PRESETS[table.shape];
                      return (
                        <div
                          key={table.id}
                          className="absolute flex flex-col items-center justify-center border border-neutral-200 rounded-lg bg-white shadow-sm transition-all hover:scale-105"
                          style={{
                            left: table.x,
                            top: table.y,
                            width: preset.width,
                            height: preset.height,
                            zIndex: 2,
                          }}
                          onMouseDown={(e) => handleTableMouseDown(e, table.id)}
                          title="Drag to move"
                        >
                          <span className="font-bold text-xs text-neutral-900">
                            {table.label}
                          </span>
                          <span className="text-[10px] text-neutral-700">
                            {table.seats} seats
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Right Sidebar: Elements (was Legend) & Help */}
          <div className="space-y-4">
            <Card className="border-neutral-200 bg-white">
              <CardHeader>
                <CardTitle className="text-base font-medium text-neutral-900">
                  How to Edit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-neutral-700 space-y-2 list-disc pl-4">
                  <li>
                    {mode === "floor"
                      ? "Draw walls and place bar, buffet, kitchen, etc."
                      : "Drag tables to reposition them on the floor."}
                  </li>
                  <li>
                    {mode === "floor"
                      ? "Switch to tables mode after configuring the floor."
                      : "Click the trash icon to remove a table."}
                  </li>
                  <li>
                    {mode === "floor"
                      ? "You can always edit the floor later."
                      : "Click a table type on the left to add a new table."}
                  </li>
                  <li>Click "Save & Return" when done.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-neutral-200 bg-white">
              <CardHeader>
                <CardTitle className="text-base font-medium text-neutral-900">
                  Elements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Floor Elements Palette (floor mode only) */}
                  {mode === "floor" && (
                    <>
                      <button
                        className="flex items-center gap-2 border rounded p-2 bg-neutral-50 hover:bg-neutral-100 w-full shadow-sm focus:ring-2 focus:ring-lime-400 transition"
                        type="button"
                        aria-label="Select Wall Element"
                      >
                        <span className="w-4 h-4 bg-neutral-400 rounded" />
                        <span className="text-xs text-neutral-700">Wall</span>
                      </button>
                      <button
                        className="flex items-center gap-2 border rounded p-2 bg-neutral-50 hover:bg-neutral-100 w-full shadow-sm focus:ring-2 focus:ring-lime-400 transition"
                        type="button"
                        aria-label="Select Bar Element"
                      >
                        <span className="w-4 h-4 bg-yellow-300 rounded" />
                        <span className="text-xs text-neutral-700">Bar</span>
                      </button>
                      <button
                        className="flex items-center gap-2 border rounded p-2 bg-neutral-50 hover:bg-neutral-100 w-full shadow-sm focus:ring-2 focus:ring-lime-400 transition"
                        type="button"
                        aria-label="Select Buffet Element"
                      >
                        <span className="w-4 h-4 bg-pink-200 rounded" />
                        <span className="text-xs text-neutral-700">Buffet</span>
                      </button>
                      <button
                        className="flex items-center gap-2 border rounded p-2 bg-neutral-50 hover:bg-neutral-100 w-full shadow-sm focus:ring-2 focus:ring-lime-400 transition"
                        type="button"
                        aria-label="Select Kitchen Element"
                      >
                        <span className="w-4 h-4 bg-blue-200 rounded" />
                        <span className="text-xs text-neutral-700">
                          Kitchen
                        </span>
                      </button>
                    </>
                  )}
                  {/* Table Types Palette (tables mode only) */}
                  {mode === "tables" &&
                    tableTypes.map((type) => (
                      <button
                        key={type.id}
                        className="flex flex-col items-center border rounded p-2 bg-neutral-50 hover:bg-neutral-100 w-full shadow-sm focus:ring-2 focus:ring-lime-400 transition"
                        onClick={() => handleAddTable(type)}
                        type="button"
                        aria-label={`Add ${type.label} Table`}
                      >
                        <div
                          style={{
                            width: SHAPE_PRESETS[type.shape].width,
                            height: SHAPE_PRESETS[type.shape].height,
                            background: type.color,
                            borderRadius: 6,
                          }}
                          className="mb-1 border"
                        />
                        <span className="text-xs text-neutral-700">
                          {type.label || "Table"}
                        </span>
                      </button>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
