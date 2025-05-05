import express  from 'express'
const router = express.Router();

import {handleImageUpload} from '../controllers/admin/products-controller.js'

import { upload } from '../helpers/cloudinary.js';

router.post("/upload-image",upload.single("my_file"),handleImageUpload);

export default router