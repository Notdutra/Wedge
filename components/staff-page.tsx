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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  Search,
  Calendar,
  Clock,
  CheckCircle as UserCheck,
} from "lucide-react";
import { useDemoContext, useMixedData } from "@/contexts/demo-context";
import { useRestaurantContext } from "@/contexts/restaurant-context";
import { AddStaffForm } from "@/components/forms/add-staff-form";
import {
  demoStaffShifts,
  getEmptyStaffShifts,
  getStaffStatusColor,
  getRoleColor,
} from "@/demo/staff-data";

export function StaffPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { isDemoMode, demoData } = useDemoContext();
  const { staff } = useRestaurantContext();

  // Use the new hook to get consistent data
  const currentStaff = useMixedData(demoData.staff, staff);

  const shifts = isDemoMode ? demoStaffShifts : getEmptyStaffShifts();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
            Staff Management
          </h1>
          <p className="text-neutral-600">
            Manage your restaurant staff and schedules
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <AddStaffForm />
        </div>
      </div>

      {/* Staff Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Total Staff
            </CardTitle>
            <Users className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {currentStaff?.length || 0}
            </div>
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Currently Active
            </CardTitle>
            <UserCheck className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {currentStaff?.filter((s) => s.status === "active").length || 0}
            </div>
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Total Hours Today
            </CardTitle>
            <Clock className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {currentStaff?.reduce((total, s) => total + s.hours, 0) || 0}
            </div>
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              On Break
            </CardTitle>
            <Clock className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {currentStaff?.filter((s) => s.status === "break").length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="staff" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="staff">All Staff</TabsTrigger>
            <TabsTrigger value="shifts">Shifts</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <Input
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>

        <TabsContent value="staff">
          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <CardTitle className="text-neutral-900">Staff Members</CardTitle>
              <CardDescription>Manage your restaurant team</CardDescription>
            </CardHeader>
            <CardContent>
              {currentStaff?.length === 0 && !isDemoMode ? (
                <div className="text-center text-neutral-500">
                  No staff members added yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {currentStaff?.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-lime-100 text-lime-700">
                            {member.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-neutral-900">
                            {member.name}
                          </h3>
                          <p className="text-sm text-neutral-600">
                            {member.email} • {member.phone}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge className={getRoleColor(member.role)}>
                            {member.role}
                          </Badge>
                          <p className="text-sm text-neutral-600 mt-1">
                            {member.hours}h today
                          </p>
                        </div>
                        <Badge className={getStaffStatusColor(member.status)}>
                          {member.status === "active"
                            ? "Active"
                            : member.status === "break"
                              ? "On Break"
                              : "Off Duty"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shifts">
          <div className="grid gap-6 md:grid-cols-3">
            {shifts.map((shift) => (
              <Card key={shift.name} className="border-neutral-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-neutral-900">
                    {shift.name}
                  </CardTitle>
                  <CardDescription>{shift.time}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-700">Staff Count</span>
                      <span className="font-medium text-neutral-900">
                        {shift.staff}/{shift.capacity}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div
                        className="bg-lime-600 h-2 rounded-full"
                        style={{
                          width: `${(shift.staff / shift.capacity) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-lime-200 text-lime-700 hover:bg-lime-50"
                    >
                      Manage Shift
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-neutral-900">
                <Calendar className="w-5 h-5 mr-2 text-lime-600" />
                Weekly Schedule
              </CardTitle>
              <CardDescription>Staff schedule for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-8 gap-2 text-sm font-medium text-neutral-600">
                  <div>Staff</div>
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                  <div>Sun</div>
                </div>
                {currentStaff?.map((member) => (
                  <div
                    key={member.id}
                    className="grid grid-cols-8 gap-2 items-center py-2 border-b border-neutral-100"
                  >
                    <div className="font-medium text-neutral-900">
                      {member.name}
                    </div>
                    <div className="text-sm text-neutral-600">9-5</div>
                    <div className="text-sm text-neutral-600">9-5</div>
                    <div className="text-sm text-neutral-600">9-5</div>
                    <div className="text-sm text-neutral-600">9-5</div>
                    <div className="text-sm text-neutral-600">9-5</div>
                    <div className="text-sm text-neutral-600">Off</div>
                    <div className="text-sm text-neutral-600">Off</div>
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
