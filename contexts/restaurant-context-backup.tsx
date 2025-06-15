'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

// Storage keys for localStorage
const STORAGE_KEYS = {
  orders: 'wedge_orders',
  reservations: 'wedge_reservations', 
  staff: 'wedge_staff',
  menuItems: 'wedge_menu_items',
  inventory: 'wedge_inventory',
  payments: 'wedge_payments',
}

// Helper functions for localStorage
const saveToStorage = (key: string, data: unknown) => {
  if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
    try {
      globalThis.localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to save to localStorage:', error)
    }
  }
}

const loadFromStorage = (key: string, defaultValue: unknown = []) => {
  if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
    try {
      const stored = globalThis.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : defaultValue
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to load from localStorage:', error)
      return defaultValue
    }
  }
  return defaultValue
}

interface RestaurantContextType {
  // Orders
  orders: any[]
  addOrder: (order: any) => void
  updateOrder: (id: string, updates: any) => void
  deleteOrder: (id: string) => void

  // Reservations
  reservations: any[]
  addReservation: (reservation: any) => void
  updateReservation: (id: number, updates: any) => void
  deleteReservation: (id: number) => void

  // Staff
  staff: any[]
  addStaff: (member: any) => void
  updateStaff: (id: number, updates: any) => void
  deleteStaff: (id: number) => void

  // Menu Items
  menuItems: any[]
  addMenuItem: (item: any) => void
  updateMenuItem: (id: number, updates: any) => void
  deleteMenuItem: (id: number) => void

  // Inventory
  inventory: any[]
  addInventoryItem: (item: any) => void
  updateInventoryItem: (id: number, updates: any) => void
  deleteInventoryItem: (id: number) => void

  // Payments
  payments: any[]
  addPayment: (payment: any) => void
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined)

export function useRestaurantContext() {
  const context = useContext(RestaurantContext)
  if (!context) {
    throw new Error('useRestaurantContext must be used within a RestaurantProvider')
  }
  return context
}

export function RestaurantProvider({ children }: { children: ReactNode }) {
  // Initialize state with data from localStorage
  const [orders, setOrders] = useState<any[]>(() => loadFromStorage(STORAGE_KEYS.orders))
  const [reservations, setReservations] = useState<any[]>(() => loadFromStorage(STORAGE_KEYS.reservations))
  const [staff, setStaff] = useState<any[]>(() => loadFromStorage(STORAGE_KEYS.staff))
  const [menuItems, setMenuItems] = useState<any[]>(() => loadFromStorage(STORAGE_KEYS.menuItems))
  const [inventory, setInventory] = useState<any[]>(() => loadFromStorage(STORAGE_KEYS.inventory))
  const [payments, setPayments] = useState<any[]>(() => loadFromStorage(STORAGE_KEYS.payments))

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.orders, orders)
  }, [orders])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.reservations, reservations)
  }, [reservations])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.staff, staff)
  }, [staff])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.menuItems, menuItems)
  }, [menuItems])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.inventory, inventory)
  }, [inventory])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.payments, payments)
  }, [payments])

  // Orders
  const addOrder = (order: any) => {
    setOrders((prev) => [...prev, { ...order, id: `#${String(prev.length + 1).padStart(3, '0')}` }])
  }

  const updateOrder = (id: string, updates: any) => {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, ...updates } : order)))
  }

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== id))
  }

  // Reservations
  const addReservation = (reservation: any) => {
    setReservations((prev) => [...prev, { ...reservation, id: prev.length + 1 }])
  }

  const updateReservation = (id: number, updates: any) => {
    setReservations((prev) => prev.map((res) => (res.id === id ? { ...res, ...updates } : res)))
  }

  const deleteReservation = (id: number) => {
    setReservations((prev) => prev.filter((res) => res.id !== id))
  }

  // Staff
  const addStaff = (member: any) => {
    setStaff((prev) => [...prev, { ...member, id: prev.length + 1 }])
  }

  const updateStaff = (id: number, updates: any) => {
    setStaff((prev) =>
      prev.map((member) => (member.id === id ? { ...member, ...updates } : member))
    )
  }

  const deleteStaff = (id: number) => {
    setStaff((prev) => prev.filter((member) => member.id !== id))
  }

  // Menu Items
  const addMenuItem = (item: any) => {
    setMenuItems((prev) => [...prev, { ...item, id: prev.length + 1 }])
  }

  const updateMenuItem = (id: number, updates: any) => {
    setMenuItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  const deleteMenuItem = (id: number) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Inventory
  const addInventoryItem = (item: any) => {
    setInventory((prev) => [...prev, { ...item, id: prev.length + 1 }])
  }

  const updateInventoryItem = (id: number, updates: any) => {
    setInventory((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  const deleteInventoryItem = (id: number) => {
    setInventory((prev) => prev.filter((item) => item.id !== id))
  }

  // Payments
  const addPayment = (payment: any) => {
    setPayments((prev) => [
      ...prev,
      { ...payment, id: `TXN${String(prev.length + 1).padStart(3, '0')}` },
    ])
  }

  return (
    <RestaurantContext.Provider
      value={{
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
      }}
    >
      {children}
    </RestaurantContext.Provider>
  )
}
