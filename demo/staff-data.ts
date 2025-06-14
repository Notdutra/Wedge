// Staff Demo Data
export interface StaffMember {
  id: number;
  name: string;
  role: string;
  status: "active" | "break" | "off";
  shift: string;
  hours: number;
  email: string;
  phone: string;
  startDate: string;
}

export interface StaffShift {
  name: string;
  time: string;
  staff: number;
  capacity: number;
}

export interface StaffStats {
  totalStaff: number;
  currentlyActive: number;
  onBreak: number;
  offDuty: number;
}

export const demoStaff: StaffMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Server",
    status: "active",
    shift: "Morning",
    hours: 8.5,
    email: "sarah@restaurant.com",
    phone: "(555) 123-4567",
    startDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Chef",
    status: "active",
    shift: "Evening",
    hours: 9.0,
    email: "mike@restaurant.com",
    phone: "(555) 234-5678",
    startDate: "2022-08-20",
  },
  {
    id: 3,
    name: "Lisa Wong",
    role: "Bartender",
    status: "break",
    shift: "Evening",
    hours: 7.5,
    email: "lisa@restaurant.com",
    phone: "(555) 345-6789",
    startDate: "2023-03-10",
  },
  {
    id: 4,
    name: "David Brown",
    role: "Host",
    status: "active",
    shift: "Afternoon",
    hours: 6.0,
    email: "david@restaurant.com",
    phone: "(555) 456-7890",
    startDate: "2023-05-22",
  },
];

export const demoStaffShifts: StaffShift[] = [
  {
    name: "Morning Shift",
    time: "6:00 AM - 2:00 PM",
    staff: 8,
    capacity: 10,
  },
  {
    name: "Afternoon Shift",
    time: "2:00 PM - 10:00 PM",
    staff: 12,
    capacity: 15,
  },
  {
    name: "Evening Shift",
    time: "6:00 PM - 12:00 AM",
    staff: 6,
    capacity: 8,
  },
];

export const getEmptyStaffShifts = (): StaffShift[] => [
  {
    name: "Morning Shift",
    time: "6:00 AM - 2:00 PM",
    staff: 0,
    capacity: 10,
  },
  {
    name: "Afternoon Shift",
    time: "2:00 PM - 10:00 PM",
    staff: 0,
    capacity: 15,
  },
  {
    name: "Evening Shift",
    time: "6:00 PM - 12:00 AM",
    staff: 0,
    capacity: 8,
  },
];

export const getStaffStatusColor = (status: string): string => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200";
    case "break":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "off":
      return "bg-neutral-100 text-neutral-800 border-neutral-200";
    default:
      return "bg-neutral-100 text-neutral-800 border-neutral-200";
  }
};

export const getRoleColor = (role: string): string => {
  switch (role) {
    case "Chef":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "Server":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Bartender":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Host":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-neutral-100 text-neutral-800 border-neutral-200";
  }
};
