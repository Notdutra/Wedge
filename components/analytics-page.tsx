"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, TrendingUp, Users, BarChart3, Clock } from "lucide-react";
import { useDemoContext } from "@/contexts/demo-context";
import {
  demoWeeklySalesData,
  demoAnalyticsStats,
  demoTopMenuItems,
  demoPeakHours,
  demoPerformanceMetrics,
  demoCustomerDemographics,
  demoRevenueBreakdown,
  getEmptyWeeklySalesData,
  getEmptyAnalyticsStats,
} from "@/demo/analytics-data";

export function AnalyticsPage() {
  const { isDemoMode } = useDemoContext();

  const salesData = isDemoMode
    ? demoWeeklySalesData
    : getEmptyWeeklySalesData();
  const stats = isDemoMode ? demoAnalyticsStats : getEmptyAnalyticsStats();

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
              {stats.totalRevenue}
            </div>
            {isDemoMode && (
              <p className="text-xs text-green-600">{stats.revenueChange}</p>
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
              {stats.totalOrders}
            </div>
            {isDemoMode && (
              <p className="text-xs text-green-600">{stats.ordersChange}</p>
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
              {stats.averageOrder}
            </div>
            {isDemoMode && (
              <p className="text-xs text-green-600">{stats.averageChange}</p>
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
              {stats.totalCustomers}
            </div>
            {isDemoMode && (
              <p className="text-xs text-green-600">{stats.customersChange}</p>
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
                {isDemoMode ? (
                  demoPerformanceMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="flex justify-between items-center"
                    >
                      <span className="text-neutral-700">{metric.label}</span>
                      <span
                        className={`font-medium ${metric.isPositive ? "text-green-600" : "text-neutral-900"}`}
                      >
                        {metric.value}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-neutral-500 py-8">
                    No performance data available yet
                  </div>
                )}
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
                {isDemoMode ? (
                  demoTopMenuItems.map((item, index) => (
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
                  ))
                ) : (
                  <div className="text-center text-neutral-500 py-8">
                    No menu performance data available yet
                  </div>
                )}
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
                {isDemoMode ? (
                  demoPeakHours.map((hour) => (
                    <div
                      key={hour.time}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-20 text-neutral-700">
                          {hour.time}
                        </span>
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
                  ))
                ) : (
                  <div className="text-center text-neutral-500 py-8">
                    No peak hours data available yet
                  </div>
                )}
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
                {isDemoMode ? (
                  demoCustomerDemographics.map((demographic) => (
                    <div
                      key={demographic.label}
                      className="flex justify-between items-center"
                    >
                      <span className="text-neutral-700">
                        {demographic.label}
                      </span>
                      <span className="font-medium text-neutral-900">
                        {demographic.value}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-neutral-500 py-8">
                    No customer data available yet
                  </div>
                )}
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
                {isDemoMode ? (
                  <>
                    {demoRevenueBreakdown.map((revenue) => (
                      <div
                        key={revenue.category}
                        className="flex justify-between items-center"
                      >
                        <span className="text-neutral-700">
                          {revenue.category}
                        </span>
                        <span className="font-medium text-neutral-900">
                          {revenue.amount} {revenue.percentage}
                        </span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-neutral-200">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-neutral-900">
                          Total Revenue
                        </span>
                        <span className="font-bold text-neutral-900">
                          {stats.totalRevenue}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-neutral-500 py-8">
                    No revenue breakdown available yet
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
