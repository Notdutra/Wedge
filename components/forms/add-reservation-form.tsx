"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRestaurantContext } from "@/contexts/restaurant-context";
import { Plus, Calendar } from "lucide-react";

export function AddReservationForm({
  renderTrigger,
  variant = "plus",
}: {
  renderTrigger?: (props: { onClick: () => void }) => React.ReactNode;
  variant?: "plus" | "calendar";
}) {
  const { addReservation } = useRestaurantContext();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    party: "",
    time: "",
    date: "Today",
    phone: "",
    email: "",
    table: "",
    notes: "",
    status: "pending",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReservation({
      ...formData,
      party: Number.parseInt(formData.party),
      status: "pending" as const,
    });
    setFormData({
      name: "",
      party: "",
      time: "",
      date: "Today",
      phone: "",
      email: "",
      table: "",
      notes: "",
      status: "pending",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {renderTrigger ? (
          renderTrigger({ onClick: () => setOpen(true) })
        ) : variant === "calendar" ? (
          <Button
            className="h-16 sm:h-20 flex-col bg-lime-600 hover:bg-lime-700 text-white min-h-[44px] touch-manipulation"
            onClick={() => setOpen(true)}
          >
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2" />
            <span className="text-xs sm:text-sm">New Reservation</span>
          </Button>
        ) : (
          <Button onClick={() => setOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Reservation
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Reservation</DialogTitle>
          <DialogDescription>
            Create a new reservation for your restaurant.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="party" className="text-right">
                Party Size
              </Label>
              <Input
                id="party"
                type="number"
                min="1"
                max="20"
                value={formData.party}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, party: e.target.value }))
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, time: e.target.value }))
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Select
                value={formData.date}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, date: value }))
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Today">Today</SelectItem>
                  <SelectItem value="Tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="This Week">This Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="table" className="text-right">
                Table
              </Label>
              <Select
                value={formData.table}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, table: value }))
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select table" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i + 1} value={`Table ${i + 1}`}>
                      Table {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
                className="col-span-3"
                placeholder="Special requests, allergies, etc."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
              Add Reservation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
