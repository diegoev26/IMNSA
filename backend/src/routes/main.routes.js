import { Router } from "express";
import { getData, login } from "../controllers/main.controllers";
const router = Router();

router.post("/login", login);
router.post("/getData", getData);

export default router;
