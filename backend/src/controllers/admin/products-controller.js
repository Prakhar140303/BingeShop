// import 

import { imageUploadUtils } from "../../helpers/cloudinary.js";
import  Product  from "../../models/product-model.js";
const handleImageUpload = async (req,res)=>{
    try{
        console.log(req.file);
        
        if(!req.file){
            return res.json({
                success : false,
                message : "No file uploaded"
            });
        }
        const b64  = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:"+ req.file.mimetype + ";base64,"+ b64;
        const result  =await imageUploadUtils(url);

        res.json({
            success: true ,
            result: result
        })
    }catch(error){
        console.log(error);
        res.json({
            success : false,
            message : "Error in image upload"
        })
    }
}

// add a new product 
const addProductController = async (req, res) => {
    try{
        const {image,title,description,category,brand,price,salePrice,totalStock} = req.body;
        const newlyCreatedProduct = await Product.create({image,title,description,category,brand,price,salePrice,totalStock});
        if(!newlyCreatedProduct){
            return res.status(400).json({
                success : false,
                message : "Error in creating product"
            })
        }
        await newlyCreatedProduct.save();
        res.status(201).json({
            success : true,
            message : "Product created successfully",
            data : newlyCreatedProduct
        })
    }catch(err){
        console.log(err);
        res.status(400).json({
            success : false,
            message : "Error in add product controller"
        })
    }
};

// fetch all products 
const fetchAllProductsController = async (req, res) => {
    try{
        const listOfProducts = await Product.find({});
        if(listOfProducts){
            return res.status(200).json({
                success : true,
                message : "Products fetched successfully",
                data : listOfProducts
            })
        }else{
            return res.status(400).json({
                success : false,
                message : "Error in fetching products"
            })
        }

    }catch(err){
        console.log(err);
        res.status(400).json({
            success : false,
            message : "Error in add product controller"
        })
    }
};

// edit a product 
const EditProductController = async (req, res) => {
    try{
        const {id} = req.params;
        console.log(req.params);
        const {image,title,description,category,brand,price,salePrice,totalStock} = req.body;
        console.log(req.body);
        const findProduct = await Product.findOne({_id : id});
        if(!findProduct){
            return res.status(400).json({
                success : false,
                message : "Product does not exist"
            })
        }
        findProduct.image = image || findProduct.image;
        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price || findProduct.price;
        findProduct.salePrice = salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;

        await findProduct.save();
        res.status(201).json({
            success : true,
            message : "Product created successfully",
            data : findProduct
        })

    }catch(err){
        console.log(err);
        res.status(400).json({
            success : false,
            message : "Error in edit product controller"
        })
    }
};

//  delete a product
const deleteProductController = async (req, res) => {
    try{
        console.log(req.params);
        const {id} = req.params;
        console.log('Body payload:', req.body);

        const findProductToDelete = await Product.findOneAndDelete({_id : id});
        console.log(findProductToDelete);
        if(!findProductToDelete){
            return res.status(400).json({
                success : false,
                message : "Product does not exist"
            })
        }
        res.status(201).json({
            success : true,
            message : "Product deleted successfully",
            data : findProductToDelete
        });
    }catch(err){
        console.log(err);
        res.status(400).json({
            success : false,
            message : "Error in add product controller"
        })
    }
};
export {handleImageUpload,
     addProductController,
      fetchAllProductsController,
       EditProductController,
        deleteProductController};