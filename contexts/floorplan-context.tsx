"use client";

import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { TableElement } from "@/types/element-types";

// TableType is still used for palette/types, but TableElement is used for layout
export type TableType = {
  id: number;
  label: string;
  seats: number;
  shape: "square" | "rectangle" | "circle";
  color: string;
  count: number;
};

export type FloorplanContextType = {
  tableTypes: TableType[];
  setTableTypes: (types: TableType[]) => void;
  tables: TableElement[];
  setTables: (tables: TableElement[]) => void;
  resetFloorplan: () => void;
};

const FloorplanContext = createContext<FloorplanContextType | undefined>(
  undefined,
);

const FLOORPLAN_TABLES_KEY = "wedge_floorplan_tables";
const FLOORPLAN_TYPES_KEY = "wedge_floorplan_types";

export function FloorplanProvider({ children }: { children: React.ReactNode }) {
  const [tableTypes, setTableTypesState] = useState<TableType[]>([]);
  const [tables, setTablesState] = useState<TableElement[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof globalThis === "undefined" || !globalThis.localStorage) return;
    const types = globalThis.localStorage.getItem(FLOORPLAN_TYPES_KEY);
    const tables = globalThis.localStorage.getItem(FLOORPLAN_TABLES_KEY);
    if (types) setTableTypesState(JSON.parse(types));
    if (tables) setTablesState(JSON.parse(tables));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (typeof globalThis === "undefined" || !globalThis.localStorage) return;
    globalThis.localStorage.setItem(
      FLOORPLAN_TYPES_KEY,
      JSON.stringify(tableTypes),
    );
  }, [tableTypes]);
  useEffect(() => {
    if (typeof globalThis === "undefined" || !globalThis.localStorage) return;
    globalThis.localStorage.setItem(
      FLOORPLAN_TABLES_KEY,
      JSON.stringify(tables),
    );
  }, [tables]);

  const setTableTypes = (types: TableType[]) => setTableTypesState(types);
  const setTables = (tables: TableElement[]) => setTablesState(tables);
  const resetFloorplan = () => {
    setTableTypesState([]);
    setTablesState([]);
    if (typeof globalThis !== "undefined" && globalThis.localStorage) {
      globalThis.localStorage.removeItem(FLOORPLAN_TYPES_KEY);
      globalThis.localStorage.removeItem(FLOORPLAN_TABLES_KEY);
    }
  };

  return (
    <FloorplanContext.Provider
      value={{ tableTypes, setTableTypes, tables, setTables, resetFloorplan }}
    >
      {children}
    </FloorplanContext.Provider>
  );
}

export function useFloorplan() {
  const ctx = useContext(FloorplanContext);
  if (!ctx)
    throw new Error("useFloorplan must be used within FloorplanProvider");
  return ctx;
}
