import { Card } from "@prisma/client";
import prisma from "../config/database.js";

export type createCard = Omit<Card, "id" | "createdAt">;

export class cardRepository {
  static async postCard(data: createCard): Promise<Card> {
    return await prisma.card.create({
      data: data,
    });
  }

  static async findByLabelAndId(
    label: string,
    userId: number
  ): Promise<Card | null> {
    return await prisma.card.findFirst({
      where: {
        label,
        userId,
      },
    });
  }

  static async findByUserId(userId: number): Promise<Card | null> {
    return await prisma.card.findFirst({
      where: {
        userId,
      },
    });
  }
  static async findById(id: number): Promise<Card | null> {
    return await prisma.card.findFirst({
      where: {
        id: id,
      },
    });
  }
  static async deleteCard(id: number): Promise<Card | null> {
    return await prisma.card.delete({ where: { id: id } });
  }
}
