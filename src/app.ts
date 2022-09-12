import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";

import welcomeRouter from "./routes/welcomeRouter.js";
import userRouter from "./routes/userRouter.js";

dotenv.config();

let app = express();
app.use(cors(), json());

app.use(welcomeRouter);
app.use(userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(chalk.bold.blue(`Server is running on port ${process.env.PORT}`))
);
