import { cardRepository } from "../repositories/cardRepository.js";

export async function verifyIfLabelExists(label: string, userId: number) {
  const credential = await cardRepository.findByLabelAndId(label, userId);
  return credential;
}
