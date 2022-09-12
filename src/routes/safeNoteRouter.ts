import { Router } from "express";
import {
  deleteSafeNotes,
  getAllUsersSafeNotes,
  getSafeNotesById,
  postSafeNotes,
} from "../controllers/safeNotes/safeNotesController.js";
import { validateSchemaMiddleware } from "../middlewares/handleSchemaMiddleware.js";
import verifyTokenMiddleware from "../middlewares/handleTokenMiddleware.js";
import safeNoteSchema from "../schemas/safeNoteSchema.js";

const safeNoteRouter = Router();

safeNoteRouter.post(
  "/safenote",
  verifyTokenMiddleware,
  validateSchemaMiddleware(safeNoteSchema),
  postSafeNotes
);
safeNoteRouter.get("/safenote", verifyTokenMiddleware, getAllUsersSafeNotes);
safeNoteRouter.get("/safenote/:id", verifyTokenMiddleware, getSafeNotesById);
safeNoteRouter.delete("/safenote/:id", verifyTokenMiddleware, deleteSafeNotes);

export default safeNoteRouter;
