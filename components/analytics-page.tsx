"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  TrendingUp,
  Users,
  ShoppingCart,
  BarChart3,
  Clock,
} from "lucide-react";
import { useDemoContext } from "@/contexts/demo-context";

export function AnalyticsPage() {
  const { isDemoMode } = useDemoContext();

  const salesData = isDemoMode
    ? [
        { day: "Mon", sales: 2400, orders: 45 },
        { day: "Tue", sales: 2800, orders: 52 },
        { day: "Wed", sales: 3200, orders: 58 },
        { day: "Thu", sales: 2900, orders: 48 },
        { day: "Fri", sales: 4100, orders: 72 },
        { day: "Sat", sales: 4800, orders: 85 },
        { day: "Sun", sales: 3600, orders: 63 },
      ]
    : [
        { day: "Mon", sales: 0, orders: 0 },
        { day: "Tue", sales: 0, orders: 0 },
        { day: "Wed", sales: 0, orders: 0 },
        { day: "Thu", sales: 0, orders: 0 },
        { day: "Fri", sales: 0, orders: 0 },
        { day: "Sat", sales: 0, orders: 0 },
        { day: "Sun", sales: 0, orders: 0 },
      ];

  const topItems = [
    { name: "Classic Burger", sales: 145, revenue: 2175, percentage: 85 },
    { name: "Margherita Pizza", sales: 98, revenue: 1470, percentage: 65 },
    { name: "Caesar Salad", sales: 87, revenue: 1044, percentage: 58 },
    { name: "Grilled Chicken", sales: 76, revenue: 1520, percentage: 50 },
    { name: "Fish & Chips", sales: 65, revenue: 1170, percentage: 43 },
  ];

  const peakHours = [
    { time: "11:00 AM", orders: 12, percentage: 30 },
    { time: "12:00 PM", orders: 28, percentage: 70 },
    { time: "1:00 PM", orders: 35, percentage: 87 },
    { time: "6:00 PM", orders: 42, percentage: 100 },
    { time: "7:00 PM", orders: 38, percentage: 90 },
    { time: "8:00 PM", orders: 31, percentage: 74 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
            Analytics
          </h1>
          <p className="text-neutral-600">
            Insights and performance metrics for your restaurant
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="7days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {isDemoMode ? "$23,847" : "$0"}
            </div>
            {isDemoMode && (
              <p className="text-xs text-green-600">+18.2% from last week</p>
            )}
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Total Orders
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {isDemoMode ? "423" : "0"}
            </div>
            {isDemoMode && (
              <p className="text-xs text-green-600">+12.5% from last week</p>
            )}
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Avg Order Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {isDemoMode ? "$56.38" : "$0.00"}
            </div>
            {isDemoMode && (
              <p className="text-xs text-green-600">+4.8% from last week</p>
            )}
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Customer Count
            </CardTitle>
            <Users className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {isDemoMode ? "1,247" : "0"}
            </div>
            {isDemoMode && (
              <p className="text-xs text-green-600">+8.1% from last week</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sales">Sales Trends</TabsTrigger>
          <TabsTrigger value="menu">Menu Performance</TabsTrigger>
          <TabsTrigger value="hours">Peak Hours</TabsTrigger>
          <TabsTrigger value="customers">Customer Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-neutral-200 bg-white">
              <CardHeader>
                <CardTitle className="text-neutral-900">Weekly Sales</CardTitle>
                <CardDescription>Revenue and order trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesData.map((day) => (
                    <div
                      key={day.day}
                      className="flex items-center justify-between"
                    >
                      <div className="flex flex-1 items-center space-x-3">
                        <span className="w-12 text-neutral-700">{day.day}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-neutral-900">
                          ${day.sales}
                        </p>
                        <p className="text-sm text-neutral-600">
                          {day.orders} orders
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 bg-white">
              <CardHeader>
                <CardTitle className="text-neutral-900">
                  Performance Metrics
                </CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700">Table turnover rate</span>
                  <span className="font-medium text-neutral-900">2.4x/day</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700">Average wait time</span>
                  <span className="font-medium text-neutral-900">
                    12 minutes
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700">Order accuracy</span>
                  <span className="font-medium text-green-600">97.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700">
                    Customer satisfaction
                  </span>
                  <span className="font-medium text-green-600">4.6/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700">Food cost percentage</span>
                  <span className="font-medium text-neutral-900">28.5%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="menu">
          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <CardTitle className="text-neutral-900">
                Top Performing Items
              </CardTitle>
              <CardDescription>
                Best selling menu items this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topItems.map((item, index) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-lime-600">
                          #{index + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-neutral-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-neutral-600">
                          {item.sales} sold • ${item.revenue} revenue
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-24">
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                      <span className="text-sm text-neutral-600 w-12">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hours">
          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-neutral-900">
                <Clock className="w-5 h-5 mr-2 text-lime-600" />
                Peak Hours Analysis
              </CardTitle>
              <CardDescription>Busiest times of the day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {peakHours.map((hour) => (
                  <div
                    key={hour.time}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-20 text-neutral-700">{hour.time}</span>
                      <div className="flex-1 w-48">
                        <div className="w-full bg-neutral-200 rounded-full h-3">
                          <div
                            className="bg-lime-600 h-3 rounded-full"
                            style={{ width: `${hour.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-neutral-900">
                        {hour.orders} orders
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-neutral-200 bg-white">
              <CardHeader>
                <CardTitle className="text-neutral-900">
                  Customer Demographics
                </CardTitle>
                <CardDescription>
                  Customer insights and patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700">New customers</span>
                  <span className="font-medium text-neutral-900">23%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700">Returning customers</span>
                  <span className="font-medium text-neutral-900">77%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700">Average party size</span>
                  <span className="font-medium text-neutral-900">
                    2.8 people
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700">Dine-in vs Takeout</span>
                  <span className="font-medium text-neutral-900">
                    68% / 32%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 bg-white">
              <CardHeader>
                <CardTitle className="text-neutral-900">
                  Revenue Breakdown
                </CardTitle>
                <CardDescription>Revenue sources this week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700">Food sales</span>
                  <span className="font-medium text-neutral-900">
                    $18,278 (77%)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700">Beverage sales</span>
                  <span className="font-medium text-neutral-900">
                    $4,569 (19%)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700">Dessert sales</span>
                  <span className="font-medium text-neutral-900">
                    $1,000 (4%)
                  </span>
                </div>
                <div className="pt-2 border-t border-neutral-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-neutral-900">
                      Total Revenue
                    </span>
                    <span className="font-bold text-neutral-900">$23,847</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
