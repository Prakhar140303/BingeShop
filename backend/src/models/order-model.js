import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },

      status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'returned', 'failed'],
        default: 'pending'
      },
    }
  ],

  shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    postalCode: String,
    country: String
  },

  paymentId: String,
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },

  orderStatus: { type: String, enum: ['pending', 'processing', 'completed',  'cancelled', 'returned'], default: 'pending' },

  totalAmount: Number,
},{timestamps: true});


export const Order = mongoose.model('Order', orderSchema);
