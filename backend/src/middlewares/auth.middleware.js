import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
    console.log(process.env.CLIENT_SECRET_KEY); 
    
    const {token} = req.cookies;
    if(!token){
        return res.status(405).json({
            success : false,
            message : "Unauthorized user"
        });
    }
    try {
        const decode = jwt.verify(token, process.env.CLIENT_SECRET_KEY);
        req.user = decode;
        next();
    }catch(error){
        return res.status(401).json({
            success : false,
            message : "Error in auth middleware"
        });
    }
}


export {authMiddleware};