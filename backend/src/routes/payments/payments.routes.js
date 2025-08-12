import express from "express";
import { createOrder, verifyPayment } from "../../payment/payment.controller.js";

const router = express.Router();

// Route to create an order
router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);

export default router;