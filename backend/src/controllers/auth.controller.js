import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// register
export const SignupController = async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password) return res.status(400).json({message : "All fields are required"});
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser  = await User.create({username, email, password : hashedPassword});
        newUser.save();
        if(!newUser){
            return res.status(400).json({message : "Something went wrong during creating user in Signup-controller"});
        }
        res.status(200).json({message : "Regstration successful"});
    }catch(err){
        console.log(err);
        return res.status(500).json({message : "Something went wrong in Signup-controller"});
    }
}


// login	
export const LoginController = async (req, res) => {
    const { email, password} = req.body;
    if( !email || !password) return res.status(400).json({message : "All fields are required"});
    try{
    }catch(err){
        console.log(err);
        return res.status(501).json({message : "Something went wrong in Login-controller"});
    }
}



// logout





