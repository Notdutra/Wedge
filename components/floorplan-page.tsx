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
import { Grid3X3, Users, Clock, CheckCircle, Edit, Plus } from "lucide-react";
import { useDemoContext } from "@/contexts/demo-context";
import { useRouter } from "next/navigation";
import { useFloorplan, FloorplanProvider } from "@/contexts/floorplan-context";
import { RestaurantCanvas } from "@/components/restaurant-canvas";
import { TableElement } from "@/types/element-types";
import {
  demoTables,
  getTableStats,
  getTableStatusColor,
  DemoLayoutElements,
  TableRender,
  TableDetailItem,
  type DemoTable,
} from "@/demo";

export function FloorPlanPage() {
  const { isDemoMode } = useDemoContext();
  const { tables } = useFloorplan();
  const [highlightedTableId, setHighlightedTableId] = useState<
    number | string | null
  >(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Get demo data and stats when in demo mode
  const currentDemoTables = isDemoMode ? demoTables : [];
  const stats = getTableStats(currentDemoTables);

  // Determine the state we're in
  const hasRealTables = tables.length > 0;
  const hasAnyTables = hasRealTables || currentDemoTables.length > 0;

  // Table Details Panel: use real tables if any, else demo tables
  const displayedTables: (TableElement | DemoTable)[] = hasRealTables
    ? tables
    : currentDemoTables;

  // Type guard for TableElement (real table)
  function isRealTable(table: TableElement | DemoTable): table is TableElement {
    return (
      typeof table === "object" &&
      "type" in table &&
      "label" in table &&
      "color" in table &&
      "width" in table &&
      "height" in table
    );
  }

  return (
    <FloorplanProvider>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
              Floor Plan
            </h1>
            <p className="text-neutral-600">
              Visual layout and table management
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={hasRealTables ? "outline" : "default"}
              onClick={() => router.push("/floorplan/edit")}
              className="flex items-center gap-2"
            >
              {hasRealTables ? (
                <>
                  <Edit className="w-4 h-4" />
                  Edit Layout
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Create Layout
                </>
              )}
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
                {stats.total}
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
                {stats.available}
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
                {stats.occupied}
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
                {stats.reserved}
              </div>
            </CardContent>
          </Card>
        </div>

        {!hasAnyTables ? (
          /* Empty state - no tables at all */
          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <CardTitle className="text-neutral-900">
                Restaurant Layout
              </CardTitle>
              <CardDescription>
                Interactive floor plan with real-time table status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Grid3X3 className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 mb-2">
                  Create your floorplan
                </h3>
                <p className="text-neutral-600 mb-4">
                  Design your restaurant layout by adding tables, zones, and
                  other elements. Enable demo mode to see sample data.
                </p>
                <Button
                  className="mx-auto flex items-center gap-2"
                  onClick={() => router.push("/floorplan/edit")}
                >
                  <Plus className="w-4 h-4" />
                  Create Floorplan
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Has tables - use grid layout */
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Floor Plan Visual */}
            <Card className="lg:col-span-2 border-neutral-200">
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
                  {/* Layout Canvas */}
                  <RestaurantCanvas
                    ref={layoutRef}
                    width="100%"
                    height={600}
                    style={{ position: "relative" }}
                    className="flex-1"
                  >
                    {/* Demo layout elements (kitchen, bar, legend) */}
                    <DemoLayoutElements isDemoMode={isDemoMode} />

                    {/* Render placed tables */}
                    {displayedTables.map((table) => (
                      <TableRender
                        key={table.id}
                        table={table}
                        highlightedTableId={highlightedTableId}
                        onMouseEnter={setHighlightedTableId}
                        onMouseLeave={() => setHighlightedTableId(null)}
                        isRealTable={isRealTable}
                        getTableStatusColor={getTableStatusColor}
                      />
                    ))}
                  </RestaurantCanvas>
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
                  {displayedTables.map((table) => (
                    <TableDetailItem
                      key={table.id}
                      table={table}
                      highlightedTableId={highlightedTableId}
                      onMouseEnter={setHighlightedTableId}
                      onMouseLeave={() => setHighlightedTableId(null)}
                      isRealTable={isRealTable}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </FloorplanProvider>
  );
}
