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
import { ChefHat, Search, Edit, Trash2, DollarSign } from "lucide-react";
import { useDemoContext, useMixedData } from "@/contexts/demo-context";
import { useRestaurantContext } from "@/contexts/restaurant-context";
import { AddMenuItemForm } from "@/components/forms/add-menu-item-form";

export function MenuPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { isDemoMode, demoData } = useDemoContext();
  const { menuItems, isLoading } = useRestaurantContext();

  // Use the new hook to get consistent data
  const currentMenuItems = useMixedData(demoData.menuItems, menuItems);

  // Show loading state while data is being loaded
  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        {/* Header skeleton */}
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

        {/* Tabs skeleton */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-16" />
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-16" />
            </div>
          </div>

          {/* Menu items skeleton */}
          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <Skeleton className="h-6 w-32 mb-2" />
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
                      <Skeleton className="w-16 h-16 rounded-lg" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Skeleton className="h-5 w-32" />
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-20" />
                        </div>
                        <Skeleton className="h-4 w-full mb-2" />
                        <div className="flex items-center space-x-4">
                          <Skeleton className="h-6 w-12" />
                          <div className="flex items-center space-x-1">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-1.5 w-16" />
                            <Skeleton className="h-3 w-8" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const categories = ["All", "Mains", "Salads", "Desserts", "Beverages"];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
            Menu Management
          </h1>
          <p className="text-neutral-600">
            Manage your restaurant&apos;s menu items and pricing
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <AddMenuItemForm />
        </div>
      </div>

      {/* Menu Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Total Items
            </CardTitle>
            <ChefHat className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {currentMenuItems.length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Available
            </CardTitle>
            <ChefHat className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {currentMenuItems.filter((item) => item.available).length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Unavailable
            </CardTitle>
            <ChefHat className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {currentMenuItems.filter((item) => !item.available).length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Avg Price
            </CardTitle>
            <DollarSign className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              $
              {currentMenuItems.length > 0
                ? (
                    currentMenuItems.reduce(
                      (sum, item) => sum + item.price,
                      0,
                    ) / currentMenuItems.length
                  ).toFixed(2)
                : "0.00"}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category.toLowerCase()}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <Input
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-neutral-200 text-neutral-700 hover:bg-neutral-50"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          </div>
        </div>

        <TabsContent value="all">
          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <CardTitle className="text-neutral-900">All Menu Items</CardTitle>
              <CardDescription>
                Complete menu with pricing and availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentMenuItems.length === 0 && !isDemoMode ? (
                <div className="text-center py-12">
                  <ChefHat className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">
                    No menu items yet
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    Start by adding your first menu item or enable demo mode to
                    see sample data.
                  </p>
                  <AddMenuItemForm />
                </div>
              ) : (
                <div className="space-y-4">
                  {currentMenuItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-lime-100 rounded-lg flex items-center justify-center">
                          <ChefHat className="w-8 h-8 text-lime-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-neutral-900">
                              {item.name}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                            {!item.available && (
                              <Badge
                                variant="outline"
                                className="text-xs bg-red-100 text-red-800 border-red-200"
                              >
                                Unavailable
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-neutral-600 mt-1">
                            {item.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-lg font-bold text-neutral-900">
                              ${item.price}
                            </span>
                            <div className="flex items-center space-x-1">
                              <span className="text-xs text-neutral-600">
                                Popularity:
                              </span>
                              <div className="w-16 bg-neutral-200 rounded-full h-1.5">
                                <div
                                  className="bg-green-600 h-1.5 rounded-full"
                                  style={{ width: `${item.popularity}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-neutral-600">
                                {item.popularity}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-lime-200 text-lime-700 hover:bg-lime-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {categories.slice(1).map((category) => (
          <TabsContent key={category} value={category.toLowerCase()}>
            <Card className="border-neutral-200 bg-white">
              <CardHeader>
                <CardTitle className="text-neutral-900">{category}</CardTitle>
                <CardDescription>
                  {
                    currentMenuItems.filter(
                      (item) => item.category === category,
                    ).length
                  }{" "}
                  items in this category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentMenuItems
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-lime-100 rounded-lg flex items-center justify-center">
                            <ChefHat className="w-8 h-8 text-lime-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium text-neutral-900">
                                {item.name}
                              </h3>
                              {!item.available && (
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-red-100 text-red-800 border-red-200"
                                >
                                  Unavailable
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-neutral-600 mt-1">
                              {item.description}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-lg font-bold text-neutral-900">
                                ${item.price}
                              </span>
                              <div className="flex items-center space-x-1">
                                <span className="text-xs text-neutral-600">
                                  Popularity:
                                </span>
                                <div className="w-16 bg-neutral-200 rounded-full h-1.5">
                                  <div
                                    className="bg-lime-600 h-1.5 rounded-full"
                                    style={{ width: `${item.popularity}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-neutral-600">
                                  {item.popularity}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-lime-200 text-lime-700 hover:bg-lime-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-200 text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
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
