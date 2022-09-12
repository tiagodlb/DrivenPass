import { Request, Response } from "express";
import handleError from "../../middlewares/handleErrorMiddleware.js";
import {
  createCard,
  deleteCard,
  findAllUsersById,
  findById,
} from "../../services/cardService.js";
import { verifyIfLabelExists } from "../../utils/card.js";

import { decryptString, encryptString } from "../../utils/cryptography.js";

export async function postCard(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const {
      label,
      number,
      name,
      securityCode,
      expiryDate,
      password,
      isVirtual,
      type,
    } = req.body;
    verifyIfLabelExists(label, user.id);
    const encryptedSecurityCode = encryptString(securityCode);
    const encryptedPassword = encryptString(password);
    const data = {
      userId: user.id,
      label,
      number,
      name,
      securityCode: encryptedSecurityCode,
      expiryDate,
      password: encryptedPassword,
      isVirtual,
      type,
    };
    const card = await createCard(data);
    res.status(201).json({ ...card, securityCode, password });
  } catch (error: { type: string; message: string } | any) {
    return handleError(error, req, res);
  }
}

export async function getAllUsersCards(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const cards = await findAllUsersById(user.id);
    res.status(200).json(
      Array(cards).map((card: any) => ({
        ...card,
        securityCode: decryptString(card.securityCode),
        password: decryptString(card.password),
      }))
    );
  } catch (error: { type: string; message: string } | any) {
    return handleError(error, req, res);
  }
}

export async function getCardsById(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const id = +req.params.id;
    const card = await findById(id);
    if (card.userId !== user.id)
      throw { type: "not_found", message: "Credential not found" };
    res.status(200).json({
      ...card,
      securityCode: decryptString(card.securityCode),
      password: decryptString(card.password),
    });
  } catch (error: { type: string; message: string } | any) {
    return handleError(error, req, res);
  }
}

export async function deleteCards(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const id = +req.params.id;
    const card = await findById(id);
    if (card.userId !== user.id)
      throw { type: "not_found", message: "Credential not found" };
    await deleteCard(id);
    res.sendStatus(204);
  } catch (error: { type: string; message: string } | any) {
    return handleError(error, req, res);
  }
}
