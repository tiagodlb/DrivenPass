import { Request, Response } from "express";

export async function getWelcome(_req: Request, res: Response) {
  res.send("Welcome to DrivenPass");
}
