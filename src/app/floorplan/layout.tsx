import React from "react";
import { FloorplanProvider } from "@/contexts/floorplan-context";

export default function FloorplanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FloorplanProvider>{children}</FloorplanProvider>;
}
