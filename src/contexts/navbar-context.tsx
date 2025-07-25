'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface NavbarSettings {
  orders: boolean
  reservations: boolean
  floorplan: boolean
  menu: boolean
  staff: boolean
  analytics: boolean
  payments: boolean
  inventory: boolean
  settings: boolean
}

interface NavbarContextType {
  navbarSettings: NavbarSettings
  updateNavbarSettings: (settings: Partial<NavbarSettings>) => void
  resetToDefaults: () => void
}

const defaultSettings: NavbarSettings = {
  orders: true,
  reservations: true,
  floorplan: true,
  menu: true,
  staff: true,
  analytics: true,
  payments: true,
  inventory: true,
  settings: true,
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined)

export function useNavbarContext() {
  const context = useContext(NavbarContext)
  if (!context) {
    throw new Error('useNavbarContext must be used within a NavbarProvider')
  }
  return context
}

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [navbarSettings, setNavbarSettings] = useState<NavbarSettings>(defaultSettings)

  const updateNavbarSettings = (settings: Partial<NavbarSettings>) => {
    setNavbarSettings((prev) => ({ ...prev, ...settings }))
  }

  const resetToDefaults = () => {
    setNavbarSettings(defaultSettings)
  }

  return (
    <NavbarContext.Provider value={{ navbarSettings, updateNavbarSettings, resetToDefaults }}>
      {children}
    </NavbarContext.Provider>
  )
}
