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
import { Calendar, Clock, Users, Phone, Mail } from "lucide-react";
import { useDemoContext, useMixedData } from "@/contexts/demo-context";
import { useRestaurantContext } from "@/contexts/restaurant-context";
import { AddReservationForm } from "@/components/forms/add-reservation-form";

export function ReservationsPage() {
  const { demoData } = useDemoContext();
  const { reservations } = useRestaurantContext();

  // Use the new hook to get consistent data
  const currentReservations = useMixedData(demoData.reservations, reservations);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "seated":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-neutral-100 text-neutral-800 border-neutral-200";
    }
  };

  const todayReservations = currentReservations.filter(
    (r) => r.date === "Today",
  );
  const upcomingReservations = currentReservations.filter(
    (r) => r.date !== "Today",
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
            Reservations
          </h1>
          <p className="text-neutral-600">
            Manage restaurant reservations and bookings
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <AddReservationForm />
        </div>
      </div>

      {/* Reservation Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Today&apos;s Reservations
            </CardTitle>
            <Calendar className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {todayReservations.length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Total Guests
            </CardTitle>
            <Users className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {todayReservations.reduce((sum, r) => sum + r.party, 0)}
            </div>
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Confirmed
            </CardTitle>
            <Calendar className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {
                currentReservations.filter((r) => r.status === "confirmed")
                  .length
              }
            </div>
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Pending
            </CardTitle>
            <Clock className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {currentReservations.filter((r) => r.status === "pending").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="today" className="space-y-6">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="all">All Reservations</TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <CardTitle className="text-neutral-900">
                Today&apos;s Reservations
              </CardTitle>
              <CardDescription>
                Reservations scheduled for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentReservations.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">
                    No reservations yet
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    Start by adding your first reservation or enable demo mode
                    to see sample data.
                  </p>
                  <AddReservationForm />
                </div>
              ) : (
                <div className="space-y-4">
                  {todayReservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-lime-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-neutral-900">
                              {reservation.name}
                            </h3>
                            <span className="text-sm text-neutral-600">•</span>
                            <span className="text-sm text-neutral-600">
                              {reservation.party} guests
                            </span>
                            <span className="text-sm text-neutral-600">•</span>
                            <span className="text-sm text-neutral-600">
                              {reservation.table}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4 text-neutral-400" />
                              <span className="text-sm text-neutral-600">
                                {reservation.time}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="w-4 h-4 text-neutral-400" />
                              <span className="text-sm text-neutral-600">
                                {reservation.phone}
                              </span>
                            </div>
                          </div>
                          {reservation.notes && (
                            <p className="text-sm text-neutral-500 mt-1">
                              Note: {reservation.notes}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(reservation.status)}>
                          {reservation.status}
                        </Badge>
                        {reservation.status === "confirmed" && (
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Seat
                          </Button>
                        )}
                        {reservation.status === "pending" && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Confirm
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <CardTitle className="text-neutral-900">
                Upcoming Reservations
              </CardTitle>
              <CardDescription>Future reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-lime-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-neutral-900">
                            {reservation.name}
                          </h3>
                          <span className="text-sm text-neutral-600">•</span>
                          <span className="text-sm text-neutral-600">
                            {reservation.party} guests
                          </span>
                          <span className="text-sm text-neutral-600">•</span>
                          <span className="text-sm text-neutral-600">
                            {reservation.table}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4 text-neutral-400" />
                            <span className="text-sm text-neutral-600">
                              {reservation.date}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-neutral-400" />
                            <span className="text-sm text-neutral-600">
                              {reservation.time}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Mail className="w-4 h-4 text-neutral-400" />
                            <span className="text-sm text-neutral-600">
                              {reservation.email}
                            </span>
                          </div>
                        </div>
                        {reservation.notes && (
                          <p className="text-sm text-neutral-500 mt-1">
                            Note: {reservation.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(reservation.status)}>
                        {reservation.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <CardTitle className="text-neutral-900">
                All Reservations
              </CardTitle>
              <CardDescription>Complete list of reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-lime-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-neutral-900">
                            {reservation.name}
                          </h3>
                          <span className="text-sm text-neutral-600">•</span>
                          <span className="text-sm text-neutral-600">
                            {reservation.party} guests
                          </span>
                          <span className="text-sm text-neutral-600">•</span>
                          <span className="text-sm text-neutral-600">
                            {reservation.table}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4 text-neutral-400" />
                            <span className="text-sm text-neutral-600">
                              {reservation.date}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-neutral-400" />
                            <span className="text-sm text-neutral-600">
                              {reservation.time}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4 text-neutral-400" />
                            <span className="text-sm text-neutral-600">
                              {reservation.phone}
                            </span>
                          </div>
                        </div>
                        {reservation.notes && (
                          <p className="text-sm text-neutral-500 mt-1">
                            Note: {reservation.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(reservation.status)}>
                        {reservation.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
