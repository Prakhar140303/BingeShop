import express from 'express'
import { getCartProduct, addCartProduct, deleteCartProduct } from '../../controllers/shop/cart-contoller.js';
const router  =express.Router();

router.get(`/get/:userId`,getCartProduct);
router.post('/add',addCartProduct);
router.delete('/delete/:cartProductId',deleteCartProduct)

export default router