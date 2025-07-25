// Dashboard Demo Data
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  LucideIcon,
} from "lucide-react";

export interface DashboardStat {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
}

export interface KitchenPerformanceItem {
  name: string;
  time: string;
  progress: number;
}

export interface StaffStatusItem {
  role: string;
  count: string;
}

export const demoDashboardStats: DashboardStat[] = [
  {
    title: "Today's Revenue",
    value: "$2,847.50",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Active Orders",
    value: "12", // This will be overridden by actual order count
    change: "+3",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Customers Served",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Table Turnover",
    value: "2.4x",
    change: "+0.3",
    trend: "up",
    icon: TrendingUp,
  },
];

export const demoKitchenPerformance: KitchenPerformanceItem[] = [
  { name: "Appetizers", time: "8 min avg", progress: 75 },
  { name: "Main Courses", time: "15 min avg", progress: 60 },
  { name: "Desserts", time: "5 min avg", progress: 90 },
];

export const demoStaffStatus: StaffStatusItem[] = [
  { role: "Servers on duty", count: "6 active" },
  { role: "Kitchen staff", count: "4 active" },
  { role: "Bartenders", count: "2 active" },
  { role: "Hosts", count: "1 active" },
];

export const getEmptyDashboardStats = (): DashboardStat[] => [
  {
    title: "Today's Revenue",
    value: "$0.00",
    change: "",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Active Orders",
    value: "0",
    change: "",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Customers Served",
    value: "0",
    change: "",
    trend: "up",
    icon: Users,
  },
  {
    title: "Table Turnover",
    value: "0x",
    change: "",
    trend: "up",
    icon: TrendingUp,
  },
];

export const getEmptyKitchenPerformance = (): KitchenPerformanceItem[] => [];

export const getEmptyStaffStatus = (): StaffStatusItem[] => [];
