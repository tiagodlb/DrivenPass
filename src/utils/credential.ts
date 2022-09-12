import { credentialRepository } from "../repositories/credentialRepository.js";

export async function verifyIfLabelExists(label: string, userId: number) {
  const credential = await credentialRepository.findByLabelAndId(label, userId);
  return credential;
}
