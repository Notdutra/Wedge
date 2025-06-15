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
import { Skeleton } from "@/components/ui/skeleton";
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
  const { tables, zones, isLoading } = useFloorplan();
  const [highlightedTableId, setHighlightedTableId] = useState<
    number | string | null
  >(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Get demo data and stats when in demo mode
  const currentDemoTables = isDemoMode ? demoTables : [];
  const stats = getTableStats(currentDemoTables);

  // Determine the state we're in - check for any floorplan elements
  const hasRealTables = tables.length > 0;
  const hasRealZones = zones.length > 0;
  const hasRealFloorplan = hasRealTables || hasRealZones;

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
        {isLoading ? (
          // Complete loading skeleton
          <>
            <div className="flex justify-between items-center">
              <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-72" />
              </div>
              <Skeleton className="h-10 w-32" />
            </div>

            {/* Table Stats skeleton */}
            <div className="grid gap-4 md:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="border-neutral-200 bg-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-12" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main content skeleton */}
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2 border-neutral-200 bg-white">
                <CardHeader>
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-neutral-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Skeleton className="w-12 h-12 rounded mx-auto mb-4" />
                      <Skeleton className="h-4 w-32 mx-auto mb-2" />
                      <Skeleton className="h-3 w-48 mx-auto" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-neutral-200 bg-white">
                <CardHeader>
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-3 p-3 rounded-lg border border-neutral-200"
                      >
                        <Skeleton className="w-4 h-4 rounded" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-20 mb-1" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <>
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

            {!hasRealFloorplan && !isDemoMode ? (
              /* Empty state - no floorplan elements at all */
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
              /* Has floorplan elements or demo mode - use grid layout */
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Floor Plan Visual */}
                <Card className="lg:col-span-2 border-neutral-200">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-neutral-900">
                          Restaurant Layout
                        </CardTitle>
                        <CardDescription>
                          Interactive floor plan with real-time table status
                        </CardDescription>
                      </div>
                      {/* Edit button when floorplan exists */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => router.push("/floorplan/edit")}
                      >
                        <Edit className="w-4 h-4" />
                        Edit Layout
                      </Button>
                    </div>
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

                        {/* Render zones and barriers */}
                        {zones.map((zone) => (
                          <div
                            key={zone.id}
                            style={{
                              position: "absolute",
                              left: zone.x,
                              top: zone.y,
                              width: zone.width,
                              height: zone.height,
                              backgroundColor: zone.color,
                              border: "2px solid rgba(0,0,0,0.2)",
                              borderRadius:
                                zone.type === "zone" ? "8px" : "4px",
                              opacity: 0.7,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              fontWeight: "500",
                              color: "#fff",
                              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                              pointerEvents: "none",
                            }}
                          >
                            {zone.name}
                          </div>
                        ))}

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
                    <CardTitle className="text-neutral-900">
                      Table Status
                    </CardTitle>
                    <CardDescription>Current table information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {displayedTables.length > 0 ? (
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
                    ) : (
                      <div className="text-center py-8">
                        <Users className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                        <p className="text-sm text-neutral-600">
                          {hasRealZones
                            ? "No tables added yet. Add tables to see status information."
                            : "No tables in your layout"}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        )}
      </div>
    </FloorplanProvider>
  );
}
