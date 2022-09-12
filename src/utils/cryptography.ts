import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Cryptr from "cryptr";

dotenv.config();
const secretkey: string = process.env.SECRETKEY as string
const saltRounds: string = process.env.SALT_ROUNDS as string
const cryptr: Cryptr = new Cryptr(secretkey);

export function hashString(text: string | Buffer): string {
  const hashString: string = bcrypt.hashSync(text, Number(saltRounds));
  return hashString;
}

export function compareHashedString(data: string | Buffer, encrypted: string): boolean {
  const match: boolean = bcrypt.compareSync(data, encrypted);
  return match;
}

export function encryptString(string: string): string {
  const encryptedString : string = cryptr.encrypt(string);
  return encryptedString;
}

export function decryptString(encryptedString: string): string {
  const decryptedString : string = cryptr.decrypt(encryptedString);
  return decryptedString;
}