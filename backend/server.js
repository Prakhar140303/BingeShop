import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth-routes.js";
import adminProductRoutes from "./src/routes/products-routes.js";
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