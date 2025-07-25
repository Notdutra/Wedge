"use client";

import dynamic from "next/dynamic";

const FloorplanEditPageInner = dynamic(
  () => import("./FloorplanEditPageInner"),
  { ssr: false },
);

export default function FloorplanEditPage() {
  return <FloorplanEditPageInner />;
}
