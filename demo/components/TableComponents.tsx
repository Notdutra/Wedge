import { Badge } from "@/components/ui/badge";
import { DemoTable, getTableStatusBadgeColor } from "../floorplan-data";
import { TableElement } from "@/types/element-types";

interface TableRenderProps {
  table: DemoTable | TableElement;
  highlightedTableId: number | string | null;
  onMouseEnter: (id: number | string) => void;
  onMouseLeave: () => void;
  isRealTable: (table: DemoTable | TableElement) => table is TableElement;
  getTableStatusColor: (status: DemoTable["status"]) => string;
}

export function TableRender({
  table,
  highlightedTableId,
  onMouseEnter,
  onMouseLeave,
  isRealTable,
  getTableStatusColor,
}: TableRenderProps) {
  const demoTableFill = "#f9fafb"; // Tailwind gray-50

  if (isRealTable(table)) {
    return (
      <div
        key={table.id}
        className={`absolute flex flex-col items-center justify-center border-2 cursor-pointer transition-all hover:scale-105 ${
          highlightedTableId === table.id ? "ring-2 ring-lime-500 z-10" : ""
        }`}
        style={{
          left: table.x,
          top: table.y,
          width: table.width,
          height: table.height,
          background: table.color,
          borderRadius: 8,
          borderColor: "#a3a3a3",
        }}
        onMouseEnter={() => onMouseEnter(table.id)}
        onMouseLeave={onMouseLeave}
        title={table.label}
      >
        <span className="font-bold text-xs text-neutral-900">
          {table.label}
        </span>
        <span className="text-[10px] text-neutral-700">
          {table.seats} seats
        </span>
      </div>
    );
  }

  return (
    <div
      key={table.id}
      className={`absolute flex flex-col items-center justify-center border-2 cursor-pointer transition-all hover:scale-105 ${
        highlightedTableId === table.id ? "ring-2 ring-lime-500 z-10" : ""
      }`}
      style={{
        left: table.x,
        top: table.y,
        width: 48,
        height: 48,
        background: demoTableFill,
        borderRadius: 8,
        borderColor: getTableStatusColor(table.status),
      }}
      onMouseEnter={() => onMouseEnter(table.id)}
      onMouseLeave={onMouseLeave}
      title={table.number}
    >
      <span className="font-bold text-xs text-neutral-900">
        {`Table ${table.number}`}
      </span>
      <span className="text-[10px] text-neutral-700">{table.seats} seats</span>
    </div>
  );
}

interface TableDetailItemProps {
  table: DemoTable | TableElement;
  highlightedTableId: number | string | null;
  onMouseEnter: (id: number | string) => void;
  onMouseLeave: () => void;
  isRealTable: (table: DemoTable | TableElement) => table is TableElement;
}

export function TableDetailItem({
  table,
  highlightedTableId,
  onMouseEnter,
  onMouseLeave,
  isRealTable,
}: TableDetailItemProps) {
  if (isRealTable(table)) {
    return (
      <div
        key={table.id}
        className={`flex items-center justify-between p-3 border border-neutral-200 rounded-lg transition-all ${
          highlightedTableId === table.id
            ? "ring-2 ring-lime-500 bg-lime-50"
            : ""
        }`}
        onMouseEnter={() => onMouseEnter(table.id)}
        onMouseLeave={onMouseLeave}
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
    );
  }

  return (
    <div
      key={table.id}
      className={`flex items-center justify-between p-3 border border-neutral-200 rounded-lg transition-all ${
        highlightedTableId === table.id ? "ring-2 ring-lime-500 bg-lime-50" : ""
      }`}
      onMouseEnter={() => onMouseEnter(table.id)}
      onMouseLeave={onMouseLeave}
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
            <p className="text-xs text-neutral-600">{table.party}</p>
          )}
          {table.time && (
            <p className="text-xs text-neutral-500">{table.time}</p>
          )}
        </div>
      </div>
      <Badge className={getTableStatusBadgeColor(table.status)}>
        {table.status || "available"}
      </Badge>
    </div>
  );
}
