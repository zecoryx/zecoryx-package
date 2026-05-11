import { Router } from "express";
import { getStatus, getUsers, createUser } from "../controllers/example.controller";

const router = Router();

router.get("/status", getStatus);
router.get("/users", getUsers);
router.post("/users", createUser);

export default router;
