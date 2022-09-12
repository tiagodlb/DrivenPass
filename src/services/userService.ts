import { userRepository } from "../repositories/userRepository.js";
import { compareHashedString, hashString } from "../utils/cryptography.js";
import { userAlreadyExists } from "../utils/user.js";

export async function createUser(
  email: string,
  password: string
): Promise<void> {
  let user: any = await userAlreadyExists(email);
  if (user) throw { type: "conflict", message: "Email already in use" };
  const encryptedPassword = hashString(password)
  const data = { email: email, password: encryptedPassword };
  await userRepository.postUser(data);
  return;
}

export async function logInUser(email: string, password: string) {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw { type: "Unauthorized", message: "Email or password invalid" };
  }
  console.log(user)
  const isPasswordValid: boolean = compareHashedString(password, user.password);
  console.log(isPasswordValid)
  if (!isPasswordValid) {
    throw { type: "Unauthorized", message: "Email or password invalid" };
  }
  return user;
}

export async function getUserById (id: number) {
  const user = await userRepository.getUserById(id);
  return user;
};