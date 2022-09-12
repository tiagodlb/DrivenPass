import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";

import welcomeRouter from "./routes/welcomeRouter.js";
import userRouter from "./routes/userRouter.js";
import cardRouter from "./routes/cardRouter.js";
import credentialRouter from "./routes/credentialRouter.js";
import wifiRouter from "./routes/wifiRouter.js";
import safeNoteRouter from "./routes/safeNoteRouter.js";
import documentRouter from "./routes/documentRouter.js";

dotenv.config();

let app = express();
app.use(cors(), json());

app.use(welcomeRouter);
app.use(userRouter);
app.use(cardRouter);
app.use(credentialRouter);
app.use(wifiRouter);
app.use(safeNoteRouter);
app.use(userRouter);
app.use(userRouter);
app.use(documentRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(chalk.bold.blue(`Server is running on port ${process.env.PORT}`))
);
