import { Document, DocumentType } from "@prisma/client";
import prisma from "../config/database.js";

export type createDocument = Omit<Document, "id" | "createdAt">;

export class documentRepository {
  static async postDocument(data: createDocument): Promise<Document> {
    return await prisma.document.create({
      data: data,
    });
  }

  static async findByTypeAndUserId(
    type: DocumentType, 
    userId: number
  ): Promise<Document | null> {
    return await prisma.document.findFirst({
      where: {
        type,
        userId,
      },
    });
  }

  static async findByUserId(id: number): Promise<Document | null> {
    return await prisma.document.findFirst({
      where: {
        id,
      },
    });
  }
  static async findById(id: number): Promise<Document | null> {
    return await prisma.document.findFirst({
      where: {
        id: id,
      },
    });
  }
  static async deleteDocument(id: number): Promise<Document | null> {
    return await prisma.document.delete({ where: { id: id } });
  }
}
