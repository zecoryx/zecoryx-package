import * as exampleService from "../../core/services/example.service.js";

export const getStatus = async (request, reply) => {
  const status = exampleService.getSystemStatus();
  return status;
};
