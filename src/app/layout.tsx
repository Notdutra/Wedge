import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/contexts/demo-context";
import { RestaurantProvider } from "@/contexts/restaurant-context";
import { NavbarProvider } from "@/contexts/navbar-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wedge - Restaurant POS System",
  description: "Complete Restaurant POS & Management System",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/logo.png" />
      </head>
      <body className={inter.className}>
        <NavbarProvider>
          <DemoProvider>
            <RestaurantProvider>{children}</RestaurantProvider>
          </DemoProvider>
        </NavbarProvider>
      </body>
    </html>
  );
}
