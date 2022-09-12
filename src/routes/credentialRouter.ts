import { Router } from "express";
import {
  deleteCredentials,
  getAllUsersCredentials,
  getCredentialById,
  postCredentials,
} from "../controllers/credentials/credentialController.js";
import { validateSchemaMiddleware } from "../middlewares/handleSchemaMiddleware.js";
import verifyTokenMiddleware from "../middlewares/handleTokenMiddleware.js";
import credentialSchema from "../schemas/credentialSchema.js";

const credentialRouter = Router();

credentialRouter.post(
  "/",
  verifyTokenMiddleware,
  validateSchemaMiddleware(credentialSchema),
  postCredentials
);
credentialRouter.get("/credential", verifyTokenMiddleware, getAllUsersCredentials);
credentialRouter.get("/credential/:id", verifyTokenMiddleware, getCredentialById);
credentialRouter.delete("/credential/:id", verifyTokenMiddleware, deleteCredentials);

export default credentialRouter;
