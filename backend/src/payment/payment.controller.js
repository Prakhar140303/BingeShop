import cartModel from "../models/cart-model.js";
import { createRazorpayInstance } from "./razorpay.config.js";
import crypto from "crypto";
import {Order} from "../models/order-model.js";
import Products from "../models/product-model.js";

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
    const { orderId, paymentId, signature, userId, shippingAddress } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(orderId + "|" + paymentId);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === signature) {
        try {
            const cartProducts = await cartModel.find({ userId }).populate('productId');
            
            if (!cartProducts || cartProducts.length === 0) {
                return res.status(404).json({ success: false, message: "Cart is empty" });
            }

            const products = cartProducts.map(item => ({
                product: item.productId._id,
                status: 'pending'
            }));

            let totalAmount = 0;
            cartProducts.forEach(product => {
                totalAmount += (product.productId.salePrice > 0 ? product.productId.salePrice : product.productId.price) * product.quantity;
            });

            const DELIVERY_FEE = 5.00;
            const TAX_RATE = 0.08;
            const tax = totalAmount * TAX_RATE;
            totalAmount = totalAmount + DELIVERY_FEE + tax;

            const order = await Order.create({
                user: userId,
                products,
                shippingAddress,
                paymentId,
                paymentStatus: 'paid',
                orderStatus: 'processing',
                totalAmount
            });
            if(!order){
                return res.status(500).json({
                    success: false,
                    message: "Failed to create order"
                });
            }
            await Promise.all(
                cartProducts.map(async (product) => {
                    await Products.updateOne(
                        { _id: product.productId._id },
                        { $inc: { quantity: -product.quantity } }
                    );
                })
            );
            // Clear cart
            await cartModel.deleteMany({ userId });

            return res.status(200).json({
                success: true,
                message: "Payment verified & order placed successfully",
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Error saving order" });
        }
    } else {
        return res.status(400).json({
            success: false,
            message: "Payment verification failed",
        });
    }
};

export { createOrder ,verifyPayment};