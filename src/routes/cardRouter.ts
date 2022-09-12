import { Router } from "express";
import {
  deleteCards,
  getAllUsersCards,
  getCardsById,
  postCard,
} from "../controllers/cards/cardController.js";
import { validateSchemaMiddleware } from "../middlewares/handleSchemaMiddleware.js";
import verifyTokenMiddleware from "../middlewares/handleTokenMiddleware.js";
import cardSchema from "../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.post(
  "/",
  verifyTokenMiddleware,
  validateSchemaMiddleware(cardSchema),
  postCard
);
cardRouter.get("/card", verifyTokenMiddleware, getAllUsersCards);
cardRouter.get("/card/:id", verifyTokenMiddleware, getCardsById);
cardRouter.delete("/card/:id", verifyTokenMiddleware, deleteCards);

export default cardRouter;
