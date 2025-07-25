export interface Order {
  id: string;
  table: string;
  items: string[];
  status: "preparing" | "ready" | "delivered" | "cancelled";
  time: string;
  total: number;
  server: string;
}

export const demoOrders: Order[] = [
  {
    id: "#001",
    table: "Table 5",
    items: ["2x Classic Burger", "1x Fries", "2x Coke"],
    status: "preparing",
    time: "5 min ago",
    total: 45.67,
    server: "Sarah",
  },
  {
    id: "#002",
    table: "Table 12",
    items: ["1x Grilled Salmon", "1x Caesar Salad", "2x Wine"],
    status: "ready",
    time: "8 min ago",
    total: 67.89,
    server: "Mike",
  },
  {
    id: "#003",
    table: "Table 3",
    items: ["1x Pasta Carbonara", "1x Garlic Bread"],
    status: "preparing",
    time: "12 min ago",
    total: 28.5,
    server: "Sarah",
  },
];

export const getOrderStatusColor = (status: Order["status"]) => {
  switch (status) {
    case "preparing":
      return "bg-yellow-100 text-yellow-800";
    case "ready":
      return "bg-green-100 text-green-800";
    case "delivered":
      return "bg-blue-100 text-blue-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
