import { Order } from '../../models/order-model.js';
const fetchOrderByUserId = async (req,res) =>{
    try{
        const userId = req.body.user._id;
        const order = await Order.find({ user: userId })
            .populate('products.product');
        if(!order || order.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found for this user"        

            });
        }
        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            order: order
        });
    }
    catch(error){
        console.error("Error fetching order:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch order",
            error: error.message
        });
    }
}

const fetchOrder = async (req, res) => {
    try{

    }catch(error) {
        console.error("Error fetching order:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch order",
            error: error.message
        });
    }
}

export {
    fetchOrderByUserId,fetchOrder };