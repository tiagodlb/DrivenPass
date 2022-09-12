import { user } from "@prisma/client";
import Cryptr from "cryptr";
import prisma from "../config/database.js";

export type createUser = Omit<user, "id" | "createdAt">;

export class userRepository {
  static async postUser(data: createUser): Promise<user> {
    return await prisma.user.create({
      data: data,
    });
  }

  static async findUserByEmail(email: string): Promise<user | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  static async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
