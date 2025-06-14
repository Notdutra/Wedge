"use client";

import React, { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Menu,
  Home,
  Calendar,
  Grid3X3,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  Clock,
  ChefHat,
  Bell,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useNavbarContext } from "@/contexts/navbar-context";
import { DemoToggle } from "@/components/demo-toggle";
import { WedgeLogo } from "@/components/wedge-logo";

const allNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home, key: "dashboard" },
  {
    name: "Orders",
    href: "/orders",
    icon: ShoppingCart,
    key: "orders",
  },
  {
    name: "Reservations",
    href: "/reservations",
    icon: Calendar,
    key: "reservations",
  },
  {
    name: "Floor Plan",
    href: "/floorplan",
    icon: Grid3X3,
    key: "floorplan",
  },
  {
    name: "Menu Management",
    href: "/menu",
    icon: ChefHat,
    key: "menu",
  },
  { name: "Staff", href: "/staff", icon: Users, key: "staff" },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    key: "analytics",
  },
  {
    name: "Payments",
    href: "/payments",
    icon: CreditCard,
    key: "payments",
  },
  {
    name: "Inventory",
    href: "/inventory",
    icon: Clock,
    key: "inventory",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    key: "settings",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const staffNavigation = (settings: any) =>
  allNavigation.filter(
    (item) =>
      ["dashboard", "orders", "reservations", "floorplan", "menu"].includes(
        item.key,
      ) &&
      (item.key === "dashboard" || settings[item.key]),
  );

const roleNavigation = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: (settings: any) =>
    allNavigation.filter(
      (item) => item.key === "dashboard" || settings[item.key],
    ),
  server: staffNavigation,
  bartender: staffNavigation,
  host: staffNavigation,
  kitchen: staffNavigation,
};

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = React.memo(function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [userRole] = useState<keyof typeof roleNavigation>("admin");
  const router = useRouter();
  const pathname = usePathname();
  const { navbarSettings } = useNavbarContext();

  const userNavigation = roleNavigation[userRole](navbarSettings);

  const handleSignout = () => {
    router.push("/");
  };

  const Sidebar = () => (
    <div className="flex h-full flex-col bg-white border-r border-neutral-200">
      <div className="flex h-14 sm:h-16 shrink-0 items-center px-3 sm:px-4 border-b border-neutral-200">
        <WedgeLogo />
      </div>
      <nav className="flex-1 space-y-1 px-2 sm:px-3 py-3 sm:py-4 overflow-y-auto">
        {userNavigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={
                `group flex items-center px-2 sm:px-3 py-3 sm:py-2.5 text-sm font-medium rounded-lg min-h-[44px] touch-manipulation transition-colors ` +
                (isActive
                  ? "bg-lime-100 text-lime-700 font-semibold shadow-sm"
                  : "text-neutral-700 hover:bg-lime-50 hover:text-lime-700")
              }
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon
                className={`mr-2 sm:mr-3 h-5 w-5 flex-shrink-0 ${isActive ? "text-lime-600" : "text-neutral-400 group-hover:text-lime-600"}`}
              />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="h-screen flex bg-neutral-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-40 flex h-14 sm:h-16 shrink-0 items-center gap-x-2 sm:gap-x-4 border-b border-neutral-200 bg-white px-3 sm:px-4 shadow-sm lg:px-6 xl:px-8">
          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden min-h-[44px] min-w-[44px] touch-manipulation"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">Open sidebar</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>

          <div className="flex flex-1 gap-x-2 sm:gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
                <div className="hidden sm:block">
                  <DemoToggle />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-2 sm:gap-x-4 lg:gap-x-6">
              {/* Notifications */}
              <div className="hidden sm:block">
                <Button
                  variant="outline"
                  size="icon"
                  className="relative min-h-[44px] min-w-[44px] touch-manipulation"
                >
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 sm:h-3 sm:w-3 bg-lime-500 rounded-full"></span>
                  <span className="sr-only">View notifications</span>
                </Button>
              </div>

              {/* Profile dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full min-h-[44px] min-w-[44px] touch-manipulation focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none data-[state=open]:bg-lime-100 data-[state=open]:ring-2 data-[state=open]:ring-lime-300"
                  >
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                      <AvatarImage
                        src="/placeholder-user.jpg"
                        alt="User"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <AvatarFallback className="bg-lime-100 text-lime-700">
                        JD
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        John Doe
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        manager@restaurant.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="sm:hidden">
                    <DropdownMenuItem>
                      <Button
                        variant="outline"
                        size="icon"
                        className="relative min-h-[44px] min-w-[44px] touch-manipulation w-full justify-start"
                      >
                        <Bell className="h-4 w-4 mr-2" />
                        <span>Notifications</span>
                        <span className="absolute -top-1 right-2 h-2.5 w-2.5 bg-lime-500 rounded-full"></span>
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <DemoToggle />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </div>
                  <DropdownMenuItem onClick={() => router.push("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-neutral-50">{children}</main>
      </div>
    </div>
  );
});
