"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ShoppingCart,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { useDemoContext, useMixedData } from "@/contexts/demo-context";
import { useRestaurantContext } from "@/contexts/restaurant-context";
import { AddOrderForm } from "./forms/add-order-form";
import { AddReservationForm } from "@/components/forms/add-reservation-form";
import {
  demoDashboardStats,
  demoKitchenPerformance,
  demoStaffStatus,
  getEmptyDashboardStats,
  getEmptyKitchenPerformance,
  getEmptyStaffStatus,
} from "@/demo/dashboard-data";

export function DashboardOverview() {
  const { isDemoMode, demoData } = useDemoContext();
  const { orders, reservations, staff, isLoading } = useRestaurantContext();

  // Use the new hooks to get consistent data
  const currentOrders = useMixedData(demoData.orders, orders);
  const currentReservations = useMixedData(demoData.reservations, reservations);
  const currentStaff = useMixedData(demoData.staff, staff);

  const stats = isDemoMode ? demoDashboardStats : getEmptyDashboardStats();
  // Update active orders count with actual data
  stats[1].value = currentOrders.length.toString();

  const recentOrders = currentOrders.slice(0, 4);
  const todayReservations = currentReservations
    .filter((r) => r.date === "Today")
    .slice(0, 4);

  // Kitchen performance data - only show if demo mode is on
  const kitchenPerformance = isDemoMode
    ? demoKitchenPerformance
    : getEmptyKitchenPerformance();

  // Staff status - only show if demo mode is on or if there's actual staff
  const staffStatus = isDemoMode
    ? demoStaffStatus
    : currentStaff.length > 0
      ? [
          {
            role: "Servers on duty",
            count: `${currentStaff.filter((s) => s.role === "Server" && s.status === "active").length} active`,
          },
          {
            role: "Kitchen staff",
            count: `${currentStaff.filter((s) => s.role === "Chef" && s.status === "active").length} active`,
          },
          {
            role: "Bartenders",
            count: `${currentStaff.filter((s) => s.role === "Bartender" && s.status === "active").length} active`,
          },
          {
            role: "Hosts",
            count: `${currentStaff.filter((s) => s.role === "Host" && s.status === "active").length} active`,
          },
        ]
      : getEmptyStaffStatus();

  if (isLoading) {
    return (
      <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Stats skeleton */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="border-neutral-200 bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-7 w-12 mb-1" />
                <Skeleton className="h-3 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content sections skeleton */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-neutral-200 bg-white">
            <CardHeader>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between items-center py-2">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="border-neutral-200 bg-white">
              <CardHeader>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-6 w-12" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom sections skeleton */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-2 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-12" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 mt-1">
          Welcome back! Here&apos;s what&apos;s happening at your restaurant
          today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-neutral-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-neutral-600 leading-tight">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-3 w-3 sm:h-4 sm:w-4 text-lime-600 flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold text-neutral-900 leading-tight">
                {stat.value}
              </div>
              {stat.change && (
                <p className="text-xs text-neutral-500 mt-1">
                  <span
                    className={
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }
                  >
                    {stat.change}
                  </span>{" "}
                  from yesterday
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 border-neutral-200 bg-white">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl text-neutral-900">
              Recent Orders
            </CardTitle>
            <CardDescription className="text-sm">
              Latest orders from your restaurant
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-neutral-900 mb-2">
                  No orders yet
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 mb-4">
                  Orders will appear here once you start taking them.
                </p>
                <AddOrderForm />
              </div>
            ) : (
              <>
                <div className="space-y-3 sm:space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-neutral-200 rounded-lg bg-neutral-50 space-y-2 sm:space-y-0"
                    >
                      <div className="flex items-start sm:items-center space-x-3 min-w-0 flex-1">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-neutral-900 text-sm sm:text-base">
                            {order.id} - {order.table}
                          </p>
                          <p className="text-xs sm:text-sm text-neutral-600 truncate">
                            {order.items.join(", ")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-3 flex-shrink-0">
                        <Badge
                          variant={"default"}
                          className={`text-xs ${
                            order.status === "ready"
                              ? "bg-lime-100 text-lime-800 border-lime-200"
                              : order.status === "delivered"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-yellow-100 text-yellow-800 border-yellow-200"
                          }`}
                        >
                          {order.status === "preparing" && (
                            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                          )}
                          {order.status === "ready" && (
                            <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                          )}
                          {order.status === "delivered" && (
                            <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                          )}
                          {order.status}
                        </Badge>
                        <span className="text-xs text-neutral-500 whitespace-nowrap">
                          {order.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full mt-4 bg-lime-600 hover:bg-lime-700 text-white min-h-[44px] touch-manipulation"
                  variant="default"
                >
                  View All Orders
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Today's Reservations */}
        <Card className="border-neutral-200 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center text-lg sm:text-xl text-neutral-900">
              <Calendar className="w-4 h-4 mr-2 text-lime-600 flex-shrink-0" />
              <span className="truncate">Today&apos;s Reservations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todayReservations.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-neutral-900 mb-2">
                  No reservations
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 mb-4">
                  Today&apos;s reservations will appear here.
                </p>
                <AddReservationForm />
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {todayReservations.map((reservation, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 sm:p-3 border border-neutral-200 rounded bg-neutral-50"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-neutral-900 text-sm sm:text-base">
                          {reservation.time}
                        </p>
                        <p className="text-xs sm:text-sm text-neutral-600 truncate">
                          {reservation.name} ({reservation.party})
                        </p>
                      </div>
                      <Badge
                        variant={
                          reservation.status === "confirmed"
                            ? "default"
                            : "outline"
                        }
                        className={`text-xs flex-shrink-0 ${
                          reservation.status === "confirmed"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-yellow-100 text-yellow-800 border-yellow-200"
                        }`}
                      >
                        {reservation.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full mt-4 bg-lime-600 hover:bg-lime-700 text-white min-h-[44px] touch-manipulation"
                  variant="default"
                >
                  Manage Reservations
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics - Only show if there's data */}
      {(kitchenPerformance.length > 0 || staffStatus.length > 0) && (
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          {/* Kitchen Performance */}
          {kitchenPerformance.length > 0 && (
            <Card className="border-neutral-200 bg-white">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-neutral-900">
                  Kitchen Performance
                </CardTitle>
                <CardDescription className="text-sm">
                  Average preparation times
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {kitchenPerformance.map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-neutral-700 truncate">
                        {item.name}
                      </span>
                      <span className="text-neutral-600 flex-shrink-0 ml-2">
                        {item.time}
                      </span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Staff Status */}
          {staffStatus.length > 0 && (
            <Card className="border-neutral-200 bg-white">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-neutral-900">
                  Staff Status
                </CardTitle>
                <CardDescription className="text-sm">
                  Current shift overview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {staffStatus.map((item) => (
                    <div
                      key={item.role}
                      className="flex justify-between items-center"
                    >
                      <span className="text-neutral-700 text-sm truncate flex-1">
                        {item.role}
                      </span>
                      <Badge className="bg-green-100 text-green-800 border-green-200 text-xs flex-shrink-0 ml-2">
                        {item.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
