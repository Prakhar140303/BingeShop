import express from "express";
import { LoginController, SignupController } from "../controllers/auth.controller.js";
const router = express.Router();

router.get('/signup',SignupController);
router.post('/login',LoginController);

export default router;