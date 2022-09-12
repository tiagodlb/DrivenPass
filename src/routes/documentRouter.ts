import { Router } from "express";
import {
  deleteDocument,
  getAllUsersDocuments,
  postDocuments,
} from "../controllers/documents/document.js";
import { getSafeNotesById } from "../controllers/safeNotes/safeNotesController.js";
import { validateSchemaMiddleware } from "../middlewares/handleSchemaMiddleware.js";
import verifyTokenMiddleware from "../middlewares/handleTokenMiddleware.js";
import documentSchema from "../schemas/documentSchema.js";

const documentRouter = Router();

documentRouter.post(
  "/document",
  verifyTokenMiddleware,
  validateSchemaMiddleware(documentSchema),
  postDocuments
);
documentRouter.get("/document", verifyTokenMiddleware, getAllUsersDocuments);
documentRouter.get("/document/:id", verifyTokenMiddleware, getSafeNotesById);
documentRouter.delete("/document/:id", verifyTokenMiddleware, deleteDocument);

export default documentRouter;
