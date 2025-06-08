"use client";

import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Grid3X3, Users, Clock, CheckCircle, Trash2 } from "lucide-react";
import { useDemoContext } from "@/contexts/demo-context";
import React from "react";
import { useRouter } from "next/navigation";

type TableType = {
  id: number;
  label: string;
  seats: number;
  shape: "square" | "rectangle";
  width: number;
  height: number;
  color: string;
  count: number;
};

// Table placed on layout
type TableOnLayout = TableType & {
  x: number;
  y: number;
  typeId: number;
  id: number;
};

export function FloorPlanPage() {
  const { isDemoMode } = useDemoContext();
  const [tableTypes, setTableTypes] = useState<TableType[]>([
    {
      id: 1,
      label: "2-seat (square)",
      seats: 2,
      shape: "square",
      width: 48,
      height: 48,
      color: "#bef264",
      count: 0,
    },
    {
      id: 2,
      label: "4-seat (rectangle)",
      seats: 4,
      shape: "rectangle",
      width: 72,
      height: 40,
      color: "#86efac",
      count: 0,
    },
  ]);
  const [chairs, setChairs] = useState(0);
  const [tables, setTables] = useState<TableOnLayout[]>([]);
  const [draggedTableId, setDraggedTableId] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [showTypeEditor, setShowTypeEditor] = useState(false);
  const [highlightedTableId, setHighlightedTableId] = useState<number | null>(
    null,
  );
  const layoutRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // If demo is off, show zero/empty state
  const demoTables = isDemoMode
    ? [
        { id: 1, number: "1", seats: 2, status: "available", x: 50, y: 50 },
        {
          id: 2,
          number: "2",
          seats: 4,
          status: "occupied",
          x: 150,
          y: 50,
          party: "Johnson (4)",
          time: "45 min",
        },
        { id: 3, number: "3", seats: 2, status: "available", x: 250, y: 50 },
        {
          id: 4,
          number: "4",
          seats: 6,
          status: "reserved",
          x: 350,
          y: 50,
          party: "Smith (6)",
          time: "6:30 PM",
        },
        {
          id: 5,
          number: "5",
          seats: 4,
          status: "occupied",
          x: 50,
          y: 150,
          party: "Williams (3)",
          time: "25 min",
        },
        { id: 6, number: "6", seats: 2, status: "cleaning", x: 150, y: 150 },
        { id: 7, number: "7", seats: 8, status: "available", x: 250, y: 150 },
        {
          id: 8,
          number: "8",
          seats: 4,
          status: "occupied",
          x: 350,
          y: 150,
          party: "Brown (4)",
          time: "15 min",
        },
        { id: 9, number: "9", seats: 2, status: "available", x: 50, y: 250 },
        { id: 10, number: "10", seats: 4, status: "available", x: 150, y: 250 },
        {
          id: 11,
          number: "11",
          seats: 6,
          status: "reserved",
          x: 250,
          y: 250,
          party: "Davis (5)",
          time: "7:00 PM",
        },
        {
          id: 12,
          number: "12",
          seats: 2,
          status: "occupied",
          x: 350,
          y: 250,
          party: "Wilson (2)",
          time: "30 min",
        },
      ]
    : [];

  const availableTables = isDemoMode
    ? demoTables.filter((t) => t.status === "available").length
    : 0;
  const occupiedTables = isDemoMode
    ? demoTables.filter((t) => t.status === "occupied").length
    : 0;
  const reservedTables = isDemoMode
    ? demoTables.filter((t) => t.status === "reserved").length
    : 0;

  const getTableColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 border-green-300 text-green-800";
      case "occupied":
        return "bg-red-100 border-red-300 text-red-800";
      case "reserved":
        return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case "cleaning":
        return "bg-blue-100 border-blue-300 text-blue-800";
      default:
        return "bg-neutral-100 border-neutral-300 text-neutral-800";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200";
      case "occupied":
        return "bg-red-100 text-red-800 border-red-200";
      case "reserved":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cleaning":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-neutral-100 text-neutral-800 border-neutral-200";
    }
  };

  // Add table to layout
  const handleAddTable = (type: TableType) => {
    if (!layoutRef.current) return;
    // Place in center for now
    const rect = layoutRef.current.getBoundingClientRect();
    setTables((prev) => [
      ...prev,
      {
        ...type,
        typeId: type.id,
        id: Date.now() + Math.floor(Math.random() * 1000),
        x: rect.width / 2 - type.width / 2,
        y: rect.height / 2 - type.height / 2,
      },
    ]);
  };

  // Remove table from layout
  const handleRemoveTable = (id: number) => {
    setTables((prev) => prev.filter((t) => t.id !== id));
  };

  // Drag handlers for tables
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
    // Prevent text selection
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (draggedTableId === null || !dragOffset || !layoutRef.current) return;
    const layoutRect = layoutRef.current.getBoundingClientRect();
    setTables((prev) =>
      prev.map((t) =>
        t.id === draggedTableId
          ? {
              ...t,
              x: Math.max(
                0,
                Math.min(
                  e.clientX - layoutRect.left - dragOffset.x,
                  layoutRect.width - t.width,
                ),
              ),
              y: Math.max(
                0,
                Math.min(
                  e.clientY - layoutRect.top - dragOffset.y,
                  layoutRect.height - t.height,
                ),
              ),
            }
          : t,
      ),
    );
  };

  const handleMouseUp = () => {
    if (draggedTableId !== null) {
      setDraggedTableId(null);
      setDragOffset(null);
      document.body.style.userSelect = "";
    }
  };

  // Attach global mousemove/mouseup listeners in edit mode
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

  // Table Details Panel: use real tables if any, else demoTables
  const displayedTables = tables.length > 0 ? tables : demoTables;

  // Type guard for TableOnLayout (real table)
  function isRealTable(table: any): table is TableOnLayout {
    return (
      typeof table === "object" &&
      "typeId" in table &&
      "label" in table &&
      "color" in table &&
      "width" in table &&
      "height" in table
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
            Floor Plan
          </h1>
          <p className="text-neutral-600">Visual layout and table management</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => router.push("/floorplan/edit")}
          >
            Edit Layout
          </Button>
        </div>
      </div>

      {/* Table Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Total Tables
            </CardTitle>
            <Grid3X3 className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {demoTables.length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Available
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {availableTables}
            </div>
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Occupied
            </CardTitle>
            <Users className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {occupiedTables}
            </div>
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Reserved
            </CardTitle>
            <Clock className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {reservedTables}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Floor Plan Visual */}
        <Card className="lg:col-span-2 border-neutral-200 bg-white">
          <CardHeader>
            <CardTitle className="text-neutral-900">
              Restaurant Layout
            </CardTitle>
            <CardDescription>
              Interactive floor plan with real-time table status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex">
              {/* Table Types Palette (edit mode only) */}
              {false && (
                <div className="flex flex-col space-y-3 mr-6">
                  {tableTypes.map((type) => (
                    <button
                      key={type.id}
                      className="flex flex-col items-center border rounded p-2 bg-neutral-50 hover:bg-neutral-100"
                      onClick={() => handleAddTable(type)}
                      type="button"
                    >
                      <div
                        style={{
                          width: type.width,
                          height: type.height,
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
              )}
              {/* Layout Canvas */}
              <div
                ref={layoutRef}
                className="relative bg-neutral-50 rounded-lg p-4 flex-1 border-2 border-dashed border-neutral-200 shadow-sm transition-shadow min-h-[400px] min-w-[300px] flex items-center justify-center"
                style={{ height: "400px", minWidth: 300 }}
              >
                {/* Empty state guidance */}
                {displayedTables.length === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                    <div className="text-neutral-400 text-2xl mb-2">🖊️</div>
                    <div className="text-neutral-500 text-sm text-center max-w-xs">
                      No tables or elements placed yet.
                    </div>
                  </div>
                )}

                {/* Kitchen Area */}
                {isDemoMode && (
                  <div className="absolute top-4 right-4 w-24 h-16 bg-neutral-200 rounded border-2 border-dashed border-neutral-400 flex items-center justify-center">
                    <span className="text-xs text-neutral-600">Kitchen</span>
                  </div>
                )}

                {/* Bar Area */}
                {isDemoMode && (
                  <div className="absolute bottom-4 left-4 w-32 h-12 bg-orange-100 rounded border-2 border-orange-300 flex items-center justify-center">
                    <span className="text-xs text-orange-700">Bar</span>
                  </div>
                )}

                {/* Render placed tables */}
                {displayedTables.map((table) => {
                  // Determine border color based on status (for demo tables)
                  let borderColor = "#a3a3a3";
                  if (!isRealTable(table) && table.status) {
                    switch (table.status) {
                      case "available":
                        borderColor = "#bbf7d0"; // green-200
                        break;
                      case "occupied":
                        borderColor = "#fecaca"; // red-200
                        break;
                      case "reserved":
                        borderColor = "#fef08a"; // yellow-200
                        break;
                      case "cleaning":
                        borderColor = "#bae6fd"; // blue-200
                        break;
                      default:
                        borderColor = "#a3a3a3";
                    }
                  }
                  // Use a softer, more neutral fill color for demo tables
                  const demoTableFill = "#f9fafb"; // Tailwind gray-50
                  return isRealTable(table) ? (
                    <div
                      key={table.id}
                      className={`absolute flex flex-col items-center justify-center border-2 cursor-pointer transition-all hover:scale-105 ${highlightedTableId === table.id ? "ring-2 ring-lime-500 z-10" : ""}`}
                      style={{
                        left: table.x,
                        top: table.y,
                        width: table.width,
                        height: table.height,
                        background: table.color,
                        borderRadius: 8,
                        borderColor: "#a3a3a3",
                      }}
                      onMouseEnter={() => setHighlightedTableId(table.id)}
                      onMouseLeave={() => setHighlightedTableId(null)}
                      onMouseDown={
                        false
                          ? (e) => handleTableMouseDown(e, table.id)
                          : undefined
                      }
                      onClick={
                        false ? () => handleRemoveTable(table.id) : undefined
                      }
                      title={false ? "Click to remove" : table.label}
                    >
                      <span className="font-bold text-xs text-neutral-900">
                        {table.label}
                      </span>
                      <span className="text-[10px] text-neutral-700">
                        {table.seats} seats
                      </span>
                    </div>
                  ) : (
                    <div
                      key={table.id}
                      className={`absolute flex flex-col items-center justify-center border-2 cursor-pointer transition-all hover:scale-105 ${highlightedTableId === table.id ? "ring-2 ring-lime-500 z-10" : ""}`}
                      style={{
                        left: table.x,
                        top: table.y,
                        width: 48,
                        height: 48,
                        background: demoTableFill,
                        borderRadius: 8,
                        borderColor,
                      }}
                      onMouseEnter={() => setHighlightedTableId(table.id)}
                      onMouseLeave={() => setHighlightedTableId(null)}
                      title={table.number}
                    >
                      <span className="font-bold text-xs text-neutral-900">
                        {`Table ${table.number}`}
                      </span>
                      <span className="text-[10px] text-neutral-700">
                        {table.seats} seats
                      </span>
                    </div>
                  );
                })}

                {/* Legend */}
                {isDemoMode && (
                  <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg border border-neutral-200 shadow-sm">
                    <h4 className="text-xs font-medium text-neutral-900 mb-2">
                      Legend
                    </h4>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                        <span className="text-xs text-neutral-600">
                          Available
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
                        <span className="text-xs text-neutral-600">
                          Occupied
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded"></div>
                        <span className="text-xs text-neutral-600">
                          Reserved
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
                        <span className="text-xs text-neutral-600">
                          Cleaning
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Details */}
        <Card className="border-neutral-200 bg-white">
          <CardHeader>
            <CardTitle className="text-neutral-900">Table Status</CardTitle>
            <CardDescription>Current table information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {displayedTables.length === 0 ? (
                <div className="text-center text-neutral-400 text-sm py-8">
                  No tables to display
                </div>
              ) : (
                displayedTables.map((table) =>
                  isRealTable(table) ? (
                    <div
                      key={table.id}
                      className={`flex items-center justify-between p-3 border border-neutral-200 rounded-lg transition-all ${highlightedTableId === table.id ? "ring-2 ring-lime-500 bg-lime-50" : ""}`}
                      onMouseEnter={() => setHighlightedTableId(table.id)}
                      onMouseLeave={() => setHighlightedTableId(null)}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-8 h-8 rounded flex items-center justify-center"
                          style={{ background: table.color }}
                        >
                          <span className="text-sm font-medium text-neutral-900">
                            {table.label}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-900">
                            {table.label} ({table.seats} seats)
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        available
                      </Badge>
                    </div>
                  ) : (
                    <div
                      key={table.id}
                      className={`flex items-center justify-between p-3 border border-neutral-200 rounded-lg transition-all ${highlightedTableId === table.id ? "ring-2 ring-lime-500 bg-lime-50" : ""}`}
                      onMouseEnter={() => setHighlightedTableId(table.id)}
                      onMouseLeave={() => setHighlightedTableId(null)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-lime-100 rounded flex items-center justify-center">
                          <span className="text-sm font-medium text-neutral-900">
                            {table.number}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-900">
                            Table {table.number} ({table.seats} seats)
                          </p>
                          {table.party && (
                            <p className="text-xs text-neutral-600">
                              {table.party}
                            </p>
                          )}
                          {table.time && (
                            <p className="text-xs text-neutral-500">
                              {table.time}
                            </p>
                          )}
                        </div>
                      </div>
                      <Badge
                        className={getStatusBadgeColor(
                          table.status || "available",
                        )}
                      >
                        {table.status || "available"}
                      </Badge>
                    </div>
                  ),
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
