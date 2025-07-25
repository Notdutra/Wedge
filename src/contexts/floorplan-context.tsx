"use client";

import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import {
  TableElement,
  FloorplanElement,
  ZoneElement,
  BarrierElement,
} from "@/types/element-types";

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
  elements: FloorplanElement[];
  setElements: (elements: FloorplanElement[]) => void;
  zones: (ZoneElement | BarrierElement)[];
  setZones: (zones: (ZoneElement | BarrierElement)[]) => void;
  resetFloorplan: () => void;
  isLoading: boolean;
};

const FloorplanContext = createContext<FloorplanContextType | undefined>(
  undefined,
);

const FLOORPLAN_TYPES_KEY = "wedge_floorplan_types";
const FLOORPLAN_ELEMENTS_KEY = "wedge_floorplan_elements";

export function FloorplanProvider({ children }: { children: React.ReactNode }) {
  const [tableTypes, setTableTypesState] = useState<TableType[]>([]);
  const [elements, setElementsState] = useState<FloorplanElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Derived state - compute tables and zones from elements
  const tables = elements.filter((el) => el.type === "table") as TableElement[];
  const zones = elements.filter(
    (el) => el.type === "zone" || el.type === "barrier",
  ) as (ZoneElement | BarrierElement)[];

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof globalThis === "undefined" || !globalThis.localStorage) {
      setIsLoading(false);
      return;
    }

    const types = globalThis.localStorage.getItem(FLOORPLAN_TYPES_KEY);
    const elements = globalThis.localStorage.getItem(FLOORPLAN_ELEMENTS_KEY);

    if (types) setTableTypesState(JSON.parse(types));
    if (elements) {
      const loadedElements = JSON.parse(elements);
      setElementsState(loadedElements);
    }

    setIsLoading(false);
  }, []);

  // Save table types to localStorage on change
  useEffect(() => {
    if (typeof globalThis === "undefined" || !globalThis.localStorage) return;
    globalThis.localStorage.setItem(
      FLOORPLAN_TYPES_KEY,
      JSON.stringify(tableTypes),
    );
  }, [tableTypes]);

  const setTableTypes = (types: TableType[]) => setTableTypesState(types);

  const setTables = (newTables: TableElement[]) => {
    // Update elements array with new tables, keeping existing zones/barriers
    const updatedElements = [
      ...elements.filter((el) => el.type !== "table"),
      ...newTables,
    ];
    setElementsState(updatedElements);

    // Force immediate save to localStorage
    if (typeof globalThis !== "undefined" && globalThis.localStorage) {
      globalThis.localStorage.setItem(
        FLOORPLAN_ELEMENTS_KEY,
        JSON.stringify(updatedElements),
      );
    }
  };

  const setElements = (newElements: FloorplanElement[]) => {
    setElementsState(newElements);

    // Force immediate save to localStorage
    if (typeof globalThis !== "undefined" && globalThis.localStorage) {
      globalThis.localStorage.setItem(
        FLOORPLAN_ELEMENTS_KEY,
        JSON.stringify(newElements),
      );
    }
  };

  const setZones = (newZones: (ZoneElement | BarrierElement)[]) => {
    // Update elements array with new zones/barriers, keeping existing tables
    const updatedElements = [
      ...elements.filter((el) => el.type !== "zone" && el.type !== "barrier"),
      ...newZones,
    ];
    setElementsState(updatedElements);

    // Force immediate save to localStorage
    if (typeof globalThis !== "undefined" && globalThis.localStorage) {
      globalThis.localStorage.setItem(
        FLOORPLAN_ELEMENTS_KEY,
        JSON.stringify(updatedElements),
      );
    }
  };

  const resetFloorplan = () => {
    setTableTypesState([]);
    setElementsState([]);
    if (typeof globalThis !== "undefined" && globalThis.localStorage) {
      globalThis.localStorage.removeItem(FLOORPLAN_TYPES_KEY);
      globalThis.localStorage.removeItem(FLOORPLAN_ELEMENTS_KEY);
      // Clean up old storage keys for backward compatibility
      globalThis.localStorage.removeItem("wedge_floorplan_tables");
    }
  };

  return (
    <FloorplanContext.Provider
      value={{
        tableTypes,
        setTableTypes,
        tables,
        setTables,
        elements,
        setElements,
        zones,
        setZones,
        resetFloorplan,
        isLoading,
      }}
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
