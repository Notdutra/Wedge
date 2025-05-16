// Simple in-memory mock database for users
// This will be replaced by a real database in production
export type MockUser = {
  name: string;
  email: string;
  password: string;
};

export const mockUsers: MockUser[] = [
  {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  },
];

export function findUserByEmail(email: string) {
  return mockUsers.find((user) => user.email === email);
}

export function addUser(user: MockUser) {
  mockUsers.push(user);
}
