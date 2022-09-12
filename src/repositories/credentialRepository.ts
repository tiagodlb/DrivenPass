import { Credential } from "@prisma/client";
import prisma from "../config/database.js";

export type CreateCredentialData = Omit<Credential, "id" | "createdAt">;

export class credentialRepository {
  static async postCredential(data: CreateCredentialData): Promise<Credential> {
    return await prisma.credential.create({
      data: data,
    });
  }

  static async findByLabelAndId(
    label: string,
    userId: number
  ): Promise<Credential | null> {
    return await prisma.credential.findFirst({
      where: {
        label,
        userId,
      },
    });
  }

  static async findByUserId(
    userId: number
  ): Promise<Credential | null> {
    return await prisma.credential.findFirst({
      where: {
        userId,
      },
    });
  }
  static async findById(id: number): Promise<Credential | null> {
    return await prisma.credential.findFirst({
      where: {
        id: id,
      },
    });
  }
  static async deleteCredential(id: number): Promise<Credential | null> {
    
    return await prisma.credential.delete({ where: { id: id } });
  }
}
