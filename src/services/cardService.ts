import { cardRepository, createCard } from "../repositories/cardRepository.js";

export async function createCard(
  createSafeNote: createCard
) {
  return await cardRepository.postCard(createSafeNote);
}

export async function findAllUsersById(userId: number) {
  return await cardRepository.findByUserId(userId);
}

export async function findById(id: number) {
  const card = await cardRepository.findById(id);
  if (!card) {
    throw { type: "not_found", message: "Credential not found" };
  }
  return card;
}

export async function deleteCard(id: number) {
  return await cardRepository.deleteCard(id);
}
