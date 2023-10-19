import { Router } from "express";
import { login } from "../controllers/main.controllers";
const router = Router();

router.post("/login", login);

export default router;
