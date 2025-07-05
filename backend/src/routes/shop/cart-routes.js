import express from 'express'
import { getCartProduct, addCartProduct } from '../../controllers/shop/cart-contoller.js';
const router  =express.Router();

router.get('/get',getCartProduct);
router.post('/add',addCartProduct);

export default router