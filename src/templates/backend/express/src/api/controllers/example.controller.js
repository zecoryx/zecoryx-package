import * as exampleService from "../../core/services/example.service.js";

export const getStatus = (req, res, next) => {
  try {
    const status = exampleService.getSystemStatus();
    res.json(status);
  } catch (error) {
    next(error);
  }
};
