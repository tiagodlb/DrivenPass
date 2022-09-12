import { safeNoteRepository } from "../repositories/safeNoteRepository.js";

export async function verifyIfLabelExists(label: string, userId: number) {
  const safeNote = await safeNoteRepository.findByLabelAndId(label, userId);
  return safeNote;
}
