import { createSafeNote, safeNoteRepository } from "../repositories/safeNoteRepository.js";

export async function createSafeNote(
  createSafeNote: createSafeNote
) {
  return await safeNoteRepository.postSafeNote(createSafeNote);
}

export async function findAllUsersById(userId: number) {
  return await safeNoteRepository.findByUserId(userId);
}

export async function findById(id: number) {
  const safeNote = await safeNoteRepository.findById(id);
  if (!safeNote) {
    throw { type: "not_found", message: "Credential not found" };
  }
  return safeNote;
}

export async function deleteSafeNote(id: number) {
  return await safeNoteRepository.deleteSafeNote(id);
}
