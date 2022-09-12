import { Router } from "express";
import { getWelcome } from "../controllers/welcome/welcomeController.js";

const welcomeRouter = Router();

welcomeRouter.get("/", getWelcome);

export default welcomeRouter;
