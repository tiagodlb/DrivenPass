import { wifiRepository } from "../repositories/wifiRepository.js";

export async function verifyIfLabelExists(label: string, userId: number) {
  const wifi = await wifiRepository.findByLabelAndId(label, userId);
  return wifi;
}
