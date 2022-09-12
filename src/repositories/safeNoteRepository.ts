import { SafeNote } from "@prisma/client";
import prisma from "../config/database.js";

export type createSafeNote = Omit<SafeNote, "id" | "createdAt">;

export class safeNoteRepository {
  static async postSafeNote(data: createSafeNote): Promise<SafeNote> {
    return await prisma.safeNote.create({
      data: data,
    });
  }

  static async findByLabelAndId(
    label: string,
    userId: number
  ): Promise<SafeNote | null> {
    return await prisma.safeNote.findFirst({
      where: {
        label,
        userId,
      },
    });
  }

  static async findByUserId(userId: number): Promise<SafeNote | null> {
    return await prisma.safeNote.findFirst({
      where: {
        userId,
      },
    });
  }
  static async findById(id: number): Promise<SafeNote | null> {
    return await prisma.safeNote.findFirst({
      where: {
        id: id,
      },
    });
  }
  static async deleteSafeNote(id: number): Promise<SafeNote | null> {
    return await prisma.safeNote.delete({ where: { id: id } });
  }
}
