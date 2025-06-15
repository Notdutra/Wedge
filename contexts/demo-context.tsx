"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  demoOrders,
  demoReservations,
  demoStaff,
  demoMenuItems,
  demoInventory,
  demoPayments,
  type Order,
  type Reservation,
  type StaffMember,
  type MenuItem,
  type InventoryItem,
  type PaymentTransaction,
} from "@/demo";

interface DemoContextType {
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  demoData: {
    orders: Order[];
    reservations: Reservation[];
    staff: StaffMember[];
    menuItems: MenuItem[];
    inventory: InventoryItem[];
    payments: PaymentTransaction[];
  };
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function useDemoContext() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemoContext must be used within a DemoProvider");
  }
  return context;
}

export function DemoProvider({ children }: { children: ReactNode }) {
  // Use localStorage to persist demo mode across navigation
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Initialize from localStorage when component mounts
  useEffect(() => {
    if (typeof globalThis !== "undefined" && globalThis.localStorage) {
      const storedDemoMode = globalThis.localStorage.getItem("isDemoMode");
      if (storedDemoMode !== null) {
        setIsDemoMode(storedDemoMode === "true");
      }
    }
  }, []);

  const toggleDemoMode = () => {
    const newDemoMode = !isDemoMode;
    setIsDemoMode(newDemoMode);
    // Save to localStorage
    if (typeof globalThis !== "undefined" && globalThis.localStorage) {
      globalThis.localStorage.setItem("isDemoMode", String(newDemoMode));
    }
  };

  const demoData = {
    orders: demoOrders,
    reservations: demoReservations,
    staff: demoStaff,
    menuItems: demoMenuItems,
    inventory: demoInventory,
    payments: demoPayments,
  };

  return (
    <DemoContext.Provider value={{ isDemoMode, toggleDemoMode, demoData }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useMixedData<T>(demoData: T[], realData: T[]): T[] {
  const { isDemoMode } = useDemoContext();

  // Return demo data when in demo mode, or real data otherwise
  return isDemoMode ? demoData : realData.length > 0 ? realData : [];
}
