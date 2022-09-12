import { Request, Response } from "express";
import handleError from "../../middlewares/handleErrorMiddleware.js";
import { createDocument, deleteDocuments, findAllUsersById, findById } from "../../services/documentService.js";
import { verifyIfLabelExists } from "../../utils/secureNote.js";

export async function postDocuments(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const { type, name, number, expirationDate, issueDate, issuer } = req.body;
    verifyIfLabelExists(type, user.id)
    const data = {
        userId: user.id,
        type,
        name,
        number,
        expirationDate,
        issueDate,
        issuer,
      };
    const document = await createDocument(data);
    res.status(201).json(document);
} catch (error: { type: string; message: string } | any) {
    return handleError(error, req, res);
  }
}

export async function getAllUsersDocuments(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const document = await findAllUsersById(user.id);
    res.status(200).json(document);
  } catch (error: { type: string; message: string } | any) {
    return handleError(error, req, res);
  }
}

export async function getDocumentById(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const id = +req.params.id;
    const documents = await findById(id);
    if (documents.userId !== user.id)
      throw { type: "not_found", message: "Credential not found" };
    res.status(200).json(documents);
  } catch (error: { type: string; message: string } | any) {
    return handleError(error, req, res);
  }
}

export async function deleteDocument(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const id = +req.params.id;
    const documents = await findById(id);
    if (documents.userId !== user.id)
      throw { type: "not_found", message: "Credential not found" };
    await deleteDocuments(id);
    res.sendStatus(204);
  } catch (error: { type: string; message: string } | any) {
    return handleError(error, req, res);
  }
}
