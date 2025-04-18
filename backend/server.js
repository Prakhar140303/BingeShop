import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

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
app.get("/homeapi", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/auth", require("./routes/auth-routes"));

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});