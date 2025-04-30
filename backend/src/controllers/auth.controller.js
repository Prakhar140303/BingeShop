import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// register
export const SignupController = async (req, res) => {
    const {username, email, password} = req.body;
    console.log(req.body);
    if(!username || !email || !password) return res.status(400).json({message : "All fields are required"});
    try{
        const existingUser = await User.findOne({
            $or :[
                {username : username},
                {email : email}
            ]    
        });
        if(existingUser){
            return res.json({ 
                success : false,
                message : "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser  = await User.create({username, email, password : hashedPassword, role : req.body?.role || "user"});
        if(!newUser){
            return res.status(400).json({
                success : false,
                message : "Something went wrong during creating user in Signup-controller"});
        }
        res.status(200).json({
            success : true,
            data : newUser,
            message : "Regstration successful"});
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message : "Something went wrong in Signup-controller"});
    }
}


// login	
export const LoginController = async (req, res) => {
    const { email, password} = req.body;
    try{
        if( !email || !password) return res.status(400).json({message : "All fields are required"});
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success : false,
                message : "User does not exist"});
        }
        const isMatch  = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({
                success : false,
                message : "Invalid password"});
        }
        const token = jwt.sign({
            id : user._id , role : user.role, email : user.email
        },process.env.CLIENT_SECRET_KEY,{
            expiresIn : '60m'
        });
        res.cookie('token',token,{httpOnly : true, secure: false}).json({
            success : true,
            message : 'User Logged In sucessfully',
            userInfo : {
                email : user.email,
                role : user.role,
                id : user._id
            }
        })
    }catch(err){
        console.log(err);
        return res.status(501).json({
            success : false,
            message : "Something went wrong in Login-controller"});
    }
}



// logout

export const LogoutController  = (req, res) => {
    res.clearCookie('token').json({
        success : true,
        message : "User logged out successfully"});
}



