import { Request, Response } from "express";
import handleError from "../../middlewares/handleErrorMiddleware.js";
import {
  createCredential,
  deleteCredential,
  findAllUsersById,
  findById,
} from "../../services/credentialService.js";
import { decryptString } from "../../utils/cryptography.js";

export async function postCredentials(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const { label, url, username, password } = req.body;
    const data = { userId: user.id, label, url, username, password };
    const credential = await createCredential(data);
    res.status(201).json({ ...credential, password });
  } catch (error: { type: string; message: string } | any) {
    return handleError(error, req, res);
  }
}

export async function getAllUsersCredentials(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const credentials = await findAllUsersById(user.id);
    res.status(200).json(
      Array(credentials).map((credential: any) => ({
        ...credential,
        password: decryptString(credential.password),
      }))
    );
  } catch (error: { type: string; message: string } | any) {
    return handleError(error, req, res);
  }
}

export async function getCredentialById(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const id = +req.params.id;
    const credential = await findById(id);
    if (credential.userId !== user.id)
      throw { type: "not_found", message: "Credential not found" };
    res.status(200).json({
      ...credential,
      password: decryptString(credential.password),
    });
  } catch (error: { type: string; message: string } | any) {
    return handleError(error, req, res);
  }
}

export async function deleteCredentials(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const id = +req.params.id;
    const credential = await findById(id);
    if (credential.userId !== user.id)
      throw { type: "not_found", message: "Credential not found" };
    await deleteCredential(id);
    res.sendStatus(204);
  } catch (error: { type: string; message: string } | any) {
    return handleError(error, req, res);
  }
}
