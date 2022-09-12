import { Wifi } from "@prisma/client";
import prisma from "../config/database.js";

export type createWifi = Omit<Wifi, "id" | "createdAt">;

export class wifiRepository {
  static async postWifi(data: createWifi): Promise<Wifi> {
    return await prisma.wifi.create({
      data: data,
    });
  }

  static async findByLabelAndId(
    label: string,
    userId: number
  ): Promise<Wifi | null> {
    return await prisma.wifi.findFirst({
      where: {
        label,
        userId,
      },
    });
  }

  static async findByUserId(userId: number): Promise<Wifi | null> {
    return await prisma.wifi.findFirst({
      where: {
        userId,
      },
    });
  }
  static async findById(id: number): Promise<Wifi | null> {
    return await prisma.wifi.findFirst({
      where: {
        id: id,
      },
    });
  }
  static async deleteWifi(id: number): Promise<Wifi | null> {
    return await prisma.wifi.delete({ where: { id: id } });
  }
}
