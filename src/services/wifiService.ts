import { createWifi, wifiRepository } from "../repositories/wifiRepository.js";

export async function createWifi(createWifi: createWifi) {
  return await wifiRepository.postWifi(createWifi);
}

export async function findAllUsersById(userId: number) {
  return await wifiRepository.findByUserId(userId);
}

export async function findById(id: number) {
  const wifi = await wifiRepository.findById(id);
  if (!wifi) {
    throw { type: "not_found", message: "Credential not found" };
  }
  return wifi;
}

export async function deleteWifi(id: number) {
  return await wifiRepository.deleteWifi(id);
}
