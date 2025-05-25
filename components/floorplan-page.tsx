"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Grid3X3, Users, Clock, CheckCircle } from "lucide-react";
import { useDemoContext } from "@/contexts/demo-context";

export function FloorPlanPage() {
  const { isDemoMode } = useDemoContext();

  // If demo is off, show zero/empty state
  const tables = isDemoMode
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
    ? tables.filter((t) => t.status === "available").length
    : 0;
  const occupiedTables = isDemoMode
    ? tables.filter((t) => t.status === "occupied").length
    : 0;
  const reservedTables = isDemoMode
    ? tables.filter((t) => t.status === "reserved").length
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
          <Button variant="outline">Edit Layout</Button>
          <Button>Refresh</Button>
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
              {tables.length}
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
            <div
              className="relative bg-neutral-50 rounded-lg p-4"
              style={{ height: "400px" }}
            >
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

              {/* Tables */}
              {tables.map((table) => (
                <div
                  key={table.id}
                  className={`absolute w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 ${getTableColor(table.status)}`}
                  style={{ left: table.x, top: table.y }}
                >
                  <span className="font-bold text-sm">{table.number}</span>
                  <span className="text-xs">{table.seats} seats</span>
                </div>
              ))}

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
                      <span className="text-xs text-neutral-600">Occupied</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded"></div>
                      <span className="text-xs text-neutral-600">Reserved</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
                      <span className="text-xs text-neutral-600">Cleaning</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Table Details */}
        <Card className="border-neutral-200 bg-white">
          <CardHeader>
            <CardTitle className="text-neutral-900">Table Status</CardTitle>
            <CardDescription>Current table information</CardDescription>
            <p className="text-5xl">todo: add filter here</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tables.length === 0 ? (
                <div className="text-center text-neutral-400 text-sm py-8">
                  No tables to display
                </div>
              ) : (
                tables.map((table) => (
                  <div
                    key={table.id}
                    className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg"
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
                    <Badge className={getStatusBadgeColor(table.status)}>
                      {table.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
