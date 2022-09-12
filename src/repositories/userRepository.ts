import { User } from "@prisma/client";
import prisma from "../config/database.js";

export type createUser = Omit<User, "id" | "createdAt">;

export class userRepository {
  static async postUser(data: createUser): Promise<User> {
    return await prisma.user.create({
      data: data,
    });
  }

  static async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  static async getUserById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
