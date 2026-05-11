import { FastifyInstance } from "fastify";
import { getStatus, getUsers, createUser } from "../controllers/example.controller";

export default async function exampleRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get("/status", getStatus);
  fastify.get("/users", getUsers);
  fastify.post("/users", createUser);
}
