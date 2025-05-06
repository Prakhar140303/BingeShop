import express  from 'express'
import {handleImageUpload,
    fetchAllProductsController,
    addProductController,
    EditProductController,
    deleteProductController} from '../controllers/admin/products-controller.js'
    
const router = express.Router();
import { upload } from '../helpers/cloudinary.js';

router.post("/upload-image",upload.single("my_file"),handleImageUpload);
router.post("/add",addProductController);
router.get("/getAll",fetchAllProductsController);
router.put("/edit/:id",EditProductController);
router.delete("/delete/:id",deleteProductController);

export default router