"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import React from "react";
import { RestaurantCanvas } from "@/components/restaurant-canvas";
import { useFloorplan } from "@/contexts/floorplan-context";
import { HowToCard } from "@/components/floorplan/HowToCard";
import { ElementsCard } from "@/components/floorplan/ElementsCard";
import { ElementItem } from "@/components/floorplan/ElementItem";
import { EditSidebar } from "@/components/floorplan/EditSidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Bell, Settings, LogOut } from "lucide-react";
import { DemoToggle } from "@/components/demo-toggle";
import {
  ZoneElement,
  BarrierElement,
  TableElement,
  ElementType,
  FloorplanElement,
} from "@/types/element-types";

export default function FloorplanEditPageInner() {
  // State
  const [zones, setZones] = useState<(ZoneElement | BarrierElement)[]>([]);
  const { tableTypes, tables, setTables } = useFloorplan();
  const [selectedElement, setSelectedElement] = useState<ElementType | null>(
    null,
  );
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    elementId: string | number;
    elementType: ElementType;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [editElement, setEditElement] = useState<FloorplanElement | null>(null);
  const [hoveredElement, setHoveredElement] = useState<{
    id: string | number;
    type: ElementType;
  } | null>(null);
  const [isDragOutOfBounds, setIsDragOutOfBounds] = useState(false);

  // Ghost preview state for placement
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const layoutRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Constants
  const SHAPE_PRESETS = {
    square: { width: 48, height: 48 },
    rectangle: { width: 72, height: 40 },
    circle: { width: 48, height: 48 },
  };
  const ZONE_PRESET = { width: 50, height: 50 };

  // Helper function to check if element is out of canvas bounds
  const isElementOutOfBounds = (
    elementId: string | number,
    elementType: ElementType,
  ) => {
    if (!layoutRef.current) return false;

    const canvasRect = layoutRef.current.getBoundingClientRect();
    let element;

    if (elementType === "table") {
      element = tables.find((t) => t.id === elementId);
    } else {
      element = zones.find((z) => z.id === elementId);
    }

    if (!element) return false;

    // Check if element is completely outside canvas bounds
    const isOutside =
      element.x + element.width < 0 ||
      element.x > canvasRect.width ||
      element.y + element.height < 0 ||
      element.y > canvasRect.height;

    return isOutside;
  };

  // Cursor and hover management
  const getCursor = () => {
    if (isResizing) return "nwse-resize";
    if (dragState?.isDragging) return "grabbing";
    if (selectedElement) return "crosshair";
    if (hoveredElement) return "pointer";
    return "default";
  };

  const handleCanvasMouseEnter = () => {
    // Reset hover state when entering canvas
    setHoveredElement(null);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!layoutRef.current || isResizing) return;

    const rect = layoutRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Handle dragging first (highest priority)
    if (dragState) {
      if (!dragState.isDragging) {
        setDragState({ ...dragState, isDragging: true });
      }

      updateElementPosition(
        dragState.elementType,
        dragState.elementId,
        x - dragState.offsetX,
        y - dragState.offsetY,
      );

      // Check if element is out of bounds after position update
      const outOfBounds = isElementOutOfBounds(
        dragState.elementId,
        dragState.elementType,
      );
      setIsDragOutOfBounds(outOfBounds);

      return; // Exit early when dragging
    }

    // Update mouse position for ghost preview
    setMousePosition({ x, y });

    // Update hover state (only when not dragging)
    const hit = getElementAtPosition(x, y);
    if (hit && !selectedElement) {
      setHoveredElement({ id: hit.id, type: hit.type });
    } else {
      setHoveredElement(null);
    }
  };

  const handleCanvasMouseLeave = () => {
    setHoveredElement(null);
    setMousePosition(null);
  };

  const renderGhostPreview = () => {
    if (!selectedElement || !mousePosition || dragState || isResizing)
      return null;

    const isTable =
      selectedElement.startsWith("TableType:") ||
      ["square", "rectangle", "circle"].includes(selectedElement);

    let previewElement;
    if (isTable) {
      const tableType = selectedElement.startsWith("TableType:")
        ? tableTypes.find(
            (t) => t.id === Number(selectedElement.replace("TableType:", "")),
          )
        : tableTypes[0];

      const defaultType = tableType || {
        id: Date.now(),
        label: "Table",
        seats: 2,
        shape: "square" as const,
        color: "#bef264",
        count: 0,
      };

      const preset = SHAPE_PRESETS[defaultType.shape];
      previewElement = {
        x: mousePosition.x - preset.width / 2,
        y: mousePosition.y - preset.height / 2,
        width: preset.width,
        height: preset.height,
        color: defaultType.color,
        type: "table" as const,
        label: defaultType.label,
        seats: defaultType.seats,
      };
    } else {
      previewElement = {
        x: mousePosition.x - ZONE_PRESET.width / 2,
        y: mousePosition.y - ZONE_PRESET.height / 2,
        width: ZONE_PRESET.width,
        height: ZONE_PRESET.height,
        color: selectedElement === "barrier" ? "#a3a3a3" : "#fef08a",
        type: selectedElement as "zone" | "barrier",
        name: selectedElement === "barrier" ? "Barrier" : "Zone",
      };
    }

    return (
      <div
        className="absolute pointer-events-none opacity-50 border-2 border-dashed border-lime-400 bg-lime-100 flex items-center justify-center text-xs font-medium text-neutral-600 rounded"
        style={{
          left: Math.max(0, previewElement.x),
          top: Math.max(0, previewElement.y),
          width: previewElement.width,
          height: previewElement.height,
          zIndex: 100,
        }}
      >
        {isTable ? `${previewElement.label}` : previewElement.name}
      </div>
    );
  };

  // Helper functions
  const getElementAtPosition = (x: number, y: number) => {
    const allElements = [
      ...tables.map((t) => ({ type: "table" as const, id: t.id, element: t })),
      ...zones.map((z) => ({ type: z.type, id: z.id, element: z })),
    ];

    return (
      allElements.find(
        ({ element }) =>
          x >= element.x &&
          x <= element.x + element.width &&
          y >= element.y &&
          y <= element.y + element.height,
      ) || null
    );
  };

  const updateElementPosition = (
    elementType: ElementType,
    elementId: string | number,
    x: number,
    y: number,
  ) => {
    if (elementType === "table") {
      setTables(
        tables.map((table) =>
          table.id === elementId
            ? { ...table, x: Math.max(0, x), y: Math.max(0, y) }
            : table,
        ),
      );
    } else {
      setZones(
        zones.map((zone) =>
          zone.id === elementId
            ? { ...zone, x: Math.max(0, x), y: Math.max(0, y) }
            : zone,
        ),
      );
    }
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!layoutRef.current || isResizing) return;

    const rect = layoutRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const hit = getElementAtPosition(x, y);

    if (hit) {
      setDragState({
        isDragging: false,
        elementId: hit.id,
        elementType: hit.type,
        offsetX: x - hit.element.x,
        offsetY: y - hit.element.y,
      });
    }
  };

  function handleMouseUp(e: React.MouseEvent<HTMLDivElement>) {
    if (!layoutRef.current || isResizing) return;

    const rect = layoutRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (dragState) {
      if (dragState.isDragging) {
        // Was dragging - check if out of bounds for deletion
        if (isDragOutOfBounds) {
          // Delete the element that was dragged out of bounds
          if (dragState.elementType === "table") {
            setTables(tables.filter((t) => t.id !== dragState.elementId));
          } else {
            setZones(zones.filter((z) => z.id !== dragState.elementId));
          }
          // Clear edit selection if the deleted element was being edited
          if (editElement?.id === dragState.elementId) {
            setEditElement(null);
          }
        }
        // Reset drag state and out-of-bounds flag
        setDragState(null);
        setIsDragOutOfBounds(false);
      } else {
        // Was not dragging - this means it was just a click
        // Check if we clicked on the same element we had selected
        const hit = getElementAtPosition(x, y);
        if (hit && hit.id === dragState.elementId) {
          // Clicked on the same element - show it in sidebar for editing
          selectElementForEditing(hit.type, hit.id);
        }
        setDragState(null);
      }
    } else if (selectedElement) {
      // We have a selected element from toolbar - place it
      const newElement = createNewElement(selectedElement, x, y);

      if (newElement.type === "table") {
        setTables([...tables, newElement as TableElement]);
      } else {
        setZones([...zones, newElement as ZoneElement | BarrierElement]);
      }
      // Clear the sidebar when placing new elements
      setEditElement(null);
      // Don't clear selectedElement - let user place multiple elements
    } else {
      // Clicked on empty canvas with no selected element - clear sidebar
      setEditElement(null);
    }
  }

  // Element selection for editing
  const selectElementForEditing = (type: ElementType, id: number | string) => {
    if (type === "table") {
      const table = tables.find((t) => t.id === id);
      if (table) setEditElement({ ...table });
    } else {
      const zone = zones.find((z) => z.id === id);
      if (zone) setEditElement({ ...zone });
    }
  };

  const closeEditModal = () => {
    setEditElement(null);
  };

  const handleEditChange = (data: FloorplanElement) => {
    setEditElement(data);
    if (data.type === "table") {
      setTables(tables.map((t) => (t.id === data.id ? { ...t, ...data } : t)));
    } else if (data.type === "zone" || data.type === "barrier") {
      setZones(zones.map((z) => (z.id === data.id ? { ...z, ...data } : z)));
    }
  };

  const handleEditRemove = () => {
    if (editElement?.type === "table") {
      setTables(tables.filter((t) => t.id !== editElement?.id));
    } else {
      setZones(zones.filter((z) => z.id !== editElement?.id));
    }
    closeEditModal();
  };

  // Element creation helpers
  const createNewElement = (
    type: ElementType,
    x: number,
    y: number,
  ): FloorplanElement => {
    const id = Date.now() + Math.floor(Math.random() * 1000);

    if (type === "zone") {
      return {
        id,
        name: "Zone",
        x: x - ZONE_PRESET.width / 2,
        y: y - ZONE_PRESET.height / 2,
        width: ZONE_PRESET.width,
        height: ZONE_PRESET.height,
        color: "#fef08a",
        type: "zone" as const,
      };
    }

    if (type === "barrier") {
      return {
        id,
        name: "Barrier",
        x: x - ZONE_PRESET.width / 2,
        y: y - ZONE_PRESET.height / 2,
        width: ZONE_PRESET.width,
        height: ZONE_PRESET.height,
        color: "#a3a3a3",
        type: "barrier" as const,
      };
    }

    // Table creation
    const tableType = type.startsWith("TableType:")
      ? tableTypes.find((t) => t.id === Number(type.replace("TableType:", "")))
      : tableTypes[0];

    const defaultType = tableType || {
      id: Date.now(),
      label: "Table",
      seats: 2,
      shape: "square" as const,
      color: "#bef264",
      count: 0,
    };

    const preset = SHAPE_PRESETS[defaultType.shape];
    return {
      id,
      type: "table" as const,
      label: defaultType.label,
      seats: defaultType.seats,
      shape: defaultType.shape,
      color: defaultType.color,
      x: x - preset.width / 2,
      y: y - preset.height / 2,
      width: preset.width,
      height: preset.height,
    };
  };

  // Resize handler
  const createResizeHandler =
    (
      elementType: ElementType,
      elementId: string | number,
      initialWidth: number,
      initialHeight: number,
    ) =>
    (e: React.MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation();
      setIsResizing(true);
      const startX = e.clientX;
      const startY = e.clientY;

      const onMove = (ev: MouseEvent) => {
        const newWidth = Math.max(24, initialWidth + (ev.clientX - startX));
        const newHeight = Math.max(24, initialHeight + (ev.clientY - startY));

        if (elementType === "table") {
          setTables(
            tables.map((t) =>
              t.id === elementId
                ? { ...t, width: newWidth, height: newHeight }
                : t,
            ),
          );
        } else {
          setZones(
            zones.map((z) =>
              z.id === elementId
                ? { ...z, width: newWidth, height: newHeight }
                : z,
            ),
          );
        }
      };

      const onUp = () => {
        setIsResizing(false);
        if (typeof globalThis !== "undefined" && globalThis.document) {
          globalThis.document.removeEventListener("mousemove", onMove);
          globalThis.document.removeEventListener("mouseup", onUp);
        }
      };

      if (typeof globalThis !== "undefined" && globalThis.document) {
        globalThis.document.addEventListener("mousemove", onMove);
        globalThis.document.addEventListener("mouseup", onUp);
      }
    };

  // Save and navigation
  const handleElementSelect = useCallback((type: ElementType) => {
    setSelectedElement((prev) => (prev === type ? null : type));
  }, []);

  // Escape key handler
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedElement(null);
    };

    if (typeof globalThis !== "undefined" && globalThis.window) {
      globalThis.window.addEventListener("keydown", handleKeyDown);
      return () =>
        globalThis.window.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  return (
    <div className="h-screen flex bg-neutral-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <EditSidebar
          editElement={editElement}
          onEditChange={handleEditChange}
          onEditRemove={handleEditRemove}
          onCloseEdit={closeEditModal}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Top navigation - exact same as DashboardLayout */}
        <div className="sticky top-0 z-40 flex h-14 sm:h-16 shrink-0 items-center gap-x-2 sm:gap-x-4 border-b border-neutral-200 bg-white px-3 sm:px-4 shadow-sm lg:px-6 xl:px-8">
          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden min-h-[44px] min-w-[44px] touch-manipulation"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">Open sidebar</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <EditSidebar
                editElement={editElement}
                onEditChange={handleEditChange}
                onEditRemove={handleEditRemove}
                onCloseEdit={closeEditModal}
              />
            </SheetContent>
          </Sheet>

          <div className="flex flex-1 gap-x-2 sm:gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
                <div className="hidden sm:block">
                  <DemoToggle />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-2 sm:gap-x-4 lg:gap-x-6">
              {/* Notifications */}
              <div className="hidden sm:block">
                <Button
                  variant="outline"
                  size="icon"
                  className="relative min-h-[44px] min-w-[44px] touch-manipulation"
                >
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 sm:h-3 sm:w-3 bg-lime-500 rounded-full"></span>
                  <span className="sr-only">View notifications</span>
                </Button>
              </div>

              {/* Profile dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full min-h-[44px] min-w-[44px] touch-manipulation focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none data-[state=open]:bg-lime-100 data-[state=open]:ring-2 data-[state=open]:ring-lime-300"
                  >
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                      <AvatarImage
                        src="/placeholder-user.jpg"
                        alt="User"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <AvatarFallback className="bg-lime-100 text-lime-700">
                        JD
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        John Doe
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        manager@restaurant.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="sm:hidden">
                    <DropdownMenuItem>
                      <Button
                        variant="outline"
                        size="icon"
                        className="relative min-h-[44px] min-w-[44px] touch-manipulation w-full justify-start"
                      >
                        <Bell className="h-4 w-4 mr-2" />
                        <span>Notifications</span>
                        <span className="absolute -top-1 right-2 h-2.5 w-2.5 bg-lime-500 rounded-full"></span>
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <DemoToggle />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </div>
                  <DropdownMenuItem onClick={() => router.push("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-neutral-50">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                  Edit Floorplan Layout
                </h1>
                <p className="text-neutral-600">
                  Add and arrange zones, barriers, and areas for your perfect
                  layout.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="default"
                  className="min-h-[44px] min-w-[44px] px-4"
                  onClick={() => router.push("/floorplan")}
                >
                  Cancel
                </Button>
                <Button
                  size="default"
                  className="bg-lime-600 hover:bg-lime-700 text-white min-h-[44px] min-w-[44px] px-4"
                  onClick={() => router.push("/floorplan")}
                >
                  Save & Return
                </Button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6">
              <div className="grid gap-6 lg:grid-cols-4 h-full">
                {/* Canvas Area */}
                <div className="lg:col-span-3">
                  <Card className="border-neutral-200 h-full">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-neutral-900">
                          Restaurant Layout
                        </CardTitle>
                        <div className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full">
                          {selectedElement
                            ? `Click to place ${selectedElement === "zone" ? "zone" : selectedElement === "barrier" ? "barrier" : "table"}`
                            : editElement
                              ? `Editing ${editElement.type}${editElement.type === "table" ? `: ${(editElement as TableElement).label}` : (editElement as ZoneElement | BarrierElement).name ? `: ${(editElement as ZoneElement | BarrierElement).name}` : ""}`
                              : "Click an element to edit, or select a tool to place new elements"}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="h-[calc(100%-80px)]">
                      <div className="w-full h-full flex justify-center">
                        <RestaurantCanvas
                          ref={layoutRef}
                          width="100%"
                          height="100%"
                          onMouseDown={handleMouseDown}
                          onMouseMove={handleCanvasMouseMove}
                          onMouseUp={handleMouseUp}
                          onMouseEnter={handleCanvasMouseEnter}
                          onMouseLeave={handleCanvasMouseLeave}
                          className="relative bg-gray-50 border-2 border-dashed border-gray-300 overflow-hidden"
                          style={{
                            cursor: getCursor(),
                            position: "relative",
                          }}
                        >
                          {/* Render tables */}
                          {tables.map((table) => (
                            <ElementItem
                              key={table.id}
                              element={{ ...table, type: "table" }}
                              isSelected={editElement?.id === table.id}
                              isHovered={
                                hoveredElement?.id === table.id &&
                                hoveredElement?.type === "table"
                              }
                              isDragging={
                                dragState?.elementId === table.id &&
                                dragState.isDragging
                              }
                              isOutOfBounds={
                                isDragOutOfBounds &&
                                dragState?.elementId === table.id &&
                                dragState.isDragging
                              }
                              disableTransitions={true}
                              onResizeMouseDown={createResizeHandler(
                                "table",
                                table.id,
                                table.width ?? 48,
                                table.height ?? 48,
                              )}
                            />
                          ))}
                          {/* Render zones */}
                          {zones.map((zone) => (
                            <ElementItem
                              key={zone.id}
                              element={{ ...zone }}
                              isSelected={editElement?.id === zone.id}
                              isHovered={
                                hoveredElement?.id === zone.id &&
                                hoveredElement?.type === zone.type
                              }
                              isDragging={
                                dragState?.elementId === zone.id &&
                                dragState.isDragging
                              }
                              isOutOfBounds={
                                isDragOutOfBounds &&
                                dragState?.elementId === zone.id &&
                                dragState.isDragging
                              }
                              disableTransitions={true}
                              onResizeMouseDown={createResizeHandler(
                                zone.type,
                                zone.id,
                                zone.width ?? 50,
                                zone.height ?? 50,
                              )}
                            />
                          ))}
                          {renderGhostPreview()}
                        </RestaurantCanvas>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Sidebar - Tools */}
                <div className="space-y-4">
                  <HowToCard />
                  <ElementsCard
                    selectedElement={selectedElement}
                    handleElementSelect={handleElementSelect}
                    tableTypes={tableTypes}
                    SHAPE_PRESETS={SHAPE_PRESETS}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
