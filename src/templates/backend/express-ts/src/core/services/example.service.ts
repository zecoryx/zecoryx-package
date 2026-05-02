import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

interface SystemStatus {
  status: string;
  timestamp: string;
  message: string;
}

export const getSystemStatus = (): SystemStatus => {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
    message: "Zecoryx Backend (Express + TypeScript) is running!",
  };
};

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async createUser(userData: Omit<User, "id" | "createdAt">): Promise<User> {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    return this.userRepository.save(newUser);
  }
}
