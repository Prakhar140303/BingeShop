
import Product from "../../models/product-model.js";


const getFitleredProducts = async (req, res) => {
    try{
        const products = await Product.find({});    
        res.status(200).json({
            success : true,
            message : "Products fetched successfully",
            data : products
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : "Something went wrong"});
    }
}




export {getFitleredProducts};