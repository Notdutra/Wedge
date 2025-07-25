// Payments Demo Data
export interface PaymentMethodData {
  name: string;
  amount: number;
  percentage: number;
  transactions: number;
}

export interface PaymentTransaction {
  id: string;
  amount: number;
  method: string;
  status: "completed" | "pending" | "failed";
  time: string;
  table: string;
}

export interface PaymentStats {
  revenue: string;
  revenueChange: string;
  transactions: string;
  transactionsChange: string;
  successRate: string;
  successRateChange: string;
  averageTransaction: string;
  averageTransactionChange: string;
}

export const demoPaymentMethods: PaymentMethodData[] = [
  {
    name: "Credit Cards",
    amount: 1847.5,
    percentage: 65,
    transactions: 45,
  },
  {
    name: "Cash",
    amount: 623.25,
    percentage: 22,
    transactions: 18,
  },
  {
    name: "Mobile Pay",
    amount: 376.75,
    percentage: 13,
    transactions: 12,
  },
];

export const demoPaymentTransactions: PaymentTransaction[] = [
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

// Alias for compatibility with demo context
export const demoPayments = demoPaymentTransactions;

export const demoPaymentStats: PaymentStats = {
  revenue: "$2,847.50",
  revenueChange: "+12.5% from yesterday",
  transactions: "75",
  transactionsChange: "+8 transactions",
  successRate: "98.5%",
  successRateChange: "+0.3%",
  averageTransaction: "$37.97",
  averageTransactionChange: "+$2.14",
};

export const getEmptyPaymentMethods = (): PaymentMethodData[] => [
  { name: "Credit Cards", amount: 0, percentage: 0, transactions: 0 },
  { name: "Cash", amount: 0, percentage: 0, transactions: 0 },
  { name: "Mobile Pay", amount: 0, percentage: 0, transactions: 0 },
];

export const getEmptyPaymentStats = (): PaymentStats => ({
  revenue: "$0.00",
  revenueChange: "",
  transactions: "0",
  transactionsChange: "",
  successRate: "0%",
  successRateChange: "",
  averageTransaction: "$0.00",
  averageTransactionChange: "",
});

export const getPaymentStatusColor = (status: string): string => {
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
