import { getStatus } from "../controllers/example.controller.js";

export default async function exampleRoutes(fastify, options) {
  fastify.get("/status", getStatus);
}
