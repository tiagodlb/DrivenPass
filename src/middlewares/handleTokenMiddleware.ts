import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { getUserById } from "../services/userService.js";

dotenv.config();

interface UserIdJwtPayload extends jwt.JwtPayload {
  userId: number;
}

const jwtSecrete = process.env.JWT_SECRETE as string;

export async function verifyTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) {
    throw { type: "Unauthorized", message: "Token not provided" };
  }

  const parts = authorization.split(" ");
  if (!(parts.length === 2)) {
    throw { type: "Unauthorized", message: "Invalid authorization header" };
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    throw { type: "Unauthorized", message: "Invalid authorization header" };
  }

  let userId: number;
  try {
    let decoded = <UserIdJwtPayload>jwt.verify(token, jwtSecrete);
    userId = decoded.userId;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw { type: "Unauthorized", message: "Token Expired" };
    }
    throw { type: "Unauthorized", message: "Invalid Token" };
  }

  const user = await getUserById(userId);
  if (!user) {
    throw { type: "Unauthorized", message: "Invalid Token" };
  }

  res.locals.user = user;
  next();
}

export default verifyTokenMiddleware;
