import User from '../../models/user.model.js'
import Product from '../../models/product-model.js'
import Cart from '../../models/cart-model.js'
const getCartProduct =  async (req,res)=>{
    
    try{
        const {userId} = req.params;
        console.log({userId});
        const allProduct =await Cart.find({userId });
        return res.status(200).json({
            success: true,
            message : 'Cart product fetched successfully!',
            data : allProduct
        })
    }catch(err){
        console.error(err,"in getCartProduct");
        return res.status(404).json({
            success : false,
            message : "Error occured in getCartProduct",
            data : []
        })
    }

}
const addCartProduct = async (req,res)=>{
    try{
        const {userId, productId} = req.body;
        const user =await User.findOne({_id : userId});
        const product =await Product.findOne({_id : productId});
        if(user && product){
            const cartProduct =await Cart.findOne({
                userId : userId,
                productId : productId
            });
            if(cartProduct){
                // found in cart 
                cartProduct.quantity +=1;
                await cartProduct.save();
                return res.status(201).json({
                    success: true,
                    message: 'Product added to cart successfully',
                    data : cartProduct
                })
            }else{
                // not found in cart
                const  newlyCreatedCartProduct =await Cart.create({
                        userId,
                        productId,  
                });
                // found error during inserting in cart
                if(!newlyCreatedCartProduct){
                    return res.status(401).json({
                        success : false,
                        message : "Error in creating cart Product",
                        data : []
                    })
                }
                // successfully added in cart
                res.status(201).json({
                    success : true,
                    message : "Cart Product created successfully",
                    data : newlyCreatedCartProduct
                })
            }
        }else{  
            return res.status(401).json({
            success : false,
            message : "Either userId or ProductId not enter correct",
            data : []
        })    
        }
    }catch(err){
        console.error(err,"in getCartProduct");
        return res.status(500).json({
            success : false,
            message : "Error occured in addCartProduct",
            data : []
        })
    }

}
const deleteCartProduct  = async (req,res) =>{
    try{
        const {cartProductId} = req.params;
        console.log(cartProductId)
        const cartProductFound =await Cart.findById(cartProductId);
        if(cartProductFound){
            if(cartProductFound.quantity> 1){
                cartProductFound.quantity-=1;
                await cartProductFound.save();
                return res.status(200).json({
                success: true,
                message : "Product deleted successfully!",
                data : cartProductFound
            })
            }else{
                await Cart.findByIdAndDelete(cartProductId);
                return res.status(200).json({
                success: true,
                message : "Product deleted successfully",
                data : []
            })
            }
            
        }else{
            res.status(400).json({
                success: false,
                message : "Product not found",
                data : []
            })
        }
    }catch(err){
        console.log(err, "in deletedCartProduct");
        return res.status(501).json({
            success : false,
            message: 'Error during deleting cart product',
            data :[]
        })
    }
}

export {getCartProduct,addCartProduct,deleteCartProduct}