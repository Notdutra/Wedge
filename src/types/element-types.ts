export type ElementType = "table" | "zone" | "barrier";

export interface TableElement {
  id: number | string;
  type: "table";
  label: string;
  seats: number;
  shape: "square" | "rectangle" | "circle";
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ZoneElement {
  id: number | string;
  type: "zone";
  name: string; // e.g. "Zone"
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BarrierElement {
  id: number | string;
  type: "barrier";
  name: string; // e.g. "Barrier"
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export type FloorplanElement = TableElement | ZoneElement | BarrierElement;
