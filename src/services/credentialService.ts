import {
  CreateCredentialData,
  credentialRepository,
} from "../repositories/credentialRepository.js";
import { verifyIfLabelExists } from "../utils/credential.js";
import { encryptString } from "../utils/cryptography.js";

export async function createCredential(
  createCredentialData: CreateCredentialData
) {
  const labelExists = await verifyIfLabelExists(
    createCredentialData.label,
    createCredentialData.userId
  );
  if (labelExists) {
    throw { type: "Bad_Request", message: "Bad request" };
  }
  const encryptedPassword = encryptString(createCredentialData.password);
  const data = {
    userId: createCredentialData.userId,
    label: createCredentialData.label,
    url: createCredentialData.url,
    username: createCredentialData.username,
    password: encryptedPassword,
  };
  return await credentialRepository.postCredential(data);
}

export async function findAllUsersById(userId: number) {
  return await credentialRepository.findByUserId(userId);
}

export async function findById(id: number) {
  const credential = await credentialRepository.findById(id);
  if (!credential) {
    throw { type: "not_found", message: "Credential not found" };
  }
  return credential;
}

export async function deleteCredential(id: number) {
  return await credentialRepository.deleteCredential(id);
}
