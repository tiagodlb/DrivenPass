import { Request, Response } from "express";
import handleError from "../../middlewares/handleErrorMiddleware.js";
import { createSafeNote, deleteSafeNote, findAllUsersById, findById } from "../../services/safeNoteService.js";
import { verifyIfLabelExists } from "../../utils/secureNote.js";

export async function postSafeNotes(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const { label, content } = req.body;
    verifyIfLabelExists(label, user.id)
    const data = {
      userId: user.id,
      label,
      content,
    };
    const safeNote = await createSafeNote(data);
    res.status(201).json(safeNote);
  } catch (error: { type: string; message: string } | any) {
    return handleError(error, req, res);
  }
}

export async function getAllUsersSafeNotes(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const safeNote = await findAllUsersById(user.id);
    res.status(200).json(safeNote);
  } catch (error: { type: string; message: string } | any) {
    return handleError(error, req, res);
  }
}

export async function getSafeNotesById(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const id = +req.params.id;
    const safeNotes = await findById(id);
    if (safeNotes.userId !== user.id)
      throw { type: "not_found", message: "Credential not found" };
    res.status(200).json(safeNotes);
  } catch (error: { type: string; message: string } | any) {
    return handleError(error, req, res);
  }
}

export async function deleteSafeNotes(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const id = +req.params.id;
    const secureNotes = await findById(id);
    if (secureNotes.userId !== user.id)
      throw { type: "not_found", message: "Credential not found" };
    await deleteSafeNote(id);
    res.sendStatus(204);
  } catch (error: { type: string; message: string } | any) {
    return handleError(error, req, res);
  }
}
