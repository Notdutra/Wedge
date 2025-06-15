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
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  CreditCard,
  CheckCircle,
  Download,
  TrendingUp,
} from "lucide-react";
import { useDemoContext, useMixedData } from "@/contexts/demo-context";
import { useRestaurantContext } from "@/contexts/restaurant-context";
import {
  demoPaymentMethods,
  demoPaymentStats,
  getEmptyPaymentMethods,
  getEmptyPaymentStats,
  getPaymentStatusColor,
} from "@/demo/payments-data";

export function PaymentsPage() {
  const { isDemoMode, demoData } = useDemoContext();
  const { payments, isLoading } = useRestaurantContext();

  // Use the new hook to get consistent data
  const currentPayments = useMixedData(demoData.payments, payments);

  const paymentMethods = isDemoMode
    ? demoPaymentMethods
    : getEmptyPaymentMethods();
  const stats = isDemoMode ? demoPaymentStats : getEmptyPaymentStats();

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
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-32" />
              ))}
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
                          <Skeleton className="h-5 w-24 mb-1" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Skeleton className="h-5 w-16 mb-1" />
                          <Skeleton className="h-4 w-12" />
                        </div>
                        <Skeleton className="h-6 w-20" />
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
                <div className="text-2xl font-bold text-neutral-900">
                  {stats.revenue}
                </div>
                {stats.revenueChange && (
                  <p className="text-xs text-green-600">
                    {stats.revenueChange}
                  </p>
                )}
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
                <div className="text-2xl font-bold text-neutral-900">
                  {stats.transactions}
                </div>
                {stats.transactionsChange && (
                  <p className="text-xs text-green-600">
                    {stats.transactionsChange}
                  </p>
                )}
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
                <div className="text-2xl font-bold text-neutral-900">
                  {stats.averageTransaction}
                </div>
                {stats.averageTransactionChange && (
                  <p className="text-xs text-green-600">
                    {stats.averageTransactionChange}
                  </p>
                )}
              </CardContent>
            </Card>
            <Card className="border-neutral-200 bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">
                  Success Rate
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-lime-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neutral-900">
                  {stats.successRate}
                </div>
                {stats.successRateChange && (
                  <p className="text-xs text-green-600">
                    {stats.successRateChange}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="transactions" className="space-y-6">
            <TabsList>
              <TabsTrigger value="transactions">
                Recent Transactions
              </TabsTrigger>
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
                          <Badge
                            className={getPaymentStatusColor(
                              transaction.status,
                            )}
                          >
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
                  <Card
                    key={method.name}
                    className="border-neutral-200 bg-white"
                  >
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
                      <span className="text-neutral-700">
                        Peak payment time
                      </span>
                      <span className="font-medium text-neutral-900">
                        7:30 PM
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-700">Most used method</span>
                      <span className="font-medium text-neutral-900">
                        Credit Card
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-700">
                        Failed transactions
                      </span>
                      <span className="font-medium text-red-600">2 (2.7%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-700">Refunds today</span>
                      <span className="font-medium text-neutral-900">
                        $45.67
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
