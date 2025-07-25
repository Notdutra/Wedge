// Analytics Demo Data
export interface WeeklySalesData {
  day: string;
  sales: number;
  orders: number;
}

export interface TopMenuItem {
  name: string;
  sales: number;
  revenue: number;
  percentage: number;
}

export interface PeakHour {
  time: string;
  orders: number;
  percentage: number;
}

export interface PerformanceMetric {
  label: string;
  value: string;
  isPositive?: boolean;
}

export interface AnalyticsStats {
  totalRevenue: string;
  totalOrders: string;
  averageOrder: string;
  totalCustomers: string;
  revenueChange?: string;
  ordersChange?: string;
  averageChange?: string;
  customersChange?: string;
}

export const demoWeeklySalesData: WeeklySalesData[] = [
  { day: "Mon", sales: 2400, orders: 45 },
  { day: "Tue", sales: 2800, orders: 52 },
  { day: "Wed", sales: 3200, orders: 58 },
  { day: "Thu", sales: 2900, orders: 48 },
  { day: "Fri", sales: 4100, orders: 72 },
  { day: "Sat", sales: 4800, orders: 85 },
  { day: "Sun", sales: 3600, orders: 63 },
];

export const demoTopMenuItems: TopMenuItem[] = [
  { name: "Classic Burger", sales: 145, revenue: 2175, percentage: 85 },
  { name: "Margherita Pizza", sales: 98, revenue: 1470, percentage: 65 },
  { name: "Caesar Salad", sales: 87, revenue: 1044, percentage: 58 },
  { name: "Grilled Chicken", sales: 76, revenue: 1520, percentage: 50 },
  { name: "Fish & Chips", sales: 65, revenue: 1170, percentage: 43 },
];

export const demoPeakHours: PeakHour[] = [
  { time: "11:00 AM", orders: 12, percentage: 30 },
  { time: "12:00 PM", orders: 28, percentage: 70 },
  { time: "1:00 PM", orders: 35, percentage: 87 },
  { time: "6:00 PM", orders: 42, percentage: 100 },
  { time: "7:00 PM", orders: 38, percentage: 90 },
  { time: "8:00 PM", orders: 31, percentage: 74 },
];

export const demoPerformanceMetrics: PerformanceMetric[] = [
  { label: "Table turnover rate", value: "2.4x/day" },
  { label: "Average wait time", value: "12 minutes" },
  { label: "Order accuracy", value: "97.8%", isPositive: true },
  { label: "Customer satisfaction", value: "4.6/5", isPositive: true },
  { label: "Food cost percentage", value: "28.5%" },
];

export interface CustomerDemographic {
  label: string;
  value: string;
}

export interface RevenueBreakdown {
  category: string;
  amount: string;
  percentage: string;
}

export const demoCustomerDemographics: CustomerDemographic[] = [
  { label: "New customers", value: "23%" },
  { label: "Returning customers", value: "77%" },
  { label: "Average party size", value: "2.8 people" },
  { label: "Dine-in vs Takeout", value: "68% / 32%" },
];

export const demoRevenueBreakdown: RevenueBreakdown[] = [
  { category: "Food sales", amount: "$18,278", percentage: "(77%)" },
  { category: "Beverage sales", amount: "$4,569", percentage: "(19%)" },
  { category: "Dessert sales", amount: "$1,000", percentage: "(4%)" },
];

export const demoAnalyticsStats: AnalyticsStats = {
  totalRevenue: "$23,847",
  totalOrders: "423",
  averageOrder: "$56.38",
  totalCustomers: "1,247",
  revenueChange: "+18.2% from last week",
  ordersChange: "+12.5% from last week",
  averageChange: "+4.8% from last week",
  customersChange: "+8.1% from last week",
};

export const getEmptyWeeklySalesData = (): WeeklySalesData[] => [
  { day: "Mon", sales: 0, orders: 0 },
  { day: "Tue", sales: 0, orders: 0 },
  { day: "Wed", sales: 0, orders: 0 },
  { day: "Thu", sales: 0, orders: 0 },
  { day: "Fri", sales: 0, orders: 0 },
  { day: "Sat", sales: 0, orders: 0 },
  { day: "Sun", sales: 0, orders: 0 },
];

export const getEmptyAnalyticsStats = (): AnalyticsStats => ({
  totalRevenue: "$0",
  totalOrders: "0",
  averageOrder: "$0.00",
  totalCustomers: "0",
});

export const calculateAnalyticsStats = (
  salesData: WeeklySalesData[],
): AnalyticsStats => {
  const totalRevenue = salesData.reduce((sum, point) => sum + point.sales, 0);
  const totalOrders = salesData.reduce((sum, point) => sum + point.orders, 0);
  const averageOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return {
    totalRevenue: `$${totalRevenue.toLocaleString()}`,
    totalOrders: totalOrders.toString(),
    averageOrder: `$${averageOrder.toFixed(2)}`,
    totalCustomers: Math.floor(totalOrders * 2.95).toString(), // Approximate customers
  };
};
