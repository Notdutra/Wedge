"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// TypeScript interfaces for restaurant data
export interface Order {
  id: string;
  table: string;
  items: string[];
  status: "preparing" | "ready" | "delivered" | "cancelled";
  time: string;
  total: number;
  server: string;
}

export interface Reservation {
  id: number;
  name: string;
  party: number;
  time: string;
  date: string;
  status: "confirmed" | "pending" | "cancelled" | "seated" | "completed";
  phone: string;
  email: string;
  table?: string;
  notes?: string;
}

export interface StaffMember {
  id: number;
  name: string;
  role: string;
  status: "active" | "break" | "off";
  shift: string;
  hours: number;
  email: string;
  phone: string;
  startDate: string;
}

export interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  available: boolean;
  popularity: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  current: number;
  unit: string;
  minimum: number;
  cost: string;
  status: "low" | "good";
}

export interface PaymentTransaction {
  id: string;
  amount: number;
  method: string;
  status: "completed" | "pending" | "failed";
  time: string;
  table: string;
}

// Storage keys for localStorage
const STORAGE_KEYS = {
  orders: "wedge_orders",
  reservations: "wedge_reservations",
  staff: "wedge_staff",
  menuItems: "wedge_menu_items",
  inventory: "wedge_inventory",
  payments: "wedge_payments",
};

// Helper functions for localStorage
const saveToStorage = (key: string, data: unknown) => {
  if (typeof globalThis !== "undefined" && globalThis.localStorage) {
    try {
      globalThis.localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // Silently fail in case of storage issues
    }
  }
};

const loadFromStorage = (key: string, defaultValue: unknown = []) => {
  if (typeof globalThis !== "undefined" && globalThis.localStorage) {
    try {
      const stored = globalThis.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
};

interface RestaurantContextType {
  // Loading state
  isLoading: boolean;

  // Orders
  orders: Order[];
  addOrder: (order: Omit<Order, "id">) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  deleteOrder: (id: string) => void;

  // Reservations
  reservations: Reservation[];
  addReservation: (reservation: Omit<Reservation, "id">) => void;
  updateReservation: (id: number, updates: Partial<Reservation>) => void;
  deleteReservation: (id: number) => void;

  // Staff
  staff: StaffMember[];
  addStaff: (member: Omit<StaffMember, "id">) => void;
  updateStaff: (id: number, updates: Partial<StaffMember>) => void;
  deleteStaff: (id: number) => void;

  // Menu Items
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, "id">) => void;
  updateMenuItem: (id: number, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: number) => void;

  // Inventory
  inventory: InventoryItem[];
  addInventoryItem: (item: Omit<InventoryItem, "id">) => void;
  updateInventoryItem: (id: string, updates: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string) => void;

  // Payments
  payments: PaymentTransaction[];
  addPayment: (payment: Omit<PaymentTransaction, "id">) => void;

  // Data management
  clearAllData: () => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(
  undefined,
);

export function useRestaurantContext() {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error(
      "useRestaurantContext must be used within a RestaurantProvider",
    );
  }
  return context;
}

export function RestaurantProvider({ children }: { children: ReactNode }) {
  // Initialize state with empty arrays to prevent hydration mismatches
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);

  // Load data from localStorage after component mounts
  useEffect(() => {
    setOrders(loadFromStorage(STORAGE_KEYS.orders) as Order[]);
    setReservations(
      loadFromStorage(STORAGE_KEYS.reservations) as Reservation[],
    );
    setStaff(loadFromStorage(STORAGE_KEYS.staff) as StaffMember[]);
    setMenuItems(loadFromStorage(STORAGE_KEYS.menuItems) as MenuItem[]);
    setInventory(loadFromStorage(STORAGE_KEYS.inventory) as InventoryItem[]);
    setPayments(loadFromStorage(STORAGE_KEYS.payments) as PaymentTransaction[]);
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.orders, orders);
  }, [orders]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.reservations, reservations);
  }, [reservations]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.staff, staff);
  }, [staff]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.menuItems, menuItems);
  }, [menuItems]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.inventory, inventory);
  }, [inventory]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.payments, payments);
  }, [payments]);

  // Orders
  const addOrder = (order: Omit<Order, "id">) => {
    setOrders((prev: Order[]) => [
      ...prev,
      {
        ...order,
        id: `#${String(prev.length + 1).padStart(3, "0")}`,
      },
    ]);
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders((prev: Order[]) =>
      prev.map((order: Order) =>
        order.id === id ? { ...order, ...updates } : order,
      ),
    );
  };

  const deleteOrder = (id: string) => {
    setOrders((prev: Order[]) =>
      prev.filter((order: Order) => order.id !== id),
    );
  };

  // Reservations
  const addReservation = (reservation: Omit<Reservation, "id">) => {
    setReservations((prev: Reservation[]) => [
      ...prev,
      { ...reservation, id: prev.length + 1 },
    ]);
  };

  const updateReservation = (id: number, updates: Partial<Reservation>) => {
    setReservations((prev: Reservation[]) =>
      prev.map((res: Reservation) =>
        res.id === id ? { ...res, ...updates } : res,
      ),
    );
  };

  const deleteReservation = (id: number) => {
    setReservations((prev: Reservation[]) =>
      prev.filter((res: Reservation) => res.id !== id),
    );
  };

  // Staff
  const addStaff = (member: Omit<StaffMember, "id">) => {
    setStaff((prev: StaffMember[]) => [
      ...prev,
      { ...member, id: prev.length + 1 },
    ]);
  };

  const updateStaff = (id: number, updates: Partial<StaffMember>) => {
    setStaff((prev: StaffMember[]) =>
      prev.map((member: StaffMember) =>
        member.id === id ? { ...member, ...updates } : member,
      ),
    );
  };

  const deleteStaff = (id: number) => {
    setStaff((prev: StaffMember[]) =>
      prev.filter((member: StaffMember) => member.id !== id),
    );
  };

  // Menu Items
  const addMenuItem = (item: Omit<MenuItem, "id">) => {
    setMenuItems((prev: MenuItem[]) => [
      ...prev,
      { ...item, id: prev.length + 1 },
    ]);
  };

  const updateMenuItem = (id: number, updates: Partial<MenuItem>) => {
    setMenuItems((prev: MenuItem[]) =>
      prev.map((item: MenuItem) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    );
  };

  const deleteMenuItem = (id: number) => {
    setMenuItems((prev: MenuItem[]) =>
      prev.filter((item: MenuItem) => item.id !== id),
    );
  };

  // Inventory
  const addInventoryItem = (item: Omit<InventoryItem, "id">) => {
    setInventory((prev: InventoryItem[]) => [
      ...prev,
      { ...item, id: String(prev.length + 1) },
    ]);
  };

  const updateInventoryItem = (id: string, updates: Partial<InventoryItem>) => {
    setInventory((prev: InventoryItem[]) =>
      prev.map((item: InventoryItem) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    );
  };

  const deleteInventoryItem = (id: string) => {
    setInventory((prev: InventoryItem[]) =>
      prev.filter((item: InventoryItem) => item.id !== id),
    );
  };

  // Payments
  const addPayment = (payment: Omit<PaymentTransaction, "id">) => {
    setPayments((prev: PaymentTransaction[]) => [
      ...prev,
      {
        ...payment,
        id: `TXN${String(prev.length + 1).padStart(3, "0")}`,
      },
    ]);
  };

  // Data management
  const clearAllData = () => {
    setOrders([]);
    setReservations([]);
    setStaff([]);
    setMenuItems([]);
    setInventory([]);
    setPayments([]);
    // Also clear from localStorage
    Object.values(STORAGE_KEYS).forEach((key) => {
      if (typeof globalThis !== "undefined" && globalThis.localStorage) {
        globalThis.localStorage.removeItem(key);
      }
    });
  };

  return (
    <RestaurantContext.Provider
      value={{
        isLoading,
        orders,
        addOrder,
        updateOrder,
        deleteOrder,
        reservations,
        addReservation,
        updateReservation,
        deleteReservation,
        staff,
        addStaff,
        updateStaff,
        deleteStaff,
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        inventory,
        addInventoryItem,
        updateInventoryItem,
        deleteInventoryItem,
        payments,
        addPayment,
        clearAllData,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}
