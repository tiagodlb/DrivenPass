import { Router } from "express";   
import { checkAuth, postSignIn, postUser } from "../controllers/users/userController.js";
import { validateSchemaMiddleware } from "../middlewares/handleSchemaMiddleware.js";
import { userSchema } from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.post("/signup", validateSchemaMiddleware(userSchema), postUser);
userRouter.post("/signin", validateSchemaMiddleware(userSchema), postSignIn);
userRouter.get('/check', checkAuth);

export default userRouter;