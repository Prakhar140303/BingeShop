import mongoose from "mongoose";
const CartSchema = new mongoose.Schema({
    quantity :{
        type: Number,
        default : 1,
        min :1
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
        
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required : true,
    }
},{timestamps: true})

export default mongoose.model('Cart',CartSchema);