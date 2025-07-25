export interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  available: boolean;
  popularity: number;
}

export const demoMenuItems: MenuItem[] = [
  {
    id: 1,
    name: "Classic Burger",
    category: "Mains",
    price: 15.99,
    description: "Beef patty with lettuce, tomato, and special sauce",
    available: true,
    popularity: 95,
  },
  {
    id: 2,
    name: "Margherita Pizza",
    category: "Mains",
    price: 18.5,
    description: "Fresh mozzarella, tomato sauce, and basil",
    available: true,
    popularity: 88,
  },
  {
    id: 3,
    name: "Caesar Salad",
    category: "Salads",
    price: 12.99,
    description: "Crisp romaine lettuce with caesar dressing and croutons",
    available: true,
    popularity: 72,
  },
  {
    id: 4,
    name: "Grilled Salmon",
    category: "Mains",
    price: 24.99,
    description: "Fresh Atlantic salmon with seasonal vegetables",
    available: true,
    popularity: 85,
  },
  {
    id: 5,
    name: "Chocolate Cake",
    category: "Desserts",
    price: 8.99,
    description: "Rich chocolate cake with vanilla ice cream",
    available: false,
    popularity: 91,
  },
];

export const getMenuCategories = () => {
  const categories = new Set(demoMenuItems.map((item) => item.category));
  return Array.from(categories);
};

export const getMenuItemsByCategory = (category: string) => {
  return demoMenuItems.filter((item) => item.category === category);
};
