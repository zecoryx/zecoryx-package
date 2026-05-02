import Fastify from "fastify";
import cors from "./api/plugins/cors";
import exampleRoutes from "./api/routes/example.routes";
import { env } from "./infrastructure/config/env";

const fastify = Fastify({ logger: true });

fastify.register(cors);
fastify.register(exampleRoutes, { prefix: "/api" });

const start = async (): Promise<void> => {
  try {
    await fastify.listen({ port: env.PORT, host: "0.0.0.0" });
    console.log(`🚀 Fastify + TypeScript running on http://localhost:${env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
