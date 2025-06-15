"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Store,
  Bell,
  CreditCard,
  Printer,
  Wifi,
  Navigation,
  RotateCcw,
  User,
  Package,
} from "lucide-react";
import { useNavbarContext } from "@/contexts/navbar-context";
import { useRestaurantContext } from "@/contexts/restaurant-context";

export function SettingsPage() {
  const { navbarSettings, updateNavbarSettings, resetToDefaults } =
    useNavbarContext();
  const {
    orders,
    reservations,
    staff,
    menuItems,
    inventory,
    payments,
    clearAllData,
  } = useRestaurantContext();

  const navbarFeatures = [
    {
      key: "orders",
      label: "Orders",
      description: "Order management and tracking",
    },
    {
      key: "reservations",
      label: "Reservations",
      description: "Table reservations and bookings",
    },
    {
      key: "floorplan",
      label: "Floor Plan",
      description: "Visual table layout management",
    },
    {
      key: "menu",
      label: "Menu Management",
      description: "Menu items and pricing",
    },
    {
      key: "staff",
      label: "Staff",
      description: "Employee management and scheduling",
    },
    {
      key: "analytics",
      label: "Analytics",
      description: "Sales reports and insights",
    },
    {
      key: "payments",
      label: "Payments",
      description: "Payment processing and history",
    },
    {
      key: "inventory",
      label: "Inventory",
      description: "Stock management and tracking",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Settings
        </h1>
        <p className="text-neutral-600">
          Manage your restaurant settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
          <TabsTrigger value="navbar">Navigation</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="pos">POS</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-neutral-900">
                <User className="w-5 h-5 mr-2 text-lime-600" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john@restaurant.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="(555) 123-4567" />
              </div>
              <Button className="bg-lime-600 hover:bg-lime-700">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="restaurant" className="space-y-6">
          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-neutral-900">
                <Store className="w-5 h-5 mr-2 text-lime-600" />
                Restaurant Information
              </CardTitle>
              <CardDescription>
                Basic information about your restaurant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="restaurant-name">Restaurant Name</Label>
                  <Input id="restaurant-name" defaultValue="The Golden Fork" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cuisine-type">Cuisine Type</Label>
                  <Select defaultValue="american">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="american">American</SelectItem>
                      <SelectItem value="italian">Italian</SelectItem>
                      <SelectItem value="mexican">Mexican</SelectItem>
                      <SelectItem value="asian">Asian</SelectItem>
                      <SelectItem value="mediterranean">
                        Mediterranean
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  defaultValue="123 Main Street, City, State 12345"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="restaurant-phone">Phone Number</Label>
                  <Input id="restaurant-phone" defaultValue="(555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="restaurant-email">Email</Label>
                  <Input
                    id="restaurant-email"
                    type="email"
                    defaultValue="info@goldenfork.com"
                  />
                </div>
              </div>
              <Button className="bg-lime-600 hover:bg-lime-700">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <CardTitle className="text-neutral-900">
                Operating Hours
              </CardTitle>
              <CardDescription>
                Set your restaurant&apos;s operating schedule
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <div key={day} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Switch defaultChecked={day !== "Sunday"} />
                    <span className="w-20 text-neutral-700">{day}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input className="w-24" defaultValue="9:00 AM" />
                    <span className="text-neutral-500">to</span>
                    <Input className="w-24" defaultValue="10:00 PM" />
                  </div>
                </div>
              ))}
              <Button className="bg-lime-600 hover:bg-lime-700">
                Update Hours
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="navbar" className="space-y-6">
          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-neutral-900">
                <Navigation className="w-5 h-5 mr-2 text-lime-600" />
                Customize Navigation
              </CardTitle>
              <CardDescription>
                Show or hide navigation items based on the features your
                restaurant uses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-lime-50 rounded-lg border border-lime-200">
                <div>
                  <h4 className="font-medium text-lime-900">Dashboard</h4>
                  <p className="text-sm text-lime-700">
                    Main dashboard overview (always visible)
                  </p>
                </div>
                <Badge className="bg-lime-100 text-lime-800 border-lime-200">
                  Required
                </Badge>
              </div>

              <div className="space-y-4">
                {navbarFeatures.map((feature) => (
                  <div
                    key={feature.key}
                    className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-neutral-900">
                        {feature.label}
                      </h4>
                      <p className="text-sm text-neutral-600">
                        {feature.description}
                      </p>
                    </div>
                    <Switch
                      checked={
                        navbarSettings[
                          feature.key as keyof typeof navbarSettings
                        ]
                      }
                      onCheckedChange={(checked) =>
                        updateNavbarSettings({ [feature.key]: checked })
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <div>
                  <h4 className="font-medium text-neutral-900">Settings</h4>
                  <p className="text-sm text-neutral-600">
                    System settings and configuration (always visible)
                  </p>
                </div>
                <Badge className="bg-neutral-100 text-neutral-800 border-neutral-200">
                  Required
                </Badge>
              </div>

              <div className="flex items-center space-x-4 pt-4 border-t border-neutral-200">
                <Button className="bg-lime-600 hover:bg-lime-700">
                  Save Navigation Settings
                </Button>
                <Button
                  variant="outline"
                  onClick={resetToDefaults}
                  className="border-lime-200 text-lime-700 hover:bg-lime-50"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset to Defaults
                </Button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tip</h4>
                <p className="text-sm text-blue-800">
                  Hide features you don&apos;t use to keep your navigation clean
                  and focused. For example, if you don&apos;t take reservations,
                  you can hide the Reservations section. Changes apply
                  immediately to all users with access to those features.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-neutral-900">
                <Package className="w-5 h-5 mr-2 text-lime-600" />
                Data Management
              </CardTitle>
              <CardDescription>
                Manage your restaurant data and storage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">
                    Current Data Storage
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700">Orders:</span>
                      <span className="font-medium ml-2 text-blue-900">
                        {orders.length}
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-700">Reservations:</span>
                      <span className="font-medium ml-2 text-blue-900">
                        {reservations.length}
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-700">Staff:</span>
                      <span className="font-medium ml-2 text-blue-900">
                        {staff.length}
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-700">Menu Items:</span>
                      <span className="font-medium ml-2 text-blue-900">
                        {menuItems.length}
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-700">Inventory:</span>
                      <span className="font-medium ml-2 text-blue-900">
                        {inventory.length}
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-700">Payments:</span>
                      <span className="font-medium ml-2 text-blue-900">
                        {payments.length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-medium text-amber-900 mb-2">
                    ⚠️ Danger Zone
                  </h4>
                  <p className="text-sm text-amber-700 mb-4">
                    This action will permanently delete all your restaurant data
                    including orders, reservations, staff, menu items,
                    inventory, and payments. This cannot be undone.
                  </p>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (
                        globalThis.confirm?.(
                          "Are you sure you want to delete ALL data? This cannot be undone!",
                        )
                      ) {
                        clearAllData();
                        globalThis.alert?.("All data has been cleared!");
                      }
                    }}
                  >
                    Clear All Data
                  </Button>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">
                    ✅ Data Persistence
                  </h4>
                  <p className="text-sm text-green-700">
                    Your data is automatically saved to your browser's local
                    storage. It will persist across page refreshes and browser
                    restarts, but is specific to this browser.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pos" className="space-y-6">
          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <CardTitle className="text-neutral-900">
                POS Configuration
              </CardTitle>
              <CardDescription>
                Configure your point of sale system settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-neutral-900">
                    Auto-print receipts
                  </Label>
                  <p className="text-sm text-neutral-600">
                    Automatically print receipts after payment
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-neutral-900">
                    Kitchen display integration
                  </Label>
                  <p className="text-sm text-neutral-600">
                    Send orders directly to kitchen displays
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-neutral-900">Table service mode</Label>
                  <p className="text-sm text-neutral-600">
                    Enable table numbers and server assignments
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                <Input
                  id="tax-rate"
                  type="number"
                  defaultValue="8.25"
                  className="w-32"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-neutral-900">
                <Bell className="w-5 h-5 mr-2 text-lime-600" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-neutral-900">New orders</Label>
                  <p className="text-sm text-neutral-600">
                    Get notified when new orders come in
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-neutral-900">
                    Low inventory alerts
                  </Label>
                  <p className="text-sm text-neutral-600">
                    Alert when items are running low
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-neutral-900">Staff clock-in/out</Label>
                  <p className="text-sm text-neutral-600">
                    Notifications for staff attendance
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-neutral-900">Daily reports</Label>
                  <p className="text-sm text-neutral-600">
                    Receive daily sales summaries
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-neutral-900">
                <CreditCard className="w-5 h-5 mr-2 text-lime-600" />
                Payment Methods
              </CardTitle>
              <CardDescription>
                Configure accepted payment methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                  <div>
                    <p className="font-medium text-neutral-900">Cash</p>
                    <p className="text-sm text-neutral-600">
                      Traditional cash payments
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                  <div>
                    <p className="font-medium text-neutral-900">Credit Cards</p>
                    <p className="text-sm text-neutral-600">
                      Visa, MasterCard, Amex
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                  <div>
                    <p className="font-medium text-neutral-900">
                      Mobile Payments
                    </p>
                    <p className="text-sm text-neutral-600">
                      Apple Pay, Google Pay
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                  <div>
                    <p className="font-medium text-neutral-900">Gift Cards</p>
                    <p className="text-sm text-neutral-600">
                      Restaurant gift cards
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <CardTitle className="text-neutral-900">
                Third-party Integrations
              </CardTitle>
              <CardDescription>Connect with external services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-lime-100 rounded-lg flex items-center justify-center">
                    <Printer className="w-5 h-5 text-lime-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">
                      Kitchen Printers
                    </p>
                    <p className="text-sm text-neutral-600">
                      Connected: 2 printers
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-lime-100 rounded-lg flex items-center justify-center">
                    <Wifi className="w-5 h-5 text-lime-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">WiFi Network</p>
                    <p className="text-sm text-neutral-600">Restaurant-Guest</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
