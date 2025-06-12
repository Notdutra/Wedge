import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WedgeLogo } from "@/components/wedge-logo";
import {
  TableElement,
  ZoneElement,
  BarrierElement,
} from "@/types/element-types";

interface EditSidebarProps {
  editElement: TableElement | ZoneElement | BarrierElement | null;
  onEditChange: (data: TableElement | ZoneElement | BarrierElement) => void;
  onEditRemove: () => void;
  onCloseEdit: () => void;
}

export const EditSidebar: React.FC<EditSidebarProps> = ({
  editElement,
  onEditChange,
  onEditRemove,
  onCloseEdit,
}) => {
  const isActive = !!editElement;
  const containerClass = isActive ? "" : "opacity-50";
  const inputClass = `w-full border rounded px-2 py-1 ${isActive ? "" : "bg-gray-50 text-gray-400"}`;

  const isTable = editElement?.type === "table";
  const isBarrier = editElement?.type === "barrier";

  return (
    <div className="flex h-full flex-col bg-white border-r border-neutral-200">
      {/* Logo header - matches dashboard layout exactly */}
      <div className="flex h-14 sm:h-16 shrink-0 items-center px-3 sm:px-4 border-b border-neutral-200">
        <WedgeLogo />
      </div>

      {/* Properties Panel */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-3 py-3 sm:py-4">
        <Card className="border-neutral-200">
          <CardHeader>
            <CardTitle className="text-neutral-900 flex justify-between items-center">
              <span>
                {isActive
                  ? `${isTable ? "Table" : isBarrier ? "Barrier" : "Zone"} Properties`
                  : "Element Properties"}
              </span>
              {isActive && (
                <button
                  className="text-neutral-400 hover:text-neutral-700"
                  onClick={onCloseEdit}
                >
                  ×
                </button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className={containerClass}>
            <div className="space-y-4">
              {/* Name/Label */}
              <div>
                <label className="block text-xs font-medium mb-1 text-neutral-700">
                  {isTable ? "Table Name" : "Element Name"}
                </label>
                <input
                  className={inputClass}
                  value={
                    isActive
                      ? isTable
                        ? (editElement as TableElement).label
                        : (editElement as ZoneElement | BarrierElement).name
                      : ""
                  }
                  placeholder={
                    isTable
                      ? "e.g. Table 1, VIP Table"
                      : "e.g. Kitchen Area, Entrance"
                  }
                  disabled={!isActive}
                  onChange={(e) =>
                    isActive &&
                    onEditChange(
                      isTable
                        ? { ...editElement, label: e.target.value }
                        : { ...editElement, name: e.target.value },
                    )
                  }
                />
              </div>

              {/* Seats (tables only) */}
              {(isActive ? isTable : true) && (
                <div>
                  <label className="block text-xs font-medium mb-1 text-neutral-700">
                    Number of Seats
                  </label>
                  <input
                    type="number"
                    min={1}
                    className={inputClass}
                    value={
                      isActive && isTable
                        ? (editElement as TableElement).seats
                        : ""
                    }
                    placeholder="e.g. 2, 4, 6"
                    disabled={!isActive || !isTable}
                    onChange={(e) =>
                      isActive &&
                      isTable &&
                      onEditChange({
                        ...editElement,
                        seats: Number(e.target.value),
                      })
                    }
                  />
                </div>
              )}

              {/* Position */}
              <div>
                <label className="block text-xs font-medium mb-2 text-neutral-700">
                  Position
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1">
                      Left (X)
                    </label>
                    <input
                      type="number"
                      className={inputClass}
                      value={isActive ? Math.round(editElement.x) : ""}
                      placeholder="0"
                      disabled={!isActive}
                      onChange={(e) =>
                        isActive &&
                        onEditChange({
                          ...editElement,
                          x: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1">
                      Top (Y)
                    </label>
                    <input
                      type="number"
                      className={inputClass}
                      value={isActive ? Math.round(editElement.y) : ""}
                      placeholder="0"
                      disabled={!isActive}
                      onChange={(e) =>
                        isActive &&
                        onEditChange({
                          ...editElement,
                          y: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Size */}
              <div>
                <label className="block text-xs font-medium mb-2 text-neutral-700">
                  Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1">
                      Width
                    </label>
                    <input
                      type="number"
                      min={24}
                      className={inputClass}
                      value={isActive ? Math.round(editElement.width) : ""}
                      placeholder="80"
                      disabled={!isActive}
                      onChange={(e) =>
                        isActive &&
                        onEditChange({
                          ...editElement,
                          width: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1">
                      Height
                    </label>
                    <input
                      type="number"
                      min={24}
                      className={inputClass}
                      value={isActive ? Math.round(editElement.height) : ""}
                      placeholder="80"
                      disabled={!isActive}
                      onChange={(e) =>
                        isActive &&
                        onEditChange({
                          ...editElement,
                          height: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block text-xs font-medium mb-1 text-neutral-700">
                  Background Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    className={`w-12 h-8 rounded border ${isActive ? "" : "opacity-50"}`}
                    value={isActive ? editElement.color : "#bef264"}
                    disabled={!isActive}
                    onChange={(e) =>
                      isActive &&
                      onEditChange({ ...editElement, color: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className={inputClass}
                    value={isActive ? editElement.color : ""}
                    placeholder="#bef264"
                    disabled={!isActive}
                    onChange={(e) =>
                      isActive &&
                      onEditChange({ ...editElement, color: e.target.value })
                    }
                  />
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Choose a color that matches your restaurant's theme
                </p>
              </div>

              {/* Actions */}
              {isActive && (
                <div className="pt-4 border-t border-neutral-200">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={onEditRemove}
                    className="w-full"
                  >
                    Delete{" "}
                    {isTable
                      ? "Table"
                      : editElement.type === "zone"
                        ? "Zone"
                        : "Barrier"}
                  </Button>
                </div>
              )}

              {/* Empty state */}
              {!isActive && (
                <div className="text-center py-8 text-neutral-400">
                  <p className="text-sm">
                    Select an element to edit its properties
                  </p>
                  <p className="text-xs mt-1">
                    Click on any table, zone, or barrier
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
