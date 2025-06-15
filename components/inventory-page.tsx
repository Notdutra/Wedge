"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Package, AlertTriangle, Plus, Filter } from "lucide-react";
import { useDemoContext, useMixedData } from "@/contexts/demo-context";
import { useRestaurantContext } from "@/contexts/restaurant-context";
import {
  demoInventoryStats,
  getEmptyInventoryStats,
  getInventoryStatusColor,
} from "@/demo/inventory-data";

export function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { isDemoMode, demoData } = useDemoContext();
  const { inventory, isLoading } = useRestaurantContext();

  // Use the new hook to get consistent data
  const currentInventory = useMixedData(demoData.inventory, inventory);

  const lowStockItems = currentInventory.filter(
    (item) => item.status === "low",
  );

  const stats = isDemoMode ? demoInventoryStats : getEmptyInventoryStats();

  return (
    <div className="p-6 space-y-6">
      {isLoading ? (
        // Loading skeleton
        <>
          <div className="flex justify-between items-center">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-72" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Stats skeleton */}
          <div className="grid gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="border-neutral-200 bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-12" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Content skeleton */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-24" />
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-10 w-64" />
              </div>
            </div>

            <Card className="border-neutral-200 bg-white">
              <CardHeader>
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
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
                        <div>
                          <Skeleton className="h-5 w-32 mb-1" />
                          <Skeleton className="h-4 w-20 mb-1" />
                          <div className="flex items-center space-x-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-6 w-20" />
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Skeleton className="h-5 w-16 mb-1" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                Inventory
              </h1>
              <p className="text-neutral-600">
                Manage your restaurant&apos;s inventory and stock levels
              </p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-neutral-200 bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">
                  Total Items
                </CardTitle>
                <Package className="h-4 w-4 text-lime-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neutral-900">
                  {currentInventory.length}
                </div>
              </CardContent>
            </Card>
            <Card className="border-neutral-200 bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">
                  Low Stock
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-lime-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neutral-900">
                  {lowStockItems.length}
                </div>
              </CardContent>
            </Card>
            <Card className="border-neutral-200 bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">
                  Categories
                </CardTitle>
                <Filter className="h-4 w-4 text-lime-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neutral-900">
                  {stats.categories}
                </div>
              </CardContent>
            </Card>
            <Card className="border-neutral-200 bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">
                  Total Value
                </CardTitle>
                <Package className="h-4 w-4 text-lime-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neutral-900">
                  {stats.totalValue}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all">All Items</TabsTrigger>
                <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
              </TabsList>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <Input
                    placeholder="Search inventory..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>

            <TabsContent value="all">
              <Card className="border-neutral-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-neutral-900">
                    All Inventory Items
                  </CardTitle>
                  <CardDescription>
                    Complete list of your inventory
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentInventory.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-lime-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-neutral-900">
                              {item.name}
                            </h3>
                            <p className="text-sm text-neutral-600">
                              {item.category} • {item.cost}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium text-neutral-900">
                              {item.current} {item.unit}
                            </p>
                            <p className="text-sm text-neutral-600">
                              Min: {item.minimum}
                            </p>
                          </div>
                          <Badge
                            className={getInventoryStatusColor(item.status)}
                          >
                            {item.status === "low" ? "Low Stock" : "In Stock"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="low-stock">
              <Card className="border-neutral-200 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center text-neutral-900">
                    <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                    Low Stock Items
                  </CardTitle>
                  <CardDescription>
                    Items that need to be restocked
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lowStockItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-neutral-900">
                              {item.name}
                            </h3>
                            <p className="text-sm text-neutral-600">
                              {item.category} • {item.cost}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium text-red-600">
                              {item.current} {item.unit}
                            </p>
                            <p className="text-sm text-neutral-600">
                              Min: {item.minimum}
                            </p>
                          </div>
                          <Button size="sm">Reorder</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories">
              <div className="grid gap-6 md:grid-cols-2">
                {["Meat", "Vegetables", "Dairy", "Pantry"].map((category) => (
                  <Card key={category} className="border-neutral-200 bg-white">
                    <CardHeader>
                      <CardTitle className="text-neutral-900">
                        {category}
                      </CardTitle>
                      <CardDescription>
                        {
                          currentInventory.filter(
                            (item) => item.category === category,
                          ).length
                        }{" "}
                        items
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {currentInventory
                          .filter((item) => item.category === category)
                          .map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between"
                            >
                              <span className="text-neutral-900">
                                {item.name}
                              </span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-neutral-600">
                                  {item.current} {item.unit}
                                </span>
                                <Badge
                                  className={getInventoryStatusColor(
                                    item.status,
                                  )}
                                >
                                  {item.status === "low" ? "Low" : "OK"}
                                </Badge>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
