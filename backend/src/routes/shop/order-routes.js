import express from "express";
import { fetchOrder,fetchOrderByUserId} from  "../../controllers/shop/order-controller.js"

const router = express.Router();

router.get("/:id", fetchOrderByUserId);
router.get("/", fetchOrder);

export default router;