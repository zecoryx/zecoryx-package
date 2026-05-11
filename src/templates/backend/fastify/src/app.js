import Fastify from "fastify";
import cors from "./middlewares/cors.js";
import exampleRoutes from "./routes/example.routes.js";
import { env } from "./config/env.js";

const fastify = Fastify({ logger: true });

// Plugins
fastify.register(cors);

// Routes
fastify.register(exampleRoutes, { prefix: "/api" });

const start = async () => {
  try {
    await fastify.listen({ port: env.PORT, host: "0.0.0.0" });
    console.log(
      `🚀 Fastify (Clean Architecture) running on http://localhost:${env.PORT}`,
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
