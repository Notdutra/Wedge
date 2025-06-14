// Staff Demo Data
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

export const getStatusColor = (status: string): string => {
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
