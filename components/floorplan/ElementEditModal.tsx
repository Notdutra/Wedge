import { type MouseEvent } from "react";
import {
  TableElement,
  ZoneElement,
  BarrierElement,
  FloorplanElement,
} from "@/types/element-types";

interface ElementEditModalProps {
  open: boolean;
  element: TableElement | ZoneElement | BarrierElement | null;
  onChange: (data: TableElement | ZoneElement | BarrierElement) => void;
  onRemove: () => void;
  onClose: () => void;
}

export const ElementEditModal = ({
  open,
  element,
  onChange,
  onRemove,
  onClose,
}: ElementEditModalProps) => {
  if (!open || !element) return null;

  // Type guards
  const isTable = (el: FloorplanElement): el is TableElement =>
    el.type === "table";
  const isBarrier = (el: FloorplanElement): el is BarrierElement =>
    el.type === "barrier";

  // Handle click outside to close
  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[260px] relative border border-neutral-200">
        <button
          className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-700"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-lg font-bold mb-4">
          Edit{" "}
          {isTable(element) ? "Table" : isBarrier(element) ? "Barrier" : "Zone"}
        </h2>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium mb-1">Name/Label</label>
            <input
              className="w-full border rounded px-2 py-1"
              value={isTable(element) ? element.label : element.name}
              onChange={(e) =>
                onChange(
                  isTable(element)
                    ? { ...element, label: e.target.value }
                    : { ...element, name: e.target.value },
                )
              }
            />
          </div>
          {isTable(element) && (
            <div>
              <label className="block text-xs font-medium mb-1">Seats</label>
              <input
                type="number"
                min={1}
                className="w-full border rounded px-2 py-1"
                value={element.seats}
                onChange={(e) =>
                  onChange({ ...element, seats: Number(e.target.value) })
                }
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-medium mb-1">Color</label>
            <input
              type="color"
              className="w-8 h-8 p-0 border-none bg-transparent"
              value={element.color}
              onChange={(e) => onChange({ ...element, color: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button className="text-red-600 hover:underline" onClick={onRemove}>
            Remove
          </button>
          <button
            className="bg-lime-600 text-white px-4 py-1 rounded hover:bg-lime-700"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
