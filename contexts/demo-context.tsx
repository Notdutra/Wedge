'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface DemoContextType {
  isDemoMode: boolean
  toggleDemoMode: () => void
  demoData: {
    orders: any[]
    reservations: any[]
    staff: any[]
    menuItems: any[]
    inventory: any[]
    payments: any[]
  }
}

const DemoContext = createContext<DemoContextType | undefined>(undefined)

export function useDemoContext() {
  const context = useContext(DemoContext)
  if (!context) {
    throw new Error('useDemoContext must be used within a DemoProvider')
  }
  return context
}

const demoOrders = [
  {
    id: '#001',
    table: 'Table 5',
    items: ['2x Classic Burger', '1x Fries', '2x Coke'],
    status: 'preparing',
    time: '5 min ago',
    total: 45.67,
    server: 'Sarah',
  },
  {
    id: '#002',
    table: 'Table 12',
    items: ['1x Grilled Salmon', '1x Caesar Salad', '2x Wine'],
    status: 'ready',
    time: '8 min ago',
    total: 67.89,
    server: 'Mike',
  },
]

const demoReservations = [
  {
    id: 1,
    name: 'Johnson Family',
    party: 4,
    time: '6:00 PM',
    date: 'Today',
    status: 'confirmed',
    phone: '(555) 123-4567',
    email: 'johnson@email.com',
    table: 'Table 12',
    notes: 'Birthday celebration',
  },
  {
    id: 2,
    name: 'Smith',
    party: 2,
    time: '6:30 PM',
    date: 'Today',
    status: 'confirmed',
    phone: '(555) 234-5678',
    email: 'smith@email.com',
    table: 'Table 5',
    notes: 'Anniversary dinner',
  },
]

const demoStaff = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Server',
    status: 'active',
    shift: 'Morning',
    hours: 8.5,
    email: 'sarah@restaurant.com',
    phone: '(555) 123-4567',
    startDate: '2023-01-15',
  },
  {
    id: 2,
    name: 'Mike Chen',
    role: 'Chef',
    status: 'active',
    shift: 'Evening',
    hours: 9.0,
    email: 'mike@restaurant.com',
    phone: '(555) 234-5678',
    startDate: '2022-08-20',
  },
]

const demoMenuItems = [
  {
    id: 1,
    name: 'Classic Burger',
    category: 'Mains',
    price: 15.99,
    description: 'Beef patty with lettuce, tomato, and special sauce',
    available: true,
    popularity: 95,
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    category: 'Mains',
    price: 18.5,
    description: 'Fresh mozzarella, tomato sauce, and basil',
    available: true,
    popularity: 88,
  },
]

const demoInventory = [
  {
    id: 1,
    name: 'Ground Beef',
    category: 'Meat',
    current: 25,
    minimum: 30,
    unit: 'lbs',
    cost: '$4.50/lb',
    status: 'low',
  },
  {
    id: 2,
    name: 'Chicken Breast',
    category: 'Meat',
    current: 45,
    minimum: 20,
    unit: 'lbs',
    cost: '$3.25/lb',
    status: 'good',
  },
]

const demoPayments = [
  {
    id: 'TXN001',
    amount: 45.67,
    method: 'Credit Card',
    status: 'completed',
    time: '2:30 PM',
    table: 'Table 5',
  },
  {
    id: 'TXN002',
    amount: 23.45,
    method: 'Cash',
    status: 'completed',
    time: '2:15 PM',
    table: 'Table 3',
  },
]

export function DemoProvider({ children }: { children: ReactNode }) {
  // Use localStorage to persist demo mode across navigation
  const [isDemoMode, setIsDemoMode] = useState(false)

  // Initialize from localStorage when component mounts
  useEffect(() => {
    const storedDemoMode = localStorage.getItem('isDemoMode')
    if (storedDemoMode !== null) {
      setIsDemoMode(storedDemoMode === 'true')
    }
  }, [])

  const toggleDemoMode = () => {
    const newDemoMode = !isDemoMode
    setIsDemoMode(newDemoMode)
    // Save to localStorage
    localStorage.setItem('isDemoMode', String(newDemoMode))
  }

  const demoData = {
    orders: demoOrders,
    reservations: demoReservations,
    staff: demoStaff,
    menuItems: demoMenuItems,
    inventory: demoInventory,
    payments: demoPayments,
  }

  return (
    <DemoContext.Provider value={{ isDemoMode, toggleDemoMode, demoData }}>
      {children}
    </DemoContext.Provider>
  )
}

export function useMixedData(demoData: any[], realData: any[]) {
  const { isDemoMode } = useDemoContext()

  // Return demo data when in demo mode, or real data otherwise
  return isDemoMode ? demoData : realData.length > 0 ? realData : []
}
