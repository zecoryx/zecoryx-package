import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import { env } from "./config/env";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", router);
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`🚀 Express + TypeScript running on http://localhost:${env.PORT}`);
});

export default app;
