import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./api/routes/index.js";
import { errorHandler } from "./api/middlewares/error.middleware.js";
import { env } from "./infrastructure/config/env.js";

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", router);

// Error Handling
app.use(errorHandler);

const PORT = env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
