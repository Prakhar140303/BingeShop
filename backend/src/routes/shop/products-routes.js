import express  from 'express'
import {
    getFitleredProducts,
   } from '../../controllers/shop/products-controllers.js'
    
const router = express.Router();


router.get("/get",getFitleredProducts);

export default router