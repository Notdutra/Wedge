"use client";

import type { ReactNode } from "react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, ShoppingCart } from "lucide-react";
import { useRestaurantContext } from "@/contexts/restaurant-context";
import { useDemoContext, useMixedData } from "@/contexts/demo-context";

export function AddOrderForm({
  renderTrigger,
  variant = "plus",
}: {
  renderTrigger?: (props: { onClick: () => void }) => ReactNode;
  variant?: "plus" | "cart";
}) {
  const { addOrder } = useRestaurantContext();
  const { demoData } = useDemoContext();
  const { menuItems, staff } = useRestaurantContext();
  const [open, setOpen] = useState(false);

  // Use mixed data for menu items and staff
  const currentMenuItems = useMixedData(demoData.menuItems, menuItems);
  const currentStaff = useMixedData(demoData.staff, staff);

  const [formData, setFormData] = useState({
    table: "",
    items: [] as string[],
    server: "",
  });

  // Get available menu items (only those that are available)
  const availableMenuItems = currentMenuItems.filter((item) => item.available);

  // Get active servers
  const activeServers = currentStaff.filter(
    (member) =>
      (member.role === "Server" || member.role === "Manager") &&
      member.status === "active",
  );

  // Calculate total based on selected items
  const calculateTotal = () => {
    return formData.items.reduce((total, itemName) => {
      const menuItem = availableMenuItems.find(
        (item) => item.name === itemName,
      );
      return total + (menuItem?.price || 0);
    }, 0);
  };

  const addMenuItem = (itemName: string) => {
    if (!formData.items.includes(itemName)) {
      setFormData((prev) => ({
        ...prev,
        items: [...prev.items, itemName],
      }));
    }
  };

  const removeMenuItem = (itemName: string) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item !== itemName),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.items.length === 0) {
      alert("Please add at least one menu item to the order.");
      return;
    }

    const total = calculateTotal();
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    addOrder({
      table: formData.table,
      items: formData.items,
      status: "preparing",
      time: timeString,
      total: Number(total.toFixed(2)),
      server: formData.server,
    });

    setFormData({
      table: "",
      items: [],
      server: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {renderTrigger ? (
          renderTrigger({ onClick: () => setOpen(true) })
        ) : variant === "cart" ? (
          <Button
            className="h-16 sm:h-20 flex-col bg-lime-600 hover:bg-lime-700 text-white min-h-[44px] touch-manipulation"
            onClick={() => setOpen(true)}
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2" />
            <span className="text-xs sm:text-sm">New Order</span>
          </Button>
        ) : (
          <Button onClick={() => setOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Order
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Order</DialogTitle>
          <DialogDescription>Create a new order for a table.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="table" className="text-right">
                Table
              </Label>
              <Input
                id="table"
                value={formData.table}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, table: e.target.value }))
                }
                className="col-span-3"
                placeholder="e.g., Table 5"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="server" className="text-right">
                Server
              </Label>
              <Select
                value={formData.server}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, server: value }))
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select server" />
                </SelectTrigger>
                <SelectContent>
                  {activeServers.length > 0 ? (
                    activeServers.map((server) => (
                      <SelectItem key={server.id} value={server.name}>
                        {server.name} ({server.role})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="No Server" disabled>
                      No active servers available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right mt-2">Menu Items</Label>
              <div className="col-span-3 space-y-3">
                <Select onValueChange={addMenuItem}>
                  <SelectTrigger>
                    <SelectValue placeholder="Add menu item" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMenuItems.length > 0 ? (
                      availableMenuItems.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.name}
                          disabled={formData.items.includes(item.name)}
                        >
                          {item.name} - ${item.price.toFixed(2)}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-items" disabled>
                        No menu items available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>

                {formData.items.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Selected Items:
                    </Label>
                    {formData.items.map((itemName) => {
                      const menuItem = availableMenuItems.find(
                        (item) => item.name === itemName,
                      );
                      return (
                        <div
                          key={itemName}
                          className="flex items-center justify-between p-2 border border-neutral-200 rounded-md"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">
                              {itemName}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              ${menuItem?.price.toFixed(2)}
                            </Badge>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeMenuItem(itemName)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {formData.items.length > 0 && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Total</Label>
                <div className="col-span-3">
                  <span className="text-lg font-bold text-neutral-900">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
              Create Order
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
