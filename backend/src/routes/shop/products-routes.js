import express  from 'express'
import {
    getFitleredProducts, getProduct
   } from '../../controllers/shop/products-controllers.js'
    
const router = express.Router();


router.post("/get",getFitleredProducts);
router.get("/get",getFitleredProducts);

export default router