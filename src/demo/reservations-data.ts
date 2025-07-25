export interface Reservation {
  id: number;
  name: string;
  party: number;
  time: string;
  date: string;
  status: "confirmed" | "pending" | "cancelled" | "seated" | "completed";
  phone: string;
  email: string;
  table?: string;
  notes?: string;
}

export const demoReservations: Reservation[] = [
  {
    id: 1,
    name: "Johnson Family",
    party: 4,
    time: "6:00 PM",
    date: "Today",
    status: "confirmed",
    phone: "(555) 123-4567",
    email: "johnson@email.com",
    table: "Table 12",
    notes: "Birthday celebration",
  },
  {
    id: 2,
    name: "Smith",
    party: 2,
    time: "6:30 PM",
    date: "Today",
    status: "confirmed",
    phone: "(555) 234-5678",
    email: "smith@email.com",
    table: "Table 5",
    notes: "Anniversary dinner",
  },
  {
    id: 3,
    name: "Brown",
    party: 6,
    time: "7:00 PM",
    date: "Tomorrow",
    status: "pending",
    phone: "(555) 345-6789",
    email: "brown@email.com",
    notes: "Corporate dinner",
  },
];

export const getReservationStatusColor = (status: Reservation["status"]) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    case "seated":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
