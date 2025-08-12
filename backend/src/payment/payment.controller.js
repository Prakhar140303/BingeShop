import cartModel from "../models/cart-model.js";
import { createRazorpayInstance } from "./razorpay.config.js";
import crypto from "crypto";

const razorpayInstance = createRazorpayInstance();

const createOrder = async (req, res) => {
    const cartProducts = await cartModel.find({ userId: req.body.userId }).populate('productId');
    if (!cartProducts || cartProducts.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No products found in the cart",
            data: []
        });
    }
    let totalAmount = 0;
    cartProducts.forEach(product => {
        totalAmount += (product.productId.salePrice>0? product.productId.salePrice: product.productId.price )* product.quantity;
    });
    const DELIVERY_FEE = 5.00;      
    const TAX_RATE = 0.08;
    const tax = totalAmount * TAX_RATE;
    totalAmount = totalAmount + DELIVERY_FEE + tax;
    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: `receipt_${new Date().getTime()}`,
    };
    try{
        razorpayInstance.orders.create(options,(error, order) => {
            if(error){
                return res.status(500).json({
                    success: false,
                    message: "Error creating order",
                });
            }
            return res.status(200).json({
                success: true,
                message: "Order created successfully",
                data: order
            });
        }
    )
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error creating order",
        });
    }
}

const verifyPayment = async (req, res) => {
    const {orderId, paymentId, signature} = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    // create hmac object 
    const hmac = crypto.createHmac("sha256", secret);
    
    hmac.update(orderId + "|" + paymentId);
    const generatedSignature = hmac.digest("hex");
    if(generatedSignature === signature){
        // save the order details to your database

       
        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
        });
    } else {
        
        return res.status(400).json({
            success: false,
            message: "Payment verification failed",
        });
    }

}
export { createOrder ,verifyPayment};