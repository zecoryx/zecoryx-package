import { FastifyRequest, FastifyReply } from "fastify";
import * as exampleService from "../services/example.service";
import { UserRepositoryImpl } from "../services/UserRepositoryImpl";

const userRepository = new UserRepositoryImpl();
const userService = new exampleService.UserService(userRepository);

export const getStatus = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const status = exampleService.getSystemStatus();
  reply.send(status);
};

export const getUsers = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const users = await userService.getAllUsers();
  reply.send(users);
};

export const createUser = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const user = await userService.createUser(request.body as any);
  reply.code(201).send(user);
};
