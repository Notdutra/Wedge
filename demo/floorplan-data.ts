export interface DemoTable {
  id: number;
  number: string;
  seats: number;
  status: "available" | "occupied" | "reserved" | "cleaning";
  x: number;
  y: number;
  party?: string;
  time?: string;
}

export const demoTables: DemoTable[] = [
  { id: 1, number: "1", seats: 2, status: "available", x: 50, y: 50 },
  {
    id: 2,
    number: "2",
    seats: 4,
    status: "occupied",
    x: 150,
    y: 50,
    party: "Johnson (4)",
    time: "45 min",
  },
  { id: 3, number: "3", seats: 2, status: "available", x: 250, y: 50 },
  {
    id: 4,
    number: "4",
    seats: 6,
    status: "reserved",
    x: 350,
    y: 50,
    party: "Smith (6)",
    time: "6:30 PM",
  },
  {
    id: 5,
    number: "5",
    seats: 4,
    status: "occupied",
    x: 50,
    y: 150,
    party: "Williams (3)",
    time: "25 min",
  },
  { id: 6, number: "6", seats: 2, status: "cleaning", x: 150, y: 150 },
  { id: 7, number: "7", seats: 8, status: "available", x: 250, y: 150 },
  {
    id: 8,
    number: "8",
    seats: 4,
    status: "occupied",
    x: 350,
    y: 150,
    party: "Brown (4)",
    time: "15 min",
  },
  { id: 9, number: "9", seats: 2, status: "available", x: 50, y: 250 },
  { id: 10, number: "10", seats: 4, status: "available", x: 150, y: 250 },
  {
    id: 11,
    number: "11",
    seats: 6,
    status: "reserved",
    x: 250,
    y: 250,
    party: "Davis (5)",
    time: "7:00 PM",
  },
  {
    id: 12,
    number: "12",
    seats: 2,
    status: "occupied",
    x: 350,
    y: 250,
    party: "Wilson (2)",
    time: "30 min",
  },
];

export const getTableStats = (tables: DemoTable[]) => ({
  total: tables.length,
  available: tables.filter((t) => t.status === "available").length,
  occupied: tables.filter((t) => t.status === "occupied").length,
  reserved: tables.filter((t) => t.status === "reserved").length,
  cleaning: tables.filter((t) => t.status === "cleaning").length,
});

export const getTableStatusColor = (status: DemoTable["status"]) => {
  switch (status) {
    case "available":
      return "#bbf7d0"; // green-200
    case "occupied":
      return "#fecaca"; // red-200
    case "reserved":
      return "#fef08a"; // yellow-200
    case "cleaning":
      return "#bae6fd"; // blue-200
    default:
      return "#a3a3a3";
  }
};

export const getTableStatusBadgeColor = (status: DemoTable["status"]) => {
  switch (status) {
    case "available":
      return "bg-green-100 text-green-800 border-green-200";
    case "occupied":
      return "bg-red-100 text-red-800 border-red-200";
    case "reserved":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "cleaning":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};
