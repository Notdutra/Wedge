"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useDemoContext, useMixedData } from "@/contexts/demo-context";
import { useRestaurantContext } from "@/contexts/restaurant-context";
import { AddOrderForm } from "./forms/add-order-form";

interface OrderItem {
  id: string;
  table: string;
  items: string[];
  status: string;
  time: string;
  total: number;
  server: string;
}

export function OrdersPage() {
  const { demoData } = useDemoContext();
  const { orders, isLoading } = useRestaurantContext();

  // Use the new hook to get consistent data
  const displayOrders = useMixedData(demoData.orders, orders);

  // Show loading state while data is being loaded
  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        {/* Header skeleton */}
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Order Stats skeleton */}
        <div className="grid gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="border-neutral-200 bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-8" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs and content skeleton */}
        <div className="space-y-6">
          <div className="flex space-x-1">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-24" />
            ))}
          </div>

          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <Skeleton className="w-12 h-12 rounded-lg" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-4 w-2" />
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-2" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-4 w-full mb-2" />
                        <div className="flex items-center space-x-2">
                          <Skeleton className="h-4 w-12" />
                          <Skeleton className="h-6 w-16" />
                        </div>
                      </div>
                    </div>
                    <Skeleton className="h-6 w-20" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Fallback to empty array if no orders exist
  const currentOrders: OrderItem[] =
    displayOrders.length > 0 ? displayOrders : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "ready":
        return "bg-lime-100 text-lime-800 border-lime-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-neutral-100 text-neutral-800 border-neutral-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "preparing":
        return <Clock className="w-3 h-3 mr-1" />;
      case "ready":
        return <AlertCircle className="w-3 h-3 mr-1" />;
      case "completed":
        return <CheckCircle className="w-3 h-3 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
            Orders
          </h1>
          <p className="text-neutral-600">Manage and track restaurant orders</p>
        </div>

        <AddOrderForm />
      </div>

      {/* Order Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Total Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {currentOrders.length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Preparing
            </CardTitle>
            <Clock className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {
                currentOrders.filter((order) => order.status === "preparing")
                  .length
              }
            </div>
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Ready
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {currentOrders.filter((order) => order.status === "ready").length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Completed
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {
                currentOrders.filter((order) => order.status === "completed")
                  .length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        {currentOrders.length > 0 && (
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="preparing">Preparing</TabsTrigger>
            <TabsTrigger value="ready">Ready</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        )}
        <TabsContent value="all">
          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <CardTitle className="text-neutral-900">All Orders</CardTitle>
              <CardDescription>
                Complete list of today&apos;s orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentOrders.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">
                    No orders yet
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    Start by adding your first order or enable demo mode to see
                    sample data.
                  </p>
                  <AddOrderForm />
                </div>
              ) : (
                <div className="space-y-4">
                  {currentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center">
                          <ShoppingCart className="w-6 h-6 text-lime-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-neutral-900">
                              {order.id}
                            </h3>
                            <span className="text-sm text-neutral-600">•</span>
                            <span className="text-sm text-neutral-600">
                              {order.table}
                            </span>
                            <span className="text-sm text-neutral-600">•</span>
                            <span className="text-sm text-neutral-600">
                              Server: {order.server}
                            </span>
                          </div>
                          <div className="mt-1">
                            {order.items.map((item, index) => (
                              <span
                                key={index}
                                className="text-sm text-neutral-600"
                              >
                                {item}
                                {index < order.items.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="font-medium text-neutral-900">
                              ${order.total}
                            </span>
                            <span className="text-xs text-neutral-500">
                              {order.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </Badge>
                        {order.status === "preparing" && (
                          <Button size="sm">Mark Ready</Button>
                        )}
                        {order.status === "ready" && (
                          <Button size="sm">Mark Completed</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        {["preparing", "ready", "completed"].map((status) => (
          <TabsContent key={status} value={status}>
            <Card className="border-neutral-200 bg-white">
              <CardHeader>
                <CardTitle className="text-neutral-900 capitalize">
                  {status} Orders
                </CardTitle>
                <CardDescription>
                  {
                    currentOrders.filter((order) => order.status === status)
                      .length
                  }{" "}
                  orders {status}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentOrders
                    .filter((order) => order.status === status)
                    .map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center">
                            <ShoppingCart className="w-6 h-6 text-lime-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium text-neutral-900">
                                {order.id}
                              </h3>
                              <span className="text-sm text-neutral-600">
                                •
                              </span>
                              <span className="text-sm text-neutral-600">
                                {order.table}
                              </span>
                              <span className="text-sm text-neutral-600">
                                •
                              </span>
                              <span className="text-sm text-neutral-600">
                                Server: {order.server}
                              </span>
                            </div>
                            <div className="mt-1">
                              {order.items.map((item, index) => (
                                <span
                                  key={index}
                                  className="text-sm text-neutral-600"
                                >
                                  {item}
                                  {index < order.items.length - 1 ? ", " : ""}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="font-medium text-neutral-900">
                                ${order.total}
                              </span>
                              <span className="text-xs text-neutral-500">
                                {order.time}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </Badge>
                          {order.status === "preparing" && (
                            <Button size="sm">Mark Ready</Button>
                          )}
                          {order.status === "ready" && (
                            <Button size="sm">Mark Completed</Button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
