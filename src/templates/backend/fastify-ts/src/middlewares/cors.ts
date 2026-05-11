import fp from "fastify-plugin";
import fastifyCors from "@fastify/cors";
import { FastifyInstance } from "fastify";

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyCors, { origin: true });
});
