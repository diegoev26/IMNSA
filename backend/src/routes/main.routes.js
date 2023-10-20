import { Router } from "express";
import { getData, login, sendMail } from "../controllers/main.controllers";
const router = Router();

router.post("/login", login);
router.post("/getData", getData);
router.post("/sendMail", sendMail);

export default router;
