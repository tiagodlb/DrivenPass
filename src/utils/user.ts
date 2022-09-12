import { userRepository } from "../repositories/userRepository.js";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

dotenv.config()

const jwtkey: string = process.env.JWTKEY as string

export async function userAlreadyExists(email: string) {
  const user = await userRepository.findUserByEmail(email);
  return user;
}

export async function generateToken(id: number): Promise<String> {
  const token = jwt.sign({ userId: id }, jwtkey, {
    expiresIn: "1h",
  });
  return token;
}
