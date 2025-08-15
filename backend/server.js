import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth/auth-routes.js";
import adminProductRoutes from "./src/routes/admin/products-routes.js";
import shopProductRoutes from "./src/routes/shop/products-routes.js";   
import cartRoutes from "./src/routes/shop/cart-routes.js"
import paymentRoutes from "./src/routes/payments/payments.routes.js";
import orderRoutes from "./src/routes/shop/order-routes.js"
import path from 'path'

const app = express();
app.use(express.json()); 
// todo: conect mongodb
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("error found while connecting to MongoDB",err));    


app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders : [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        'Expires',
        'Pragma'
    ]
}));
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/shop/products", shopProductRoutes);
app.use("/api/shop/products/cart", cartRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/shop/orders", orderRoutes);



const __dirname = path.resolve();
console.log(path.join(__dirname,"../frontend","dist","index.html"));
if(process.env.NODE_ENV === "production") {

    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}
app.listen(PORT, () => {
    console.log("Server is running on port 5000");
});