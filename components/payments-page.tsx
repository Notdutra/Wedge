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
import {
  DollarSign,
  CreditCard,
  CheckCircle,
  AlertCircle,
  CircleDollarSign,
  Wallet,
  Download,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { useDemoContext, useMixedData } from "@/contexts/demo-context";
import { useRestaurantContext } from "@/contexts/restaurant-context";

export function PaymentsPage() {
  const { isDemoMode, demoData } = useDemoContext();
  const { payments } = useRestaurantContext();

  // Use the new hook to get consistent data
  const currentPayments = useMixedData(demoData.payments, payments);

  const paymentMethods = isDemoMode
    ? [
        {
          name: "Credit Cards",
          amount: 1847.5,
          percentage: 65,
          transactions: 45,
        },
        { name: "Cash", amount: 623.25, percentage: 22, transactions: 18 },
        {
          name: "Mobile Pay",
          amount: 376.75,
          percentage: 13,
          transactions: 12,
        },
      ]
    : [
        { name: "Credit Cards", amount: 0, percentage: 0, transactions: 0 },
        { name: "Cash", amount: 0, percentage: 0, transactions: 0 },
        { name: "Mobile Pay", amount: 0, percentage: 0, transactions: 0 },
      ];

  const transactions = [
    {
      id: "TXN001",
      amount: 45.67,
      method: "Credit Card",
      status: "completed",
      time: "2:30 PM",
      table: "Table 5",
    },
    {
      id: "TXN002",
      amount: 23.45,
      method: "Cash",
      status: "completed",
      time: "2:15 PM",
      table: "Table 3",
    },
    {
      id: "TXN003",
      amount: 67.89,
      method: "Mobile Pay",
      status: "completed",
      time: "1:45 PM",
      table: "Table 8",
    },
    {
      id: "TXN004",
      amount: 34.56,
      method: "Credit Card",
      status: "pending",
      time: "1:30 PM",
      table: "Table 12",
    },
    {
      id: "TXN005",
      amount: 89.12,
      method: "Credit Card",
      status: "completed",
      time: "1:15 PM",
      table: "Table 2",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-neutral-100 text-neutral-800 border-neutral-200";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
            Payments
          </h1>
          <p className="text-neutral-600">
            Track transactions and payment methods
          </p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Payment Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Today&apos;s Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">$2,847.50</div>
            <p className="text-xs text-green-600">+12.5% from yesterday</p>
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Transactions
            </CardTitle>
            <CreditCard className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">75</div>
            <p className="text-xs text-green-600">+8 from yesterday</p>
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Average Order
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">$37.97</div>
            <p className="text-xs text-green-600">+2.1% from yesterday</p>
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Processing Fees
            </CardTitle>
            <Calendar className="h-4 w-4 text-lime-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">$85.43</div>
            <p className="text-xs text-neutral-600">2.9% of revenue</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card className="border-neutral-200 bg-white">
            <CardHeader>
              <CardTitle className="text-neutral-900">
                Recent Transactions
              </CardTitle>
              <CardDescription>Latest payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentPayments.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-lime-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-neutral-900">
                          {transaction.id}
                        </h3>
                        <p className="text-sm text-neutral-600">
                          {transaction.table} • {transaction.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium text-neutral-900">
                          ${transaction.amount}
                        </p>
                        <p className="text-sm text-neutral-600">
                          {transaction.method}
                        </p>
                      </div>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods">
          <div className="grid gap-6 md:grid-cols-3">
            {paymentMethods.map((method) => (
              <Card key={method.name} className="border-neutral-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-neutral-900">
                    {method.name}
                  </CardTitle>
                  <CardDescription>
                    {method.transactions} transactions today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-neutral-900">
                        ${method.amount}
                      </span>
                      <span className="text-sm text-neutral-600">
                        {method.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-4">
                      <div
                        className="bg-lime-600 h-4 rounded-full"
                        style={{ width: `${method.percentage}%` }}
                      >
                        {"\u00A0"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-neutral-200 bg-white">
              <CardHeader>
                <CardTitle className="text-neutral-900">
                  Daily Reports
                </CardTitle>
                <CardDescription>
                  Download daily payment summaries
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Today&apos;s Report
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Yesterday&apos;s Report
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  This Week&apos;s Report
                </Button>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 bg-white">
              <CardHeader>
                <CardTitle className="text-neutral-900">
                  Payment Analytics
                </CardTitle>
                <CardDescription>Detailed payment insights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700">Peak payment time</span>
                  <span className="font-medium text-neutral-900">7:30 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700">Most used method</span>
                  <span className="font-medium text-neutral-900">
                    Credit Card
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700">Failed transactions</span>
                  <span className="font-medium text-red-600">2 (2.7%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700">Refunds today</span>
                  <span className="font-medium text-neutral-900">$45.67</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
