import {
  createDocument,
  documentRepository,
} from "../repositories/documentsRepository.js";

export async function createDocument(createDocument: createDocument) {
  return await documentRepository.postDocument(createDocument);
}

export async function findAllUsersById(userId: number) {
  return await documentRepository.findByUserId(userId);
}

export async function findById(id: number) {
  const safeNote = await documentRepository.findById(id);
  if (!safeNote) {
    throw { type: "not_found", message: "Credential not found" };
  }
  return safeNote;
}

export async function deleteDocuments(id: number) {
  return await documentRepository.deleteDocument(id);
}
