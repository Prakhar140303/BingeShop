import express from "express";
import { LoginController, SignupController, LogoutController } from "../controllers/auth/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post('/signup',SignupController);
router.post('/login',LoginController);
router.post('/logout',LogoutController);
router.get('/check-auth',authMiddleware,(req,res)=>{
    const user = req.user;
    res.status(200).json({success : true, user});
});
export default router;