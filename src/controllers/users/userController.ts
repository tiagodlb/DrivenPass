import { Request, Response } from "express";
import handleError from "../../middlewares/handleErrorMiddleware.js";
import { createUser, logInUser } from "../../services/userService.js";
import { generateToken } from "../../utils/user.js";

export async function postUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    await createUser(email, password);
    res.sendStatus(201);
  } catch (error: { type: string; message: string } | any) {
    return handleError(error, req, res);
  }
}

export async function postSignIn(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await logInUser(email, password);
    const token = generateToken(user.id);
    res.send({ token }).status(201);
  } catch (error: { type: string; message: string } | any) {
    return handleError(error, req, res);
  }
}

export async function checkAuth(req: Request, res: Response) {
  const { user } = res.locals;
  res.json({
    message: "You are authenticated",
    user: {
      id: user.id,
      email: user.email,
    },
  });
}
