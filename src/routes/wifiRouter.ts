import { Router } from "express";
import {
  deleteWifis,
  getAllUsersWifis,
  getWifiById,
  postWifi,
} from "../controllers/wifi/wifiController.js";
import { validateSchemaMiddleware } from "../middlewares/handleSchemaMiddleware.js";
import verifyTokenMiddleware from "../middlewares/handleTokenMiddleware.js";
import wifiSchema from "../schemas/wifiSchema.js";

const wifiRouter = Router();

wifiRouter.post(
  "/",
  verifyTokenMiddleware,
  validateSchemaMiddleware(wifiSchema),
  postWifi
);
wifiRouter.get("/wifi", verifyTokenMiddleware, getAllUsersWifis);
wifiRouter.get("/wifi/:id", verifyTokenMiddleware, getWifiById);
wifiRouter.delete("/wifi/:id", verifyTokenMiddleware, deleteWifis);

export default wifiRouter;
