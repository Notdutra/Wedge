// Inventory Demo Data
export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  current: number;
  unit: string;
  minimum: number;
  cost: string;
  status: "low" | "good";
}

export interface InventoryStats {
  totalItems: number;
  lowStock: number;
  categories: number;
  totalValue: string;
}

export const demoInventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "Tomatoes",
    category: "Produce",
    current: 25,
    unit: "lbs",
    minimum: 10,
    cost: "$3.50/lb",
    status: "good",
  },
  {
    id: "2",
    name: "Ground Beef",
    category: "Meat",
    current: 8,
    unit: "lbs",
    minimum: 15,
    cost: "$12.99/lb",
    status: "low",
  },
  {
    id: "3",
    name: "Mozzarella Cheese",
    category: "Dairy",
    current: 3,
    unit: "lbs",
    minimum: 5,
    cost: "$8.75/lb",
    status: "low",
  },
  {
    id: "4",
    name: "Olive Oil",
    category: "Pantry",
    current: 12,
    unit: "bottles",
    minimum: 3,
    cost: "$15.99/bottle",
    status: "good",
  },
  {
    id: "5",
    name: "Flour",
    category: "Pantry",
    current: 6,
    unit: "bags",
    minimum: 8,
    cost: "$4.25/bag",
    status: "low",
  },
];

// Alias for compatibility with demo context
export const demoInventory = demoInventoryItems;

export const demoInventoryStats: InventoryStats = {
  totalItems: 128,
  lowStock: 14,
  categories: 4,
  totalValue: "$2,847",
};

export const getEmptyInventoryStats = (): InventoryStats => ({
  totalItems: 0,
  lowStock: 0,
  categories: 0,
  totalValue: "$0",
});

export const getInventoryStatusColor = (status: string): string => {
  switch (status) {
    case "low":
      return "bg-red-100 text-red-800 border-red-200";
    case "good":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-neutral-100 text-neutral-800 border-neutral-200";
  }
};
